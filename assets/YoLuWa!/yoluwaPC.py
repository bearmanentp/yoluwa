import cv2
from ultralytics import YOLO
import time
import os
import io
import threading
import http.server
import socketserver
from socketserver import ThreadingMixIn
import subprocess
import json
import urllib.parse
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend

from PySide6.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout, QPushButton, QLabel, QHBoxLayout, QInputDialog, QMessageBox, QFileDialog, QGridLayout, QLineEdit, QGroupBox, QSpacerItem, QSizePolicy, QDialog
from PySide6.QtGui import QImage, QPixmap, QIntValidator, QDoubleValidator
from PySide6.QtCore import QTimer, Slot, Qt, QThread, Signal, QByteArray, QStandardPaths

import numpy as np
import requests
import socket

# --- 설정 파일 ---
SETTINGS_FILE = 'settings.json' # 모든 앱 설정을 저장할 통합 JSON 파일

DEFAULT_PHONE_STREAM_URL = "http://192.168.0.100:8080/video"
DEFAULT_STREAMING_PORT = 8000
DEFAULT_DISCORD_WEBHOOK_URL = ""
DEFAULT_CONFIDENCE_THRESHOLD = 0.5
DEFAULT_MODEL_REGISTRY = []
DEFAULT_SAVE_FOLDER_NAME = "YOLO_Captures"

TEMPLATES_DIR = 'templates'
WEB_CONTROL_HTML_FILE = os.path.join(TEMPLATES_DIR, 'index.html')

# --- 글로벌 변수 (스트리밍할 프레임 저장) ---
shared_frame_lock = threading.Lock()
shared_annotated_frame_bytes = QByteArray()

# --- 암호화 및 복호화 함수 ---
def _derive_key(password: str, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    return base64.urlsafe_b64encode(kdf.derive(password.encode('utf-8')))

def encrypt_data(password: str, salt: bytes, data: str) -> str:
    key = _derive_key(password, salt)
    f = Fernet(key)
    return f.encrypt(data.encode('utf-8')).decode('utf-8')

def decrypt_data(password: str, salt: bytes, encrypted_data: str) -> str:
    key = _derive_key(password, salt)
    f = Fernet(key)
    return f.decrypt(encrypted_data.encode('utf-8')).decode('utf-8')

def hash_password(password: str, salt: bytes) -> str:
    return _derive_key(password, salt).decode('utf-8')

# --- MJPEG 스트리밍 서버 핸들러 ---
class StreamingHandler(http.server.BaseHTTPRequestHandler):
    _command_from_web_signal = None
    _program_stop_signal = None
    _select_model_signal = None
    _rotate_camera_signal = None
    _set_confidence_signal = None
    _model_registry = []
    _current_yolo_model_name = "N/A"
    _confidence_threshold_for_web = DEFAULT_CONFIDENCE_THRESHOLD
    _html_template_content = ""

    def do_GET(self):
        try:
            if self.path == '/video_feed':
                self.send_response(200)
                self.send_header('Content-type', 'multipart/x-mixed-replace; boundary=frame')
                self.end_headers()
                while True:
                    with shared_frame_lock:
                        if shared_annotated_frame_bytes.size() > 0:
                            frame_bytes = shared_annotated_frame_bytes.data()
                        else:
                            frame_bytes = None

                    if frame_bytes:
                        self.wfile.write(b'--frame\r\n')
                        self.wfile.write(b'Content-Type: image/jpeg\r\n')
                        self.wfile.write(f'Content-Length: {len(frame_bytes)}\r\n'.encode())
                        self.wfile.write(b'\r\n')
                        self.wfile.write(frame_bytes)
                        self.wfile.write(b'\r\n')
                    time.sleep(0.03)
            elif self.path == '/':
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.end_headers()

                model_options = ""
                for model_path in StreamingHandler._model_registry:
                    model_name = os.path.basename(model_path)
                    selected = "selected" if model_name == StreamingHandler._current_yolo_model_name else ""
                    escaped_model_path = model_path.replace('\\', '\\\\')
                    model_options += f"<option value='{escaped_model_path}' {selected}>{model_name}</option>"

                formatted_html = StreamingHandler._html_template_content.format(
                    model_options=model_options,
                    current_yolo_model_name=StreamingHandler._current_yolo_model_name,
                    confidence_threshold=f"{StreamingHandler._confidence_threshold_for_web:.2f}"
                )
                self.wfile.write(formatted_html.encode('utf-8'))
            elif self.path.startswith('/trigger_'):
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()

                parsed_url = urllib.parse.urlparse(self.path)
                query_params = urllib.parse.parse_qs(parsed_url.query)

                command_type_full = parsed_url.path.split('/')[-1]
                command_type = command_type_full.replace('trigger_', '')

                if command_type == 'capture':
                    if StreamingHandler._command_from_web_signal:
                        self.wfile.write(b'Capture command received by PC app.')
                        StreamingHandler._command_from_web_signal.emit("CAPTURE:웹 원격")

                elif command_type == 'discord':
                    discord_message = query_params.get('message', [''])[0]
                    if StreamingHandler._command_from_web_signal:
                        self.wfile.write(b'Discord command received by PC app.')
                        StreamingHandler._command_from_web_signal.emit(f"DISCORD:웹 원격:{discord_message}")

                elif command_type == 'stop_program':
                    if StreamingHandler._program_stop_signal:
                        self.wfile.write(b'Program stop command received. Shutting down...')
                        StreamingHandler._program_stop_signal.emit()

                elif command_type == 'select_model':
                    model_path = query_params.get('path', [''])[0]
                    if StreamingHandler._select_model_signal and model_path:
                        self.wfile.write(f'Model selection command received for: {os.path.basename(model_path)}'.encode('utf-8'))
                        StreamingHandler._select_model_signal.emit(model_path)

                elif command_type == 'rotate_camera':
                    angle_str = query_params.get('angle', [''])[0]
                    if angle_str.isdigit():
                        angle = int(angle_str)
                        if StreamingHandler._rotate_camera_signal:
                            self.wfile.write(f'Camera rotate command received for: {angle} degrees.'.encode('utf-8'))
                            StreamingHandler._rotate_camera_signal.emit(angle)
                    else:
                        self.wfile.write(b'Invalid angle format for rotate command.')

                elif command_type == 'set_confidence':
                    confidence_str = query_params.get('value', [''])[0]
                    try:
                        confidence = float(confidence_str)
                        if 0.0 <= confidence <= 1.0 and StreamingHandler._set_confidence_signal:
                            self.wfile.write(f'Confidence set command received for: {confidence:.2f}.'.encode('utf-8'))
                            StreamingHandler._set_confidence_signal.emit(confidence)
                        else:
                            self.wfile.write(b'PC app not ready or invalid confidence value (0.0-1.0).')
                    except ValueError:
                        self.wfile.write(b'Invalid confidence format.')

                else:
                    self.send_response(404)
                    self.wfile.write(b'Unknown trigger command.')

                print(f"Web command: {command_type} triggered. Path: {self.path}")

            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b'Not Found')
        except Exception as e:
            print(f"Error in StreamingHandler.do_GET for path {self.path}: {e}")
            self.send_error(500, f"Server error: {e}")

    def log_message(self, format, *args):
        pass

class ThreadedHTTPServer(ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True

class VideoStreamer(QThread):
    streaming_url_ready = Signal(str)
    command_from_web = Signal(str)
    program_stop_signal = Signal()
    select_model_signal = Signal(str)
    rotate_camera_signal = Signal(int)
    set_confidence_signal = Signal(float)

    def __init__(self, host, port, parent=None):
        super().__init__(parent)
        self._host = host
        self._port = port
        self.httpd = None
        self._running = False
        self._html_template_loaded = False

        StreamingHandler._command_from_web_signal = self.command_from_web
        StreamingHandler._program_stop_signal = self.program_stop_signal
        StreamingHandler._select_model_signal = self.select_model_signal
        StreamingHandler._rotate_camera_signal = self.rotate_camera_signal
        StreamingHandler._set_confidence_signal = self.set_confidence_signal

        if os.path.exists(WEB_CONTROL_HTML_FILE):
            with open(WEB_CONTROL_HTML_FILE, 'r', encoding='utf-8') as f:
                StreamingHandler._html_template_content = f.read()
            self._html_template_loaded = True
        else:
            print(f"오류: HTML 템플릿 파일 '{WEB_CONTROL_HTML_FILE}'을 찾을 수 없습니다. 웹 제어가 작동하지 않을 수 있습니다.")
            QMessageBox.critical(None, "오류", f"HTML 템플릿 파일 '{WEB_CONTROL_HTML_FILE}'을 찾을 수 없습니다. 파일이 'templates' 폴더 안에 있는지 확인하세요.")

    @property
    def host(self):
        return self._host

    @property
    def port(self):
        return self._port

    def set_host_port(self, host, port):
        self._host = host
        self._port = port

    def run(self):
        if not self._html_template_loaded:
            print("HTML 템플릿이 로드되지 않아 웹 스트리밍 서버를 시작할 수 없습니다.")
            return

        self._running = True
        try:
            self.httpd = ThreadedHTTPServer((self._host, self._port), StreamingHandler)
            streaming_base_address = f"http://{self._host}:{self._port}"
            print(f"YOLO Video Streaming & Remote Control server started at {streaming_base_address}")
            self.streaming_url_ready.emit(streaming_base_address)
            self.httpd.serve_forever()
        except OSError as e:
            if e.errno == 10048:
                print(f"오류: 포트 {self._port}가 이미 사용 중입니다. 다른 포트를 선택해 주세요.")
                self.streaming_url_ready.emit(f"Port {self._port} already in use.")
            else:
                print(f"YOLO Video Streaming server error: {e}")
                self.streaming_url_ready.emit(f"Server error: {e}")
        except Exception as e:
            print(f"YOLO Video Streaming server unexpected error: {e}")
            self.streaming_url_ready.emit(f"Unexpected server error: {e}")
        finally:
            print("YOLO Video Streaming server stopped.")
            self._running = False

    def stop(self):
        if self._running and self.httpd:
            print(f"Stopping HTTP server on port {self._port}...")
            shutdown_thread = threading.Thread(target=self.httpd.shutdown)
            shutdown_thread.daemon = True
            shutdown_thread.start()
        self._running = False

    def set_model_info_for_web(self, registry, current_model_name):
        StreamingHandler._model_registry = registry
        StreamingHandler._current_yolo_model_name = current_model_name

    def set_confidence_for_web(self, confidence):
        StreamingHandler._confidence_threshold_for_web = confidence

# --- 디스코드 웹훅으로 이미지 전송 함수 ---
def send_image_to_discord(webhook_url, image_np, message="YOLO 분석 결과입니다.", filename="yolo_result.jpg"):
    if not webhook_url or not (webhook_url.startswith("http://") or webhook_url.startswith("https://")):
        print("디스코드 웹훅 URL이 유효하지 않습니다. 디스코드 웹훅을 설정해주세요.")
        return False

    try:
        is_success, buffer = cv2.imencode(".jpg", image_np)
        if not is_success:
            print("이미지 인코딩 실패")
            return False

        files = {
            'file': (filename, buffer.tobytes(), 'image/jpeg')
        }

        payload = {"content": message}

        response = requests.post(webhook_url, data=payload, files=files)
        response.raise_for_status()
        print(f"Discord 전송 성공! 응답 코드: {response.status_code}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Discord 전송 실패: {e}")
        return False
    except Exception as e:
        print(f"디스코드 이미지 전송 중 예상치 못한 오류 발생: {e}")
        return False

# --- 비밀번호 입력 대화 상자 ---
class PasswordDialog(QDialog):
    def __init__(self, title="비밀번호 입력", prompt="비밀번호를 입력하세요:", parent=None, is_initial_setup=False):
        super().__init__(parent)
        self.setWindowTitle(title)
        self.setModal(True)
        self.password = None

        layout = QVBoxLayout(self)

        self.label_prompt = QLabel(prompt)
        layout.addWidget(self.label_prompt)

        self.le_password = QLineEdit()
        self.le_password.setEchoMode(QLineEdit.Password)
        self.le_password.returnPressed.connect(self.accept)
        layout.addWidget(self.le_password)

        if is_initial_setup:
            self.label_confirm_prompt = QLabel("비밀번호 확인:")
            layout.addWidget(self.label_confirm_prompt)
            self.le_password_confirm = QLineEdit()
            self.le_password_confirm.setEchoMode(QLineEdit.Password)
            self.le_password_confirm.returnPressed.connect(self.accept)
            layout.addWidget(self.le_password_confirm)
            self.le_password_confirm.textChanged.connect(self._check_password_match)

        self.btn_ok = QPushButton("확인")
        self.btn_ok.clicked.connect(self.accept)

        if is_initial_setup:
            self.btn_ok.setEnabled(False)
        elif not self.le_password.text():
            self.btn_ok.setEnabled(False)
        self.le_password.textChanged.connect(self._check_password_match if is_initial_setup else lambda: self.btn_ok.setEnabled(bool(self.le_password.text())))
        layout.addWidget(self.btn_ok)

        self.is_initial_setup = is_initial_setup

    def _check_password_match(self):
        if self.is_initial_setup:
            if self.le_password.text() and self.le_password.text() == self.le_password_confirm.text():
                self.label_confirm_prompt.setText("비밀번호 확인: <font color='green'>일치합니다</font>")
                self.btn_ok.setEnabled(True)
            else:
                self.label_confirm_prompt.setText("비밀번호 확인: <font color='red'>불일치 또는 비어 있음</font>")
                self.btn_ok.setEnabled(False)
        else:
            self.btn_ok.setEnabled(bool(self.le_password.text()))

    def accept(self):
        if self.is_initial_setup:
            if not self.le_password.text() or self.le_password.text() != self.le_password_confirm.text():
                QMessageBox.warning(self, "오류", "비밀번호가 일치하지 않거나 비어 있습니다. 다시 입력해 주세요.")
                return
        elif not self.le_password.text():
            QMessageBox.warning(self, "오류", "비밀번호를 입력해 주세요.")
            return

        self.password = self.le_password.text()
        super().accept()

    def get_password(self):
        return self.password

# --- PyQt/PySide GUI 앱 ---
class YoloApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("YoLuWa v0.1.0")
        self.setGeometry(100, 100, 1200, 950)

        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        self.main_layout = QVBoxLayout(self.central_widget)

        self.video_display_layout = QGridLayout()
        self.video_label_main = QLabel("YOLO 분석 스트림 로딩 중...")
        self.video_label_main.setAlignment(Qt.AlignCenter)
        self.video_label_main.setStyleSheet("background-color: black; color: white;")
        self.video_label_main.setMinimumHeight(350)
        self.video_label_main.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        self.video_display_layout.addWidget(self.video_label_main, 0, 0)
        self.main_layout.addLayout(self.video_display_layout)

        self.status_label = QLabel("앱 시작 중...")
        self.status_label.setAlignment(Qt.AlignCenter)
        self.main_layout.addWidget(self.status_label)

        self.streaming_info_label = QLabel("YOLO 웹 제어 서버 시작 중...")
        self.streaming_info_label.setAlignment(Qt.AlignCenter)
        self.main_layout.addWidget(self.streaming_info_label)

        self.control_panel_layout = QVBoxLayout()
        self.settings_group_box = QGroupBox("앱 설정")
        self.settings_layout = QGridLayout()

        row = 0
        self.settings_layout.addWidget(QLabel("웹캠 링크 (스트리밍 소스):"), row, 0)
        self.le_phone_stream_url = QLineEdit()
        self.settings_layout.addWidget(self.le_phone_stream_url, row, 1)
        row += 1

        self.settings_layout.addWidget(QLabel("디스코드 웹훅 URL:"), row, 0)
        self.le_discord_webhook_url = QLineEdit()
        self.settings_layout.addWidget(self.le_discord_webhook_url, row, 1)
        row += 1

        self.settings_layout.addWidget(QLabel("웹 스트리밍 포트:"), row, 0)
        self.le_streaming_port = QLineEdit()
        self.le_streaming_port.setValidator(QIntValidator(1024, 65535, self))
        self.settings_layout.addWidget(self.le_streaming_port, row, 1)
        row += 1

        self.settings_layout.addWidget(QLabel("신뢰도 임계값 (0.00-1.00):"), row, 0)
        self.le_confidence_threshold = QLineEdit()
        self.le_confidence_threshold.setValidator(QDoubleValidator(0.00, 1.00, 2, self))
        self.settings_layout.addWidget(self.le_confidence_threshold, row, 1)
        row += 1

        self.btn_apply_settings = QPushButton("설정 적용 및 저장")
        self.btn_apply_settings.clicked.connect(self.apply_settings)
        self.settings_layout.addWidget(self.btn_apply_settings, row, 0, 1, 2)
        row += 1
        self.btn_change_password = QPushButton("비밀번호 변경")
        self.btn_change_password.clicked.connect(self.change_master_password)
        self.settings_layout.addWidget(self.btn_change_password, row, 0, 1, 2)

        self.settings_group_box.setLayout(self.settings_layout)
        self.control_panel_layout.addWidget(self.settings_group_box)

        self.model_control_layout = QHBoxLayout()
        self.camera_control_layout = QHBoxLayout()
        self.action_control_layout = QHBoxLayout()
        self.folder_control_layout = QHBoxLayout()

        self.yolo_model_path = None
        self.current_yolo_model_name = "없음"
        self.lbl_model_path = QLabel(f"현재 YOLO 모델: {self.current_yolo_model_name}")
        self.model_control_layout.addWidget(self.lbl_model_path)
        self.btn_select_model = QPushButton("모델 파일 선택")
        self.btn_select_model.clicked.connect(self.select_yolo_model)
        self.model_control_layout.addWidget(self.btn_select_model)
        self.control_panel_layout.addLayout(self.model_control_layout)

        self.btn_start_camera_main = QPushButton("YOLO 카메라 시작/중지")
        self.btn_start_camera_main.clicked.connect(self.toggle_camera)
        self.camera_control_layout.addWidget(self.btn_start_camera_main)

        self.btn_rotate_camera = QPushButton("카메라 회전 (0°)")
        self.btn_rotate_camera.clicked.connect(self.rotate_camera)
        self.camera_control_layout.addWidget(self.btn_rotate_camera)
        self.control_panel_layout.addLayout(self.camera_control_layout)

        self.btn_send_discord_manual = QPushButton("수동 Discord 전송")
        self.btn_send_discord_manual.clicked.connect(lambda: self.execute_action("DISCORD", "수동"))
        self.btn_send_discord_manual.setEnabled(False)
        self.action_control_layout.addWidget(self.btn_send_discord_manual)

        self.btn_save_manual = QPushButton("수동 사진 저장")
        self.btn_save_manual.clicked.connect(lambda: self.execute_action("CAPTURE", "수동"))
        self.btn_save_manual.setEnabled(False)
        self.action_control_layout.addWidget(self.btn_save_manual)
        self.control_panel_layout.addLayout(self.action_control_layout)

        documents_path = QStandardPaths.writableLocation(QStandardPaths.StandardLocation.DocumentsLocation)
        self.current_save_path = os.path.join(documents_path, DEFAULT_SAVE_FOLDER_NAME)
        os.makedirs(self.current_save_path, exist_ok=True)

        self.lbl_save_path = QLabel(f"저장 폴더: {self.current_save_path}")
        self.folder_control_layout.addWidget(self.lbl_save_path)

        self.btn_select_folder = QPushButton("폴더 선택")
        self.btn_select_folder.clicked.connect(self.select_save_folder)
        self.folder_control_layout.addWidget(self.btn_select_folder)

        self.btn_open_save_folder = QPushButton("저장 폴더 열기")
        self.btn_open_save_folder.clicked.connect(self.open_save_folder)
        self.folder_control_layout.addWidget(self.btn_open_save_folder)
        self.control_panel_layout.addLayout(self.folder_control_layout)

        self.main_layout.addLayout(self.control_panel_layout)
        self.main_layout.addItem(QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding))

        # --- 푸터 링크(공식 홈페이지 + 인스타) 추가 ---
        footer_label = QLabel()
        footer_label.setTextFormat(Qt.RichText)
        footer_label.setOpenExternalLinks(True)  # 외부 링크 허용
        footer_label.setAlignment(Qt.AlignCenter)
        footer_label.setStyleSheet("""
            color: gray;
            font-size: 12px;
        """)
        footer_html = (
            "공식 홈페이지: <a href='https://yoluwa.kro.kr' target='_blank'>yoluwa.kro.kr</a> &nbsp;|&nbsp; "
            "개발자 인스타: <a href='https://www.instagram.com/bearman.entp' target='_blank'>@bearman.entp</a>"
        )
        footer_label.setText(footer_html)
        footer_label.setCursor(Qt.PointingHandCursor)
        self.main_layout.addWidget(footer_label)
        # --- 푸터 추가 끝 ---

        self.main_layout.addItem(QSpacerItem(20, 10, QSizePolicy.Minimum, QSizePolicy.Expanding))

        self.cap_main = None
        self.is_camera_running = False
        self.current_annotated_frame_main = None
        self.rotation_angle = 0

        self.phone_stream_url = DEFAULT_PHONE_STREAM_URL
        self.discord_webhook_url = DEFAULT_DISCORD_WEBHOOK_URL
        self.streaming_port = DEFAULT_STREAMING_PORT
        self.confidence_threshold = DEFAULT_CONFIDENCE_THRESHOLD
        self.model_registry = []

        self._master_password_hash = None
        self._password_salt = None
        self.master_password_entered = None

        self.timer = QTimer(self)
        self.timer.timeout.connect(self.update_frame)
        self.timer.start(30)

        self.model = None

        try:
            self.server_host_ip = socket.gethostbyname(socket.gethostname())
        except Exception:
            self.server_host_ip = "127.0.0.1"

        QTimer.singleShot(0, self._authenticate_and_load_settings)

    def _authenticate_and_load_settings(self):
        initial_setup_just_completed = False

        if not os.path.exists(SETTINGS_FILE) or os.stat(SETTINGS_FILE).st_size == 0:
            QMessageBox.information(self, "최초 설정 안내", "앱 설정 파일이 없거나 손상되었습니다. 마스터 비밀번호를 설정해주세요.")
            if not self._initial_password_setup():
                QMessageBox.critical(self, "오류", "비밀번호 설정에 실패하여 앱을 종료합니다.")
                self.close()
                return
            initial_setup_just_completed = True

        try:
            with open(SETTINGS_FILE, 'r', encoding='utf-8') as f:
                temp_settings = json.load(f)
                self._password_salt = base64.b64decode(temp_settings.get('password_salt'))
                self._master_password_hash = temp_settings.get('master_password_hash')
                if not (self._password_salt and self._master_password_hash):
                    raise ValueError("Password salt or hash missing in settings file.")
        except (json.JSONDecodeError, FileNotFoundError, ValueError, base64.binascii.Error) as e:
            QMessageBox.critical(self, "설정 파일 오류", f"설정 파일 '{SETTINGS_FILE}'이 손상되었거나 유효하지 않습니다: {e}. 파일을 삭제하고 다시 시도해주세요.")
            self.close()
            return

        if not initial_setup_just_completed:
            while True:
                dialog = PasswordDialog(parent=self, title="비밀번호 입력", prompt="마스터 비밀번호를 입력하세요:")
                if dialog.exec() == QDialog.Accepted:
                    entered_password = dialog.get_password()
                    if self._verify_master_password(entered_password):
                        self.master_password_entered = entered_password
                        break
                    else:
                        QMessageBox.warning(self, "인증 실패", "비밀번호가 올바르지 않습니다. 다시 시도해 주세요.")
                else:
                    QMessageBox.critical(self, "오류", "비밀번호 인증이 취소되어 앱을 종료합니다.")
                    self.close()
                    return

        self.load_settings_after_auth()

        self.web_stream_server_thread = VideoStreamer(self.server_host_ip, self.streaming_port, parent=self)
        self.web_stream_server_thread.streaming_url_ready.connect(self.update_streaming_info_label)
        self.web_stream_server_thread.command_from_web.connect(self.handle_web_command)
        self.web_stream_server_thread.program_stop_signal.connect(self.close)
        self.web_stream_server_thread.select_model_signal.connect(self.handle_web_model_selection)
        self.web_stream_server_thread.rotate_camera_signal.connect(self.handle_web_camera_rotation)
        self.web_stream_server_thread.set_confidence_signal.connect(self.handle_web_set_confidence)
        self.web_stream_server_thread.start()

        self.update_web_model_info()
        self.update_web_confidence_info()

        if self.model_registry:
            self.yolo_model_path = self.model_registry[0]
            self.current_yolo_model_name = os.path.basename(self.yolo_model_path)
            self.lbl_model_path.setText(f"현재 YOLO 모델: {self.current_yolo_model_name}")
            self.status_label.setText(f"YOLO 모델 준비됨: {self.current_yolo_model_name} (미로드)")
            self.update_web_model_info()
        else:
            self.status_label.setText("YOLO 모델이 등록되지 않았습니다. '모델 파일 선택' 버튼으로 모델을 선택해주세요.")

    def _initial_password_setup(self) -> bool:
        while True:
            dialog = PasswordDialog(title="마스터 비밀번호 설정", prompt="새로운 마스터 비밀번호를 설정하세요:", is_initial_setup=True, parent=self)
            if dialog.exec() == QDialog.Accepted:
                new_password = dialog.get_password()
                if new_password:
                    self._password_salt = os.urandom(16)
                    self._master_password_hash = hash_password(new_password, self._password_salt)
                    self.master_password_entered = new_password

                    settings_data_to_save = {
                        'password_salt': base64.b64encode(self._password_salt).decode('utf-8'),
                        'master_password_hash': self._master_password_hash,
                        'phone_stream_url': DEFAULT_PHONE_STREAM_URL,
                        'encrypted_discord_webhook_url': encrypt_data(new_password, self._password_salt, DEFAULT_DISCORD_WEBHOOK_URL),
                        'streaming_port': DEFAULT_STREAMING_PORT,
                        'confidence_threshold': DEFAULT_CONFIDENCE_THRESHOLD,
                        'save_path': os.path.join(QStandardPaths.writableLocation(QStandardPaths.StandardLocation.DocumentsLocation), DEFAULT_SAVE_FOLDER_NAME),
                        'model_registry': DEFAULT_MODEL_REGISTRY
                    }
                    try:
                        with open(SETTINGS_FILE, 'w', encoding='utf-8') as f:
                            json.dump(settings_data_to_save, f, indent=4)
                        QMessageBox.information(self, "설정 완료", "마스터 비밀번호가 성공적으로 설정되었습니다. 앱이 시작됩니다.")
                        return True
                    except Exception as e:
                        QMessageBox.critical(self, "오류", f"설정 저장 중 오류 발생: {e}")
                        return False
                else:
                    QMessageBox.warning(self, "경고", "비밀번호는 비워둘 수 없습니다. 다시 시도해 주세요.")
            else:
                return False

    def _verify_master_password(self, entered_password: str) -> bool:
        if not self._password_salt or not self._master_password_hash:
            QMessageBox.critical(self, "내부 오류", "비밀번호 검증에 필요한 salt 또는 해시 정보가 누락되었습니다.")
            return False
        return hash_password(entered_password, self._password_salt) == self._master_password_hash

    def change_master_password(self):
        dialog_current = PasswordDialog(title="비밀번호 변경", prompt="현재 마스터 비밀번호를 입력하세요:", parent=self)
        if dialog_current.exec() == QDialog.Accepted:
            current_password_input = dialog_current.get_password()
            if not self._verify_master_password(current_password_input):
                QMessageBox.warning(self, "인증 실패", "현재 비밀번호가 올바르지 않습니다.")
                return
        else:
            return

        while True:
            dialog_new = PasswordDialog(title="비밀번호 변경", prompt="새로운 마스터 비밀번호를 입력하세요:", is_initial_setup=True, parent=self)
            if dialog_new.exec() == QDialog.Accepted:
                new_password = dialog_new.get_password()
                if new_password:
                    new_password_salt = os.urandom(16)
                    new_master_password_hash = hash_password(new_password, new_password_salt)

                    settings = {}
                    if os.path.exists(SETTINGS_FILE):
                        with open(SETTINGS_FILE, 'r', encoding='utf-8') as f:
                            settings = json.load(f)

                    settings['password_salt'] = base64.b64encode(new_password_salt).decode('utf-8')
                    settings['master_password_hash'] = new_master_password_hash

                    if self.discord_webhook_url:
                        settings['encrypted_discord_webhook_url'] = encrypt_data(new_password, new_password_salt, self.discord_webhook_url)
                    else:
                        settings['encrypted_discord_webhook_url'] = encrypt_data(new_password, new_password_salt, "")

                    try:
                        with open(SETTINGS_FILE, 'w', encoding='utf-8') as f:
                            json.dump(settings, f, indent=4)
                        self._password_salt = new_password_salt
                        self._master_password_hash = new_master_password_hash
                        self.master_password_entered = new_password

                        QMessageBox.information(self, "비밀번호 변경", "마스터 비밀번호가 성공적으로 변경되었습니다. 앱을 다시 시작하면 변경된 비밀번호로 로그인해야 합니다.")
                        return
                    except Exception as e:
                        QMessageBox.critical(self, "오류", f"비밀번호 변경 및 설정 저장 중 오류 발생: {e}")
                        return
                else:
                    QMessageBox.warning(self, "경고", "새 비밀번호는 비워둘 수 없습니다. 다시 시도해 주세요.")
            else:
                return

    def load_settings_after_auth(self):
        settings = {}
        if os.path.exists(SETTINGS_FILE):
            try:
                with open(SETTINGS_FILE, 'r', encoding='utf-8') as f:
                    settings = json.load(f)

                    if not self._password_salt or not self._master_password_hash:
                        self._password_salt = base64.b64decode(settings.get('password_salt'))
                        self._master_password_hash = settings.get('master_password_hash')

                    self.phone_stream_url = settings.get('phone_stream_url', DEFAULT_PHONE_STREAM_URL)
                    self.streaming_port = settings.get('streaming_port', DEFAULT_STREAMING_PORT)
                    self.confidence_threshold = settings.get('confidence_threshold', DEFAULT_CONFIDENCE_THRESHOLD)
                    self.current_save_path = settings.get('save_path', self.current_save_path)

                    encrypted_webhook = settings.get('encrypted_discord_webhook_url')
                    if encrypted_webhook and self.master_password_entered and self._password_salt:
                        try:
                            self.discord_webhook_url = decrypt_data(self.master_password_entered, self._password_salt, encrypted_webhook)
                        except Exception as e:
                            QMessageBox.critical(self, "오류", f"디스코드 웹훅 URL 복호화 실패: {e}. 비밀번호가 올바르지 않거나 설정 파일이 손상되었습니다.")
                            self.discord_webhook_url = DEFAULT_DISCORD_WEBHOOK_URL
                    else:
                        self.discord_webhook_url = DEFAULT_DISCORD_WEBHOOK_URL

                    loaded_model_registry = settings.get('model_registry', DEFAULT_MODEL_REGISTRY)
                    self.model_registry = [p for p in loaded_model_registry if os.path.exists(p) and p.endswith('.pt')]

            except (json.JSONDecodeError, KeyError, base64.binascii.Error) as e:
                print(f"[{SETTINGS_FILE}] 파일 로드 오류 또는 손상: {e}. 기본 설정으로 시작합니다.")
                QMessageBox.critical(self, "설정 파일 오류", f"설정 파일을 읽는 중 오류 발생: {e}. 파일을 확인하거나 삭제하고 다시 시도해주세요.")
                self.close()
            except Exception as e:
                print(f"[{SETTINGS_FILE}] 로드 중 알 수 없는 오류: {e}")
                QMessageBox.critical(self, "예상치 못한 오류", f"설정 로드 중 오류 발생: {e}")
                self.close()

        self.le_phone_stream_url.setText(self.phone_stream_url)
        self.le_discord_webhook_url.setText(self.discord_webhook_url)
        self.le_streaming_port.setText(str(self.streaming_port))
        self.le_confidence_threshold.setText(f"{self.confidence_threshold:.2f}")
        self.lbl_save_path.setText(f"저장 폴더: {self.current_save_path}")
        os.makedirs(self.current_save_path, exist_ok=True)

    def save_settings(self):
        self.model_registry = list(set(self.model_registry))
        self.model_registry = [p for p in self.model_registry if os.path.exists(p)]
        if len(self.model_registry) > 5:
            self.model_registry = self.model_registry[-5:]

        encrypted_discord_webhook = ""
        if self.master_password_entered and self._password_salt:
            encrypted_discord_webhook = encrypt_data(self.master_password_entered, self._password_salt, self.discord_webhook_url)
        else:
            QMessageBox.critical(self, "오류", "마스터 비밀번호 정보가 없어 디스코드 웹훅을 암호화할 수 없습니다. 앱을 재시작하거나 비밀번호를 설정해주세요.")
            return False

        if not self._password_salt or not self._master_password_hash:
            QMessageBox.critical(self, "오류", "비밀번호 salt/hash 정보가 없어 설정을 저장할 수 없습니다. 앱을 재시작하거나 비밀번호를 설정해주세요.")
            return False

        settings = {
            'password_salt': base64.b64encode(self._password_salt).decode('utf-8'),
            'master_password_hash': self._master_password_hash,
            'phone_stream_url': self.phone_stream_url,
            'encrypted_discord_webhook_url': encrypted_discord_webhook,
            'streaming_port': self.streaming_port,
            'confidence_threshold': self.confidence_threshold,
            'save_path': self.current_save_path,
            'model_registry': self.model_registry
        }
        try:
            with open(SETTINGS_FILE, 'w', encoding='utf-8') as f:
                json.dump(settings, f, indent=4)
            print(f"[{SETTINGS_FILE}] 설정이 저장되었습니다.")

            self.update_web_model_info()
            self.update_web_confidence_info()

            return True
        except Exception as e:
            print(f"[{SETTINGS_FILE}] 저장 중 오류: {e}")
            QMessageBox.critical(self, "설정 저장 오류", f"설정 저장 중 오류 발생: {e}")
            return False

    def apply_settings(self):
        new_phone_stream_url = self.le_phone_stream_url.text().strip()
        new_discord_webhook_url = self.le_discord_webhook_url.text().strip()
        new_streaming_port_str = self.le_streaming_port.text().strip()
        new_confidence_threshold_str = self.le_confidence_threshold.text().strip()

        if not (new_phone_stream_url.startswith("http://") or new_phone_stream_url.startswith("https://")):
            QMessageBox.warning(self, "설정 오류", "유효한 웹캠 링크(http:// 또는 https://)를 입력해주세요.")
            return
        if new_discord_webhook_url != "" and not (new_discord_webhook_url.startswith("http://") or new_discord_webhook_url.startswith("https://")):
            QMessageBox.warning(self, "설정 오류", "유효한 디스코드 웹훅 URL(http:// 또는 https://)을 입력해주세요. 비워둘 수 있습니다.")
            return
        if not new_streaming_port_str.isdigit() or not (1024 <= int(new_streaming_port_str) <= 65535):
            QMessageBox.warning(self, "설정 오류", "유효한 웹 스트리밍 포트 (1024~65535)를 입력해주세요.")
            return
        try:
            new_confidence_threshold = float(new_confidence_threshold_str)
            if not (0.00 <= new_confidence_threshold <= 1.00):
                QMessageBox.warning(self, "설정 오류", "유효한 신뢰도 임계값 (0.00-1.00)을 입력해주세요.")
                return
        except ValueError:
            QMessageBox.warning(self, "설정 오류", "유효한 숫자 형식의 신뢰도 임계값을 입력해주세요.")
            return

        new_streaming_port = int(new_streaming_port_str)
        settings_changed = False

        if self.phone_stream_url != new_phone_stream_url:
            self.phone_stream_url = new_phone_stream_url
            if self.is_camera_running:
                self.stop_camera()
                QTimer.singleShot(500, self.start_camera_stream)
            QMessageBox.information(self, "설정 적용", "웹캠 링크가 변경되었습니다. 카메라를 재시작합니다.")
            settings_changed = True

        if self.discord_webhook_url != new_discord_webhook_url:
            self.discord_webhook_url = new_discord_webhook_url
            settings_changed = True

        if self.streaming_port != new_streaming_port:
            old_port = self.streaming_port
            self.streaming_port = new_streaming_port

            if self.web_stream_server_thread and self.web_stream_server_thread.isRunning():
                QMessageBox.information(self, "설정 적용", f"웹 스트리밍 포트가 {old_port}에서 {new_streaming_port}로 변경되어 서버를 재시작합니다.")
                self.web_stream_server_thread.stop()
                self.web_stream_server_thread.wait(5000)
                if self.web_stream_server_thread and self.web_stream_server_thread.isRunning():
                    QMessageBox.warning(self, "서버 재시작 오류", "이전 웹 스트리밍 서버가 정상적으로 종료되지 않았습니다. 앱을 재시작하는 것이 좋습니다.")

            self.web_stream_server_thread = VideoStreamer(self.server_host_ip, self.streaming_port, parent=self)
            self.web_stream_server_thread.streaming_url_ready.connect(self.update_streaming_info_label)
            self.web_stream_server_thread.command_from_web.connect(self.handle_web_command)
            self.web_stream_server_thread.program_stop_signal.connect(self.close)
            self.web_stream_server_thread.select_model_signal.connect(self.handle_web_model_selection)
            self.web_stream_server_thread.rotate_camera_signal.connect(self.handle_web_camera_rotation)
            self.web_stream_server_thread.set_confidence_signal.connect(self.handle_web_set_confidence)
            self.update_web_model_info()
            self.update_web_confidence_info()
            self.web_stream_server_thread.start()
            settings_changed = True

        if self.confidence_threshold != new_confidence_threshold:
            self.confidence_threshold = new_confidence_threshold
            self.le_confidence_threshold.setText(f"{self.confidence_threshold:.2f}")
            settings_changed = True

        if settings_changed:
            if self.save_settings():
                QMessageBox.information(self, "설정 완료", "새로운 설정이 적용되었고 저장되었습니다.")
        else:
            QMessageBox.information(self, "설정 알림", "변경된 설정이 없습니다.")

    def update_web_model_info(self):
        if self.web_stream_server_thread and self.web_stream_server_thread.isRunning():
            self.web_stream_server_thread.set_model_info_for_web(self.model_registry, self.current_yolo_model_name)
        else:
            print("웹 스트리밍 서버가 실행 중이 아니므로 웹 모델 정보를 업데이트할 수 없습니다.")

    def update_web_confidence_info(self):
        if self.web_stream_server_thread and self.web_stream_server_thread.isRunning():
            self.web_stream_server_thread.set_confidence_for_web(self.confidence_threshold)
        else:
            print("웹 스트리밍 서버가 실행 중이 아니므로 웹 신뢰도 정보를 업데이트할 수 없습니다.")

    def set_yolo_model(self, model_path: str, is_initial_load=False):
        if model_path is None or not model_path.strip():
            self.status_label.setText("YOLO 모델 파일이 선택되지 않았습니다.")
            self.model = None
            self.yolo_model_path = None
            self.current_yolo_model_name = "없음"
            self.lbl_model_path.setText(f"현재 YOLO 모델: {self.current_yolo_model_name}")
            self.update_web_model_info()
            return

        if self.yolo_model_path == model_path and self.model is not None:
            self.status_label.setText(f"'{os.path.basename(model_path)}' 모델이 이미 활성화되어 있습니다.")
            return

        if not os.path.exists(model_path):
            error_msg = f"오류: YOLO 모델 파일 '{os.path.basename(model_path)}'이 존재하지 않습니다."
            self.status_label.setText(error_msg)
            QMessageBox.critical(self, "YOLO 모델 오류", error_msg + " 파일을 다시 선택해 주세요.")
            self.model = None
            self.yolo_model_path = None
            self.current_yolo_model_name = "없음"
            self.lbl_model_path.setText(f"현재 YOLO 모델: {self.current_yolo_model_name}")
            self.update_web_model_info()
            return

        self.yolo_model_path = model_path
        self.current_yolo_model_name = os.path.basename(model_path)
        self.lbl_model_path.setText(f"현재 YOLO 모델: {self.current_yolo_model_name}")
        self.status_label.setText(f"YOLO 모델 준비됨: {self.current_yolo_model_name} (미로드)")
        print(f"YOLO model path set: {self.yolo_model_path}")

        if self.model is not None:
            print("기존 YOLO 모델 객체 해제 중...")
            del self.model
            self.model = None

        if model_path in self.model_registry:
            self.model_registry.remove(model_path)
        self.model_registry.append(model_path)
        self.save_settings()

        if self.is_camera_running:
            self.stop_camera()
            QTimer.singleShot(500, self.start_camera_stream)

    def select_yolo_model(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self,
            "YOLO 모델 파일 선택",
            os.path.dirname(self.yolo_model_path) if self.yolo_model_path else "",
            "YOLO Model Files (*.pt);;All Files (*)"
        )
        if file_path:
            self.set_yolo_model(file_path)

    def update_streaming_info_label(self, url):
        self.streaming_info_label.setText(f"웹 제어 & 스트리밍 URL: <a href='{url}'>{url}</a> (휴대폰 브라우저로 접속하세요)")
        self.streaming_info_label.setOpenExternalLinks(True)

    def select_save_folder(self):
        folder_path = QFileDialog.getExistingDirectory(self, "사진 저장 폴더 선택", self.current_save_path)
        if folder_path:
            self.current_save_path = folder_path
            self.lbl_save_path.setText(f"저장 폴더: {self.current_save_path}")
            QMessageBox.information(self, "저장 폴더", f"사진이 '{self.current_save_path}'에 저장됩니다.")
            self.save_settings()

    def open_save_folder(self):
        if os.path.exists(self.current_save_path):
            try:
                if os.name == 'nt':
                    subprocess.Popen(['explorer', self.current_save_path])
                elif os.uname().sysname == 'Darwin':
                    subprocess.Popen(['open', self.current_save_path])
                else:
                    subprocess.Popen(['xdg-open', self.current_save_path])
            except Exception as e:
                QMessageBox.critical(self, "폴더 열기 오류", f"저장 폴더를 여는 중 오류 발생: {e}")
        else:
            QMessageBox.warning(self, "폴더 없음", "지정된 저장 폴더가 존재하지 않습니다.")

    def rotate_camera(self):
        self.rotation_angle = (self.rotation_angle + 90) % 360
        self.btn_rotate_camera.setText(f"카메라 회전 ({self.rotation_angle}º)")
        self.status_label.setText(f"카메라 회전: {self.rotation_angle}도")
        print(f"카메라 회전 각도 변경: {self.rotation_angle}도")

    def toggle_camera(self):
        if self.is_camera_running:
            self.stop_camera()
        else:
            self.start_camera_stream()

    def start_camera_stream(self):
        if self.yolo_model_path is None:
            QMessageBox.warning(self, "경고", "YOLO 모델 파일이 선택되지 않아 카메라를 시작할 수 없습니다. '모델 파일 선택' 버튼으로 모델을 선택해주세요.")
            return

        self.cap_main = cv2.VideoCapture(self.phone_stream_url)
        if not self.cap_main.isOpened():
            self.status_label.setText("오류: 휴대폰 카메라 스트림에 연결할 수 없습니다. URL을 확인하세요.")
            QMessageBox.critical(self, "카메라 오류", "휴대폰 카메라 스트림에 연결할 수 없습니다. IP WebCam 앱이 실행 중이고 URL이 올바른지 확인하세요.")
            self.is_camera_running = False
            self.btn_send_discord_manual.setEnabled(False)
            self.btn_save_manual.setEnabled(False)
            return

        self.status_label.setText(f"카메라 스트림 시작, YOLO 분석 준비됨: {self.current_yolo_model_name} (로딩 중...)")
        self.is_camera_running = True
        self.btn_send_discord_manual.setEnabled(True)
        self.btn_save_manual.setEnabled(True)
        self.btn_start_camera_main.setText("YOLO 카메라 중지")
        print("YOLO 카메라 스트림 시작")

    def stop_camera(self):
        if self.cap_main:
            self.cap_main.release()
            self.cap_main = None
        self.is_camera_running = False
        self.btn_send_discord_manual.setEnabled(False)
        self.btn_save_manual.setEnabled(False)
        self.video_label_main.setText("YOLO 분석 스트림 중지됨. 'YOLO 카메라 시작' 버튼을 눌러주세요.")
        self.btn_start_camera_main.setText("YOLO 카메라 시작")
        print("YOLO 분석 스트림 중지")

    @Slot()
    def update_frame(self):
        if self.is_camera_running and self.cap_main and self.cap_main.isOpened():
            ret_main, frame_main = self.cap_main.read()
            if ret_main:
                if self.rotation_angle == 90:
                    frame_main = cv2.rotate(frame_main, cv2.ROTATE_90_CLOCKWISE)
                elif self.rotation_angle == 180:
                    frame_main = cv2.rotate(frame_main, cv2.ROTATE_180)
                elif self.rotation_angle == 270:
                    frame_main = cv2.rotate(frame_main, cv2.ROTATE_90_COUNTERCLOCKWISE)

                annotated_frame_main = frame_main.copy()
                num_detections = 0

                if self.model is None and self.yolo_model_path:
                    try:
                        self.status_label.setText(f"YOLO 모델 로드 중: {self.current_yolo_model_name}...")
                        self.model = YOLO(self.yolo_model_path)
                        self.status_label.setText(f"YOLO 모델 로드 완료: {self.current_yolo_model_name}. 분석 중 (신뢰도: {self.confidence_threshold:.2f})...")
                    except Exception as e:
                        self.status_label.setText(f"YOLO 모델 로드 실패: {e}. 모델 파일을 확인해주세요.")
                        print(f"YOLO model loading failed: {e}")
                        self.model = None

                if self.model:
                    try:
                        results_main = self.model(frame_main, conf=self.confidence_threshold, iou=0.5, verbose=False)
                        annotated_frame_main = results_main[0].plot()
                        num_detections = len(results_main[0].boxes) if results_main[0].boxes else 0
                        self.status_label.setText(f"YOLO 분석 중 (신뢰도: {self.confidence_threshold:.2f})... 감지된 객체 수: {num_detections}")
                    except Exception as e:
                        self.status_label.setText(f"YOLO 분석 중 오류 발생: {e}. 모델을 다시 로드하거나 교체해주세요.")
                        print(f"YOLO analysis error: {e}")
                        del self.model
                        self.model = None
                else:
                    self.status_label.setText("YOLO 모델이 로드되지 않아 분석을 수행하지 않습니다. '모델 파일 선택' 버튼으로 모델을 선택해주세요.")

                self.current_annotated_frame_main = annotated_frame_main

                rgb_image_main = cv2.cvtColor(annotated_frame_main, cv2.COLOR_BGR2RGB)
                self.video_label_main.setPixmap(QPixmap.fromImage(QImage(rgb_image_main.data, rgb_image_main.shape[1], rgb_image_main.shape[0], rgb_image_main.shape[1] * 3, QImage.Format_RGB888)).scaled(self.video_label_main.size(), Qt.KeepAspectRatio, Qt.SmoothTransformation))

                is_success, buffer = cv2.imencode(".jpg", annotated_frame_main)
                if is_success:
                    with shared_frame_lock:
                        shared_annotated_frame_bytes.clear()
                        shared_annotated_frame_bytes.append(buffer.tobytes())
            else:
                self.status_label.setText("메인 스트림 프레임을 받아오지 못했습니다. 스트림 연결을 확인하세요.")
                print("메인 스트림 프레임 받아오기 실패")
                self.stop_camera()
        elif not self.is_camera_running:
             self.video_label_main.setText("YOLO 분석 스트림 중지됨. 'YOLO 카메라 시작' 버튼을 눌러주세요.")

    @Slot(str)
    def handle_web_command(self, full_command):
        print(f"Handling Web command: {full_command}")
        parts = full_command.split(":", 2)
        command_type = parts[0]
        source = parts[1]
        message = parts[2] if len(parts) > 2 else None

        self.execute_action(command_type, source, message)

    @Slot(str)
    def handle_web_model_selection(self, model_path):
        print(f"Handling Web model selection: {model_path}")
        self.set_yolo_model(model_path)

    @Slot(int)
    def handle_web_camera_rotation(self, angle):
        self.rotation_angle = angle
        self.btn_rotate_camera.setText(f"카메라 회전 ({self.rotation_angle}º)")
        self.status_label.setText(f"웹 원격으로 카메라 회전: {self.rotation_angle}도")
        print(f"웹 원격으로 카메라 회전 각도 변경: {self.rotation_angle}도")

    @Slot(float)
    def handle_web_set_confidence(self, confidence_value):
        print(f"Handling Web set confidence: {confidence_value:.2f}")
        self.le_confidence_threshold.setText(f"{confidence_value:.2f}")
        self.apply_settings()

    def execute_action(self, command_type, source="", discord_message=None):
        if self.current_annotated_frame_main is None:
            if source != "웹 원격":
                QMessageBox.warning(self, "오류", "YOLO 분석 프레임이 없습니다. YOLO 카메라가 실행 중인지 확인하세요.")
            return

        if command_type == "CAPTURE":
            try:
                timestamp = int(time.time())
                filename = f"yolo_capture_{timestamp}.jpg"
                filepath = os.path.join(self.current_save_path, filename)
                os.makedirs(self.current_save_path, exist_ok=True)
                cv2.imwrite(filepath, self.current_annotated_frame_main)
                if source != "웹 원격":
                    QMessageBox.information(self, "사진 저장", f"사진이 로컬에 저장되었습니다: {filepath} ({source} 액션)")
                print(f"사진 저장 성공: {filepath} ({source} 액션)")
            except Exception as e:
                if source != "웹 원격":
                    QMessageBox.critical(self, "사진 저장 오류", f"사진 저장 중 오류 발생: {e} ({source} 액션)")
                print(f"사진 저장 오류 ({source} 액션): {e}")

        elif command_type == "DISCORD":
            final_discord_message = discord_message
            if final_discord_message is None or final_discord_message.strip() == "":
                 if source == "수동":
                     message_text, ok_message = QInputDialog.getText(self, "디스코드 메시지", "디스코드에 보낼 메시지를 입력하세요 (선택 사항):", text=f"YOLOv8-Seg 분석 결과입니다! (수동 액션)")
                     if ok_message:
                         final_discord_message = message_text
                     else:
                         final_discord_message = f"YOLOv8-Seg 분석 결과입니다! (수동 액션)"
                 else:
                     final_discord_message = f"YOLOv8-Seg 분석 결과입니다! ({source} 액션)"

            if not self.discord_webhook_url:
                if source == "수동":
                    QMessageBox.warning(self, "경고", "디스코드 웹훅 URL이 설정되지 않았습니다. 앱 설정에서 웹훅 URL을 입력해주세요.")
                print(f"디스코드 웹훅 URL 미설정. {source} 액션 전송 실패.")
                return

            if source == "수동":
                QMessageBox.information(self, "Discord 전송", "디스코드에 이미지를 전송합니다...")

            is_sent = send_image_to_discord(self.discord_webhook_url, self.current_annotated_frame_main, final_discord_message)

            if source == "수동":
                if is_sent:
                    QMessageBox.information(self, "전송 성공", f"YOLO 결과 이미지가 디스코드에 성공적으로 전송되었습니다. ({source} 액션)")
                else:
                    QMessageBox.critical(self, "전송 실패", f"디스코드 전송 중 오류가 발생했습니다. 웹훅 URL을 확인하세요. ({source} 액션)")
            elif not is_sent:
                 print(f"웹 원격 디스코드 전송 실패: 웹훅 URL 또는 네트워크 문제")

        else:
            if source != "웹 원격":
                QMessageBox.warning(self, "알 수 없는 명령", f"알 수 없는 명령: {command_type} ({source} 액션)")
            print(f"알 수 없는 명령 ({source} 액션): {command_type}")

    def closeEvent(self, event):
        print("Closing YoloApp gracefully...")
        self.stop_camera()

        if self.web_stream_server_thread and self.web_stream_server_thread.isRunning():
            self.web_stream_server_thread.stop()
            self.web_stream_server_thread.wait()

        QApplication.instance().quit()
        super().closeEvent(event)

if __name__ == "__main__":
    app = QApplication([])
    window = YoloApp()
    window.show()
    app.exec()
