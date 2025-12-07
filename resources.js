// yoluwa_website/resources.js
const translations = {
    "ko_KR": {
        "nav_about": "소개",
        "nav_video": "설명 영상",
        "nav_features": "주요 기능",
        "nav_model_download": "모델 다운로드",
        "nav_install": "설치 & 다운로드",
        "nav_donate": "후원",
        "nav_contact": "문의",
        "hero_title": "YoLuWa!",
        "hero_slogan_part1": "강력한 YOLO 기반 실시간 웹캠 분석,",
        "hero_slogan_part2": "간편한 원격 제어, 안전한 개인 정보 보호까지!",
        "hero_watch_video": "설명 영상 보기",
        "hero_get_started": "지금 시작하기",
        "total_downloads": "총 다운로드 수:",
        "loading": "로딩 중...",
        "about_title": "YoLuWa!는 무엇인가요?",
        "about_p1": "YoLuWa!는 **Your YOLO Live Web Analyzer**의 약자로, 휴대폰 카메라를 활용하여 실시간으로 YOLO 기반 객체 인식을 수행하고, 이 결과를 웹 인터페이스를 통해 원격으로 제어하고 모니터링할 수 있는 혁신적인 파이썬 앱입니다. 사용자의 편의성, 강력한 기능, 그리고 견고한 보안을 최우선으로 설계되었습니다.",
        "about_p2": "강력한 웹 기반 원격 제어 기능을 통해 PC에 직접 접근하지 않고도 카메라 스트림을 확인하고, YOLO 모델을 변경하며, 신뢰도 임계값을 조절하는 등 다양한 작업을 수행할 수 있습니다. 또한, 디스코드 웹훅 연동을 통해 분석 결과 이미지를 편리하게 공유할 수 있으며, 모든 설정은 마스터 비밀번호로 암호화되어 안전하게 보호됩니다.",
        "about_p3": "게으른 로딩(Lazy Loading) 방식으로 YOLO 모델을 최적화하여 앱 시작 시 리소스 소모를 최소화하고, 필요한 시점에만 모델을 로드하여 쾌적한 사용 환경을 제공합니다. YoLuWa!는 AI 기반 비전 프로젝트를 더욱 쉽고 강력하게 만들어 줄 당신의 스마트 파트너가 될 것입니다.",
        "video_title": "YoLuWa! 설명 영상",
        "video_desc": "YoLuWa!의 주요 기능과 사용 방법을 영상으로 쉽게 확인해보세요!",
        "features_title": "주요 기능",
        "feature_realtime_yolo_h": "실시간 YOLO 분석",
        "feature_realtime_yolo_p": "휴대폰 카메라를 웹캠으로 활용하여 실시간으로 YOLO 객체 인식을 수행하고, 분석 결과를 스트리밍합니다.",
        "feature_intuitive_web_h": "직관적인 웹 제어",
        "feature_intuitive_web_p": "PC 앱에 직접 접근하지 않고도 휴대폰 웹 브라우저를 통해 모든 기능을 원격으로 제어할 수 있습니다.",
        "feature_strong_security_h": "강력한 보안",
        "feature_strong_security_p": "마스터 비밀번호 설정 및 웹훅 URL 암호화로 앱과 데이터의 보안을 철저하게 지켜줍니다.",
        "feature_dynamic_model_h": "동적 모델 관리",
        "feature_dynamic_model_p": "실시간으로 YOLO 모델을 변경하고 신뢰도 임계값을 조절하여 다양한 환경에 최적화할 수 있습니다.",
        "feature_discord_integration_h": "디스코드 연동",
        "feature_discord_integration_p": "분석된 결과 이미지와 함께 원하는 메시지를 디스코드 채널로 즉시 전송할 수 있습니다.",
        "feature_performance_h": "성능 최적화",
        "feature_performance_p": "게으른 로딩 방식으로 앱 시작 시 리소스 소모를 최소화하고 쾌적한 사용 환경을 제공합니다.",

        "model_download_title": "YOLO 모델 다운로드 및 커스텀 모델 제작",
        "yolo_model_download_desc": "YoLuWa!에서 사용 가능한 다양한 사전 훈련된 YOLO 모델들을 다운로드하고, Roboflow를 통해 자신만의 커스텀 모델을 체험하고 제작할 수 있습니다.",
        "download_pretrained_models_h": "사전 훈련된 YOLO 모델 다운로드",
        "download_pretrained_models_p": "Ultralytics에서 공식적으로 제공하는 다양한 크기와 성능의 YOLOv8 모델들을 다운로드하여 YoLuWa! 앱에서 바로 사용해보세요.",
        "ultralytics_website_btn": "Ultralytics 웹사이트로 이동",
        "roboflow_intro_h": "Roboflow로 나만의 YOLO 모델 만들기",
        "roboflow_intro_p1": "Roboflow는 데이터셋 관리, 어노테이션, 전처리, 증강 및 모델 훈련까지, YOLO 모델 개발의 모든 과정을 지원하는 강력한 플랫폼입니다. 미리 학습된 모델들을 체험해보고 자신만의 데이터를 활용해 새로운 모델을 만들어보세요!",
        "roboflow_explore_btn": "Roboflow 모델 체험하기",
        "roboflow_create_btn": "Roboflow에서 모델 만들기",
        
        "install_title": "설치 및 다운로드",
        "install_windows_btn": "Windows",
        "install_mac_btn": "macOS",
        "install_linux_btn": "Linux",
        "install_source_btn": "소스 코드",
        "install_windows_h": "Windows용 YoLuWa! 설치 (추천)",
        "install_windows_p": "Windows 사용자분들께서는 다음 단계를 따라 간편하게 YoLuWa!를 설치하고 실행할 수 있습니다.",
        "install_step1_h": "최신 버전 다운로드:",
        "install_step1_p": "아래 버튼을 클릭하여 YoLuWa! Windows 실행 파일을 다운로드합니다.",
        "install_step2_h": "YOLO 모델 파일 준비:",
        "install_step2_p": "사용하실 .pt 형식의 YOLO 모델 파일을 미리 준비해 둡니다. (예: yolov8n.pt)",
        "install_step3_h": "IP WebCam 앱 설치:",
        "install_step3_p": "휴대폰에 IP WebCam (안드로이드) 또는 유사한 iOS 앱을 설치하고 실행하여 스트리밍 URL을 확인합니다.",
        "install_step4_h": "YoLuWa! 실행:",
        "install_step4_p": "다운로드한 .exe 파일을 실행하고, 안내에 따라 마스터 비밀번호를 설정합니다.",
        "install_step5_h": "설정 입력:",
        "install_step5_p": "앱 GUI의 설정 섹션에 휴대폰 웹캠 URL, 디스코드 웹훅 URL, 원하는 웹 스트리밍 포트 등을 입력하고 '설정 적용과 저장' 버튼을 클릭합니다.",
        "install_step6_h": "카메라 시작:",
        "install_step6_p": "YOLO 카메라 시작/중지 버튼을 눌러 분석을 시작합니다.",
        "install_windows_download_btn": "Windows용 최신 버전 다운로드",
        "install_mac_h": "macOS용 YoLuWa! 설치 (Coming Soon)",
        "install_mac_p1": "macOS 버전은 현재 준비 중입니다. 조만간 편리한 설치 프로그램을 제공할 예정입니다.",
        "install_mac_p2": "PyInstaller를 이용한 앱 번들 제공 예정",
        "install_mac_p3": "최적화된 성능과 사용자 경험 제공",
        "install_mac_p4": "그동안 소스 코드를 통해 수동으로 설치하여 사용하실 수 있습니다.",
        "install_linux_h": "Linux용 YoLuWa! 설치 (Coming Soon)",
        "install_linux_p1": "Linux 버전은 현재 준비 중입니다. 다양한 배포판에서 안정적으로 동작하는 설치 패키지를 제공할 예정입니다.",
        "install_linux_p2": "AppImage 또는 Snap/Flatpak 패키지 제공 예정",
        "install_linux_p3": "커뮤니티와 협력하여 다양한 환경 지원",
        "install_source_h": "소스 코드로부터 설치 및 실행",
        "install_source_p": "개발자 또는 고급 사용자분들을 위한 소스 코드 설치 가이드입니다.",
        "install_python_install_h": "Python 설치:",
        "install_python_install_p": "Python 3.8 이상 버전이 설치되어 있는지 확인합니다.",
        "install_git_clone_h": "Git Clone 또는 다운로드:",
        "install_git_clone_p": "YoLuWa! GitHub 저장소에서 소스 코드를 다운로드합니다.",
        "install_venv_h": "가상 환경 설정 (권장):",
        "install_lib_install_h": "필요 라이브러리 설치:",
        "install_yolo_model_install_h": "YOLO 모델 파일 준비:",
        "install_yolo_model_install_p": ".pt 형식의 YOLO 모델 파일과 templates 폴더 안의 index.html 파일을 yoluwaPC.py와 같은 디렉토리에 둡니다.",
        "install_yoluwa_exec_h": "YoLuWa! 실행:",
        "install_master_pw_h": "최초 설정:",
        "install_master_pw_p": "프로그램 최초 실행 시 마스터 비밀번호를 설정합니다.",
        "install_settings_h": "설정 입력:",
        "install_settings_p": "앱 GUI에서 필요한 설정값(웹캠 URL, 디스코드 웹훅 등)을 입력하고 저장합니다.",
        "github_repo_link": "GitHub 저장소로 이동",
        "source_code_download": "소스 코드 다운로드",
        "previous_versions_title": "이전 버전 다운로드",
        "previous_versions_desc": "특정 환경이나 기능이 필요한 경우, 이전 버전의 YoLuWa!를 다운로드할 수 있습니다.",
        "previous_versions_loading": "이전 버전 목록을 로드 중입니다...",
        "release_tag_name": "릴리스",
        "release_download_count": "다운로드 수:",
        "no_previous_releases": "이전 버전 릴리스가 없습니다.",
        "manual_download_title": "직접 다운로드 링크 (수동 업데이트 필요 시)",
        "manual_download_desc": "각 플랫폼에 맞는 최신 버전을 다운로드하세요. 아래 링크는 <strong>수동으로 업데이트</strong>해야 합니다.",
        "manual_windows_download": "Windows (.exe)",
        "manual_mac_download": "macOS (.zip)",
        "manual_linux_download": "Linux (.AppImage)",
        "manual_source_download": "소스 코드 (.zip)",
        "manual_update_note": "자동 로딩되는 '이전 버전 다운로드' 섹션을 권장하며, 이곳의 링크는 수동으로 업데이트해야 합니다.",
        "cta_title": "지금 바로 YoLuWa!를 경험해보세요!",
        "cta_desc": "당신의 비전 AI 프로젝트에 새로운 차원의 편리함과 보안을 더합니다.",
        "cta_download_btn": "YoLuWa! 다운로드",
        "footer_rights": "2025 YoLuWa!. All Rights Reserved.",
        "footer_website": "공식 웹사이트:",
        "footer_developer": "개발자:",
        "donate_title": "YoLuWa! 후원하기",
        "donate_p1": "YoLuWa! 프로젝트는 여러분의 관심과 후원으로 발전합니다. 소중한 후원은 개발팀에게 큰 힘이 됩니다. 후원해주신 모든 분들께 진심으로 감사드립니다!",
        "bank_name": "은행명:",
        "bank_name_value": "카카오뱅크",
        "account_number": "계좌번호:",
        "account_number_value": "7777-03-5969570",
        "account_holder": "예금주:",
        "account_holder_value": "석*우",
        "copy_account_btn": "계좌번호 복사",
        "copied_message": "계좌번호가 복사되었습니다!",
        "mobile_download_note": "현재 보고 계신 페이지는 모바일 기기에 최적화되어 있습니다.",
        "no_downloads_available": "다운로드 가능한 파일이 없습니다."
    },
    // English translation
    "en_US": {
        "nav_about": "About",
        "nav_video": "Video Guide",
        "nav_features": "Features",
        "nav_model_download": "Model Download",
        "nav_install": "Install & Download",
        "nav_donate": "Donate",
        "nav_contact": "Contact",
        "hero_title": "YoLuWa!",
        "hero_slogan_part1": "Powerful YOLO-based Real-time Webcam Analysis,",
        "hero_slogan_part2": "Easy Remote Control, Secure Privacy!",
        "hero_watch_video": "Watch Video Guide",
        "hero_get_started": "Get Started Now",
        "total_downloads": "Total Downloads:",
        "loading": "Loading...",
        "about_title": "What is YoLuWa!?",
        "about_p1": "YoLuWa!, short for **Your YOLO Live Web Analyzer**, is an innovative Python app that leverages your phone's camera for real-time YOLO-based object detection. It allows remote control and monitoring of results via a web interface, designed with user convenience, powerful features, and robust security as top priorities.",
        "about_p2": "With powerful web-based remote control features, you can check camera streams, change YOLO models, adjust confidence thresholds, and perform various tasks without direct access to your PC. Additionally, it integrates with Discord webhooks to easily share analysis results, and all settings are securely protected with a master password.",
        "about_p3": "YoLuWa! optimizes resource consumption during app startup with a 'Lazy Loading' approach for YOLO models, loading them only when needed for analysis, providing a comfortable user experience. YoLuWa! will be your smart partner, making AI-based vision projects easier and more powerful.",
        "video_title": "YoLuWa! Video Guide",
        "video_desc": "Watch the video to easily understand YoLuWa!'s main features and how to use it!",
        "features_title": "Key Features",
        "feature_realtime_yolo_h": "Real-time YOLO Analysis",
        "feature_realtime_yolo_p": "Utilizes your phone's camera as a webcam to perform real-time YOLO object detection and stream analysis results.",
        "feature_intuitive_web_h": "Intuitive Web Control",
        "feature_intuitive_web_p": "Remotely control all functions via your phone's web browser without direct PC access.",
        "feature_strong_security_h": "Strong Security",
        "feature_strong_security_p": "Master password setup and webhook URL encryption ensure thorough protection of your app and data.",
        "feature_dynamic_model_h": "Dynamic Model Management",
        "feature_dynamic_model_p": "Change YOLO models and adjust confidence thresholds in real-time for optimal performance in various environments.",
        "feature_discord_integration_h": "Discord Integration",
        "feature_discord_integration_p": "Instantly send analyzed result images along with custom messages to your Discord channel.",
        "feature_performance_h": "Performance Optimization",
        "feature_performance_p": "Minimizes resource consumption during app startup with lazy loading, providing a smooth user experience.",

        "model_download_title": "YOLO Model Download & Custom Model Creation",
        "yolo_model_download_desc": "Download various pre-trained YOLO models usable with YoLuWa!, and experience/create your own custom models via Roboflow.",
        "download_pretrained_models_h": "Download Pre-trained YOLO Models",
        "download_pretrained_models_p": "Download YOLOv8 models of various sizes and performance officially provided by Ultralytics and use them directly in the YoLuWa! app.",
        "ultralytics_website_btn": "Go to Ultralytics Website",
        "roboflow_intro_h": "Create Your Own YOLO Model with Roboflow",
        "roboflow_intro_p1": "Roboflow is a powerful platform that supports every step of YOLO model development, from dataset management, annotation, preprocessing, augmentation, to model training. Experience pre-trained models and create new ones using your own data!",
        "roboflow_explore_btn": "Explore Models on Roboflow",
        "roboflow_create_btn": "Create Models on Roboflow",

        "install_title": "Install & Download",
        "install_windows_btn": "Windows",
        "install_mac_btn": "macOS",
        "install_linux_btn": "Linux",
        "install_source_btn": "Source Code",
        "install_windows_h": "Install YoLuWa! for Windows (Recommended)",
        "install_windows_p": "Windows users can easily install and run YoLuWa! by following these steps.",
        "install_step1_h": "Download Latest Version:",
        "install_step1_p": "Click the button below to download the YoLuWa! Windows executable.",
        "install_step2_h": "Prepare YOLO Model File:",
        "install_step2_p": "Have your .pt format YOLO model file ready (e.g., yolov8n.pt).",
        "install_step3_h": "Install IP WebCam App:",
        "install_step3_p": "Install IP WebCam (Android) or a similar iOS app on your phone and start it to get the streaming URL.",
        "install_step4_h": "Run YoLuWa!:",
        "install_step4_p": "Run the downloaded .exe file and follow the instructions to set up the master password.",
        "install_step5_h": "Enter Settings:",
        "install_step5_p": "In the app's GUI settings section, enter your phone's webcam URL, Discord webhook URL, desired web streaming port, etc., and click 'Apply Settings & Save'.",
        "install_step6_h": "Start Camera:",
        "install_step6_p": "Click the 'Start/Stop YOLO Camera' button to begin analysis.",
        "install_windows_download_btn": "Download Latest Version for Windows",
        "install_mac_h": "YoLuWa! for macOS (Coming Soon)",
        "install_mac_p1": "macOS version is currently under preparation. We will soon provide a convenient installer.",
        "install_mac_p2": "PyInstaller app bundle will be provided",
        "install_mac_p3": "Optimized performance and user experience",
        "install_mac_p4": "Meanwhile, you can use the source code for manual installation.",
        "install_linux_h": "YoLuWa! for Linux (Coming Soon)",
        "install_linux_p1": "Linux version is currently under preparation. We will provide stable installation packages for various distributions.",
        "install_linux_p2": "AppImage or Snap/Flatpak packages will be provided",
        "install_linux_p3": "Collaboration with the community for wider support",
        "install_source_h": "Install and Run from Source Code",
        "install_source_p": "This guide is for developers and advanced users for source code installation.",
        "install_python_install_h": "Install Python:",
        "install_python_install_p": "Ensure Python 3.8 or higher is installed.",
        "install_git_clone_h": "Git Clone or Download:",
        "install_git_clone_p": "Download the source code from the YoLuWa! GitHub repository.",
        "install_venv_h": "Set up Virtual Environment (Recommended):",
        "install_lib_install_h": "Install Required Libraries:",
        "install_yolo_model_install_h": "Prepare YOLO Model File:",
        "install_yolo_model_install_p": "Place your .pt format YOLO model file and index.html from the templates folder in the same directory as yoluwaPC.py.",
        "install_yoluwa_exec_h": "Run YoLuWa!:",
        "install_master_pw_h": "Initial Setup:",
        "install_master_pw_p": "Set up the master password on the first run of the program.",
        "install_settings_h": "Enter Settings:",
        "install_settings_p": "Enter necessary settings (webcam URL, Discord webhook, etc.) in the app's GUI settings section and save them.",
        "github_repo_link": "Go to GitHub Repository",
        "source_code_download": "Download Source Code",
        "previous_versions_title": "Download Previous Versions",
        "previous_versions_desc": "If specific environments or features are required, you can download previous versions of YoLuWa!.",
        "previous_versions_loading": "Loading previous versions...",
        "release_tag_name": "Release",
        "release_download_count": "Downloads:",
        "no_previous_releases": "No previous releases available.",
        "manual_download_title": "Direct Download Links (For Manual Update)",
        "manual_download_desc": "Download the latest version for each platform. Links below require <strong>manual updates</strong>.",
        "manual_windows_download": "Windows (.exe)",
        "manual_mac_download": "macOS (.zip)",
        "manual_linux_download": "Linux (.AppImage)",
        "manual_source_download": "Source Code (.zip)",
        "manual_update_note": "We recommend the auto-loading 'Download Previous Versions' section, as these links need manual updates.",
        "cta_title": "Experience YoLuWa! Now!",
        "cta_desc": "Add a new level of convenience and security to your vision AI projects.",
        "cta_download_btn": "Download YoLuWa!",
        "footer_rights": "2025 YoLuWa!. All Rights Reserved.",
        "footer_website": "Official Website:",
        "footer_developer": "Developer:",
        "donate_title": "Donate to YoLuWa!",
        "donate_p1": "The YoLuWa! project thrives on your interest and support. Your valuable contributions are a great encouragement to the development team. We sincerely thank everyone who donates!",
        "bank_name": "Bank Name:",
        "bank_name_value": "KakaoBank",
        "account_number": "Account Number:",
        "account_number_value": "7777-03-5969570",
        "account_holder": "Account Holder:",
        "account_holder_value": "Seok*Woo",
        "copy_account_btn": "Copy Account Number",
        "copied_message": "Account number copied!",
        "mobile_download_note": "This page is optimized for mobile devices.",
        "no_downloads_available": "No download files are available."
    },
    // German translation
    "de": {
        "nav_about": "Über",
        "nav_video": "Video-Anleitung",
        "nav_features": "Funktionen",
        "nav_model_download": "Modell-Download",
        "nav_install": "Installieren & Download",
        "nav_donate": "Spenden",
        "nav_contact": "Kontakt",
        "hero_title": "YoLuWa!",
        "hero_slogan_part1": "Leistungsstarke YOLO-basierte Echtzeit-Webcam-Analyse,",
        "hero_slogan_part2": "Einfache Fernsteuerung, sicherer Datenschutz!",
        "hero_watch_video": "Video-Anleitung ansehen",
        "hero_get_started": "Jetzt starten",
        "total_downloads": "Gesamtdownloads:",
        "loading": "Lädt...",
        "about_title": "Was ist YoLuWa!?",
        "about_p1": "YoLuWa!, kurz für **Your YOLO Live Web Analyzer**, ist eine innovative Python-App, die Ihre Telefonkamera für die YOLO-basierte Objekterkennung in Echtzeit nutzt. Sie ermöglicht die Fernsteuerung und Überwachung von Ergebnissen über eine Weboberfläche, die auf Benutzerfreundlichkeit, leistungsstarke Funktionen und robuste Sicherheit ausgelegt ist.",
        "about_p2": "Mit leistungsstarken webbasierten Fernsteuerungsfunktionen können Sie Kameraströme überprüfen, YOLO-Modelle ändern, Konfidenzschwellen anpassen und verschiedene Aufgaben ohne direkten Zugriff auf Ihren PC ausführen. Darüber hinaus lässt es sich mit Discord-Webhooks integrieren, um Analyseergebnisse einfach zu teilen, und alle Einstellungen werden sicher durch ein Master-Passwort geschützt.",
        "about_p3": "YoLuWa! optimiert den Ressourcenverbrauch beim App-Start mit einem 'Lazy Loading'-Ansatz für YOLO-Modelle, die nur bei Bedarf zur Analyse geladen werden, was ein komfortables Benutzererlebnis bietet. YoLuWa! wird Ihr smarter Partner sein, der KI-basierte Vision-Projekte einfacher und leistungsfähiger macht.",
        "video_title": "YoLuWa! Video-Anleitung",
        "video_desc": "Sehen Sie sich das Video an, um die Hauptfunktionen und die Verwendung von YoLuWa! einfach zu verstehen!",
        "features_title": "Hauptfunktionen",
        "feature_realtime_yolo_h": "YOLO-Echtzeitanalyse",
        "feature_realtime_yolo_p": "Verwendet die Kamera Ihres Telefons als Webcam, um die YOLO-Objekterkennung in Echtzeit durchzuführen und die Analyseergebnisse zu streamen.",
        "feature_intuitive_web_h": "Intuitive Websteuerung",
        "feature_intuitive_web_p": "Steuern Sie alle Funktionen remote über den Webbrowser Ihres Telefons, ohne direkten PC-Zugriff.",
        "feature_strong_security_h": "Starke Sicherheit",
        "feature_strong_security_p": "Die Einrichtung eines Master-Passworts und die Verschlüsselung der Webhook-URL gewährleisten einen umfassenden Schutz Ihrer App und Daten.",
        "feature_dynamic_model_h": "Dynamische Modellverwaltung",
        "feature_dynamic_model_p": "Ändern Sie YOLO-Modelle und passen Sie Konfidenzschwellen in Echtzeit an, um die Leistung in verschiedenen Umgebungen zu optimieren.",
        "feature_discord_integration_h": "Discord-Integration",
        "feature_discord_integration_p": "Senden Sie analysierte Ergebnisbilder zusammen mit benutzerdefinierten Nachrichten sofort an Ihren Discord-Kanal.",
        "feature_performance_h": "Leistungsoptimierung",
        "feature_performance_p": "Minimiert den Ressourcenverbrauch beim App-Start durch verzögertes Laden und bietet ein reibungsloses Benutzererlebnis.",

        "model_download_title": "YOLO Modell-Download & Benutzerdefinierte Modellerstellung",
        "yolo_model_download_desc": "Laden Sie verschiedene vortrainierte YOLO-Modelle herunter, die mit YoLuWa! verwendet werden können, und erleben/erstellen Sie Ihre eigenen benutzerdefinierten Modelle über Roboflow.",
        "download_pretrained_models_h": "Vortrainierte YOLO-Modelle herunterladen",
        "download_pretrained_models_p": "Laden Sie YOLOv8-Modelle verschiedener Größen und Leistungen herunter, die offiziell von Ultralytics bereitgestellt werden, und verwenden Sie sie direkt in der YoLuWa!-App.",
        "ultralytics_website_btn": "Zur Ultralytics-Website",
        "roboflow_intro_h": "Erstellen Sie Ihr eigenes YOLO-Modell mit Roboflow",
        "roboflow_intro_p1": "Roboflow ist eine leistungsstarke Plattform, die jeden Schritt der YOLO-Modellentwicklung unterstützt, von der Datensatzverwaltung über die Annotation, Vorverarbeitung, Augmentierung bis hin zum Modelltraining. Erleben Sie vortrainierte Modelle und erstellen Sie neue mit Ihren eigenen Daten!",
        "roboflow_explore_btn": "Modelle auf Roboflow erkunden",
        "roboflow_create_btn": "Modelle auf Roboflow erstellen",

        "install_title": "Installieren & Download",
        "install_windows_btn": "Windows",
        "install_mac_btn": "macOS",
        "install_linux_btn": "Linux",
        "install_source_btn": "Quellcode",
        "install_windows_h": "YoLuWa! für Windows installieren (Empfohlen)",
        "install_windows_p": "Windows-Benutzer können YoLuWa! ganz einfach installieren und ausführen, indem sie diese Schritte befolgen.",
        "install_step1_h": "Neueste Version herunterladen:",
        "install_step1_p": "Klicken Sie auf die Schaltfläche unten, um die ausführbare YoLuWa!-Datei für Windows herunterzuladen.",
        "install_step2_h": "YOLO-Modelldatei vorbereiten:",
        "install_step2_p": "Halten Sie Ihre YOLO-Modelldatei im .pt-Format bereit (z.B. yolov8n.pt).",
        "install_step3_h": "IP-Webcam-App installieren:",
        "install_step3_p": "Installieren Sie IP-Webcam (Android) oder eine ähnliche iOS-App auf Ihrem Telefon und starten Sie sie, um die Streaming-URL zu erhalten.",
        "install_step4_h": "YoLuWa! ausführen:",
        "install_step4_p": "Führen Sie die heruntergeladene .exe-Datei aus und folgen Sie den Anweisungen, um das Master-Passwort einzurichten.",
        "install_step5_h": "Einstellungen eingeben:",
        "install_step5_p": "Geben Sie im GUI-Einstellungsbereich der App die URL der Telefon-Webcam, die Discord-Webhook-URL, den gewünschten Web-Streaming-Port usw. ein und klicken Sie auf 'Einstellungen übernehmen & speichern'.",
        "install_step6_h": "Kamera starten:",
        "install_step6_p": "Klicken Sie auf die Schaltfläche 'YOLO-Kamera starten/stoppen', um die Analyse zu starten.",
        "install_windows_download_btn": "Neueste Version für Windows herunterladen",
        "install_mac_h": "YoLuWa! für macOS (Demnächst)",
        "install_mac_p1": "Die macOS-Version befindet sich derzeit in Vorbereitung. Wir werden in Kürze ein praktisches Installationsprogramm bereitstellen.",
        "install_mac_p2": "PyInstaller-App-Bundle wird bereitgestellt",
        "install_mac_p3": "Optimierte Leistung und Benutzererfahrung",
        "install_mac_p4": "In der Zwischenzeit können Sie den Quellcode für die manuelle Installation verwenden.",
        "install_linux_h": "YoLuWa! für Linux (Demnächst)",
        "install_linux_p1": "Die Linux-Version befindet sich derzeit in Vorbereitung. Wir werden stabile Installationspakete für verschiedene Distributionen bereitstellen.",
        "install_linux_p2": "AppImage oder Snap/Flatpak-Pakete werden bereitgestellt",
        "install_linux_p3": "Zusammenarbeit mit der Community für umfassendere Unterstützung",
        "install_source_h": "Installieren und Ausführen vom Quellcode",
        "install_source_p": "Diese Anleitung richtet sich an Entwickler und fortgeschrittene Benutzer für die Quellcode-Installation.",
        "install_python_install_h": "Python installieren:",
        "install_python_install_p": "Stellen Sie sicher, dass Python 3.8 oder höher installiert ist.",
        "install_git_clone_h": "Git Clone oder Download:",
        "install_git_clone_p": "Laden Sie den Quellcode aus dem YoLuWa!-GitHub-Repository herunter.",
        "install_venv_h": "Virtuelle Umgebung einrichten (Empfohlen):",
        "install_lib_install_h": "Erforderliche Bibliotheken installieren:",
        "install_yolo_model_install_h": "YOLO-Modelldatei vorbereiten:",
        "install_yolo_model_install_p": "Legen Sie Ihre YOLO-Modelldatei im .pt-Format und index.html aus dem Ordner 'templates' in dasselbe Verzeichnis wie yoluwaPC.py.",
        "install_yoluwa_exec_h": "YoLuWa! ausführen:",
        "install_master_pw_h": "Ersteinrichtung:",
        "install_master_pw_p": "Richten Sie das Master-Passwort beim ersten Start des Programms ein.",
        "install_settings_h": "Einstellungen eingeben:",
        "install_settings_p": "Geben Sie die erforderlichen Einstellungen (Webcam-URL, Discord-Webhook usw.) im GUI-Einstellungsbereich der App ein und speichern Sie sie.",
        "github_repo_link": "Zum GitHub-Repository",
        "source_code_download": "Quellcode herunterladen",
        "previous_versions_title": "Vorherige Versionen herunterladen",
        "previous_versions_desc": "Falls bestimmte Umgebungen oder Funktionen erforderlich sind, können Sie frühere Versionen von YoLuWa! herunterladen.",
        "previous_versions_loading": "Alte Versionen werden geladen...",
        "release_tag_name": "Version",
        "release_download_count": "Downloads:",
        "no_previous_releases": "Keine vorherigen Versionen verfügbar.",
        "manual_download_title": "Direkte Download-Links (für manuelle Updates)",
        "manual_download_desc": "Laden Sie die neueste Version für jede Plattform herunter. Die unten stehenden Links erfordern <strong>manuelle Updates</strong>.",
        "manual_windows_download": "Windows (.exe)",
        "manual_mac_download": "macOS (.zip)",
        "manual_linux_download": "Linux (.AppImage)",
        "manual_source_download": "Quellcode (.zip)",
        "manual_update_note": "Wir empfehlen den automatisch ladenden Abschnitt 'Vorherige Versionen herunterladen', da diese Links manuell aktualisiert werden müssen.",
        "cta_title": "Erleben Sie YoLuWa! jetzt!",
        "cta_desc": "Fügen Sie Ihren Vision-AI-Projekten ein neues Maß an Komfort und Sicherheit hinzu.",
        "cta_download_btn": "YoLuWa! herunterladen",
        "footer_rights": "2025 YoLuWa!. Alle Rechte vorbehalten.",
        "footer_website": "Offizielle Website:",
        "footer_developer": "Entwickler:",
        "donate_title": "YoLuWa! Spenden",
        "donate_p1": "Das YoLuWa!-Projekt lebt von Ihrem Interesse und Ihrer Unterstützung. Ihre wertvollen Beiträge sind eine große Ermutigung für das Entwicklungsteam. Wir danken allen Spendern aufrichtig!",
        "bank_name": "Bankname:",
        "bank_name_value": "KakaoBank",
        "account_number": "Kontonummer:",
        "account_number_value": "7777-03-5969570",
        "account_holder": "Kontoinhaber:",
        "account_holder_value": "Seok*Woo",
        "copy_account_btn": "Kontonummer kopieren",
        "copied_message": "Kontonummer kopiert!",
        "mobile_download_note": "Diese Seite ist für mobile Geräte optimiert.",
        "no_downloads_available": "Keine Download-Dateien verfügbar."
    },
    // Russian translation
    "ru": {
        "nav_about": "О проекте",
        "nav_video": "Видео-руководство",
        "nav_features": "Возможности",
        "nav_model_download": "Загрузка моделей",
        "nav_install": "Установка и Загрузка",
        "nav_donate": "Пожертвовать",
        "nav_contact": "Контакты",
        "hero_title": "YoLuWa!",
        "hero_slogan_part1": "Мощный анализ веб-камеры в реальном времени на базе YOLO,",
        "hero_slogan_part2": "Простое удаленное управление, безопасная конфиденциальность!",
        "hero_watch_video": "Смотреть видео-руководство",
        "hero_get_started": "Начать сейчас",
        "total_downloads": "Всего загрузок:",
        "loading": "Загрузка...",
        "about_title": "Что такое YoLuWa!?",
        "about_p1": "YoLuWa!, сокращение от **Your YOLO Live Web Analyzer**, - это инновационное Python-приложение, которое использует камеру вашего телефона для обнаружения объектов на основе YOLO в реальном времени. Оно позволяет удаленно управлять и отслеживать результаты через веб-интерфейс, разработанный с учетом удобства пользователя, мощных функций и надежной безопасности в качестве основных приоритетов.",
        "about_p2": "Благодаря мощным веб-функциям удаленного управления вы можете проверять потоки с камеры, менять модели YOLO, настраивать пороги достоверности и выполнять различные задачи без прямого доступа к вашему ПК. Кроме того, оно интегрируется с веб-хуками Discord для легкого обмена результатами анализа, и все настройки надежно защищены мастер-паролем.",
        "about_p3": "YoLuWa! оптимизирует потребление ресурсов при запуске приложения с помощью подхода 'ленивой загрузки' для моделей YOLO, загружая их только при необходимости для анализа, обеспечивая комфортный пользовательский опыт. YoLuWa! станет вашим умным партнером, делающим проекты компьютерного зрения на базе ИИ проще и мощнее.",
        "video_title": "Видео-руководство YoLuWa!",
        "video_desc": "Посмотрите видео, чтобы легко понять основные функции и способы использования YoLuWa!",
        "features_title": "Ключевые особенности",
        "feature_realtime_yolo_h": "Анализ YOLO в реальном времени",
        "feature_realtime_yolo_p": "Использует камеру вашего телефона как веб-камеру для выполнения обнаружения объектов YOLO в реальном времени и потоковой передачи результатов анализа.",
        "feature_intuitive_web_h": "Интуитивное веб-управление",
        "feature_intuitive_web_p": "Удаленно управляйте всеми функциями через веб-браузер вашего телефона без прямого доступа к ПК.",
        "feature_strong_security_h": "Надежная безопасность",
        "feature_strong_security_p": "Настройка мастер-пароля и шифрование URL-адреса веб-хука обеспечивают полную защиту вашего приложения и данных.",
        "feature_dynamic_model_h": "Динамическое управление моделями",
        "feature_dynamic_model_p": "Изменяйте модели YOLO и настраивайте пороги достоверности в реальном времени для оптимальной производительности в различных средах.",
        "feature_discord_integration_h": "Интеграция с Discord",
        "feature_discord_integration_p": "Мгновенно отправляйте изображения с результатами анализа вместе с пользовательскими сообщениями в ваш канал Discord.",
        "feature_performance_h": "Оптимизация производительности",
        "feature_performance_p": "Минимизирует потребление ресурсов при запуске приложения с помощью ленивой загрузки, обеспечивая плавный пользовательский интерфейс.",

        "model_download_title": "Загрузка моделей YOLO и создание пользовательских моделей",
        "yolo_model_download_desc": "Загружайте различные предварительно обученные модели YOLO, совместимые с YoLuWa!, и создавайте/используйте свои собственные модели через Roboflow.",
        "download_pretrained_models_h": "Загрузить предварительно обученные модели YOLO",
        "download_pretrained_models_p": "Загрузите модели YOLOv8 различных размеров и производительности, официально предоставленные Ultralytics, и используйте их прямо в приложении YoLuWa!.",
        "ultralytics_website_btn": "Перейти на сайт Ultralytics",
        "roboflow_intro_h": "Создайте свою собственную модель YOLO с помощью Roboflow",
        "roboflow_intro_p1": "Roboflow - это мощная платформа, которая поддерживает каждый этап разработки модели YOLO, от управления наборами данных, аннотирования, предварительной обработки, аугментации до обучения модели. Опробуйте предварительно обученные модели и создайте новые, используя свои собственные данные!",
        "roboflow_explore_btn": "Исследуйте модели на Roboflow",
        "roboflow_create_btn": "Создавайте модели на Roboflow",

        "install_title": "Установка и Загрузка",
        "install_windows_btn": "Windows",
        "install_mac_btn": "macOS",
        "install_linux_btn": "Linux",
        "install_source_btn": "Исходный код",
        "install_windows_h": "Установить YoLuWa! для Windows (Рекомендуется)",
        "install_windows_p": "Пользователи Windows могут легко установить и запустить YoLuWa!, выполнив следующие шаги.",
        "install_step1_h": "Скачать последнюю версию:",
        "install_step1_p": "Нажмите кнопку ниже, чтобы загрузить исполняемый файл YoLuWa! для Windows.",
        "install_step2_h": "Подготовьте файл модели YOLO:",
        "install_step2_p": "Подготовьте файл модели YOLO в формате .pt (например, yolov8n.pt).",
        "install_step3_h": "Установите приложение IP WebCam:",
        "install_step3_p": "Установите IP WebCam (Android) или аналогичное приложение для iOS на свой телефон и запустите его, чтобы получить URL потоковой передачи.",
        "install_step4_h": "Запустите YoLuWa!:",
        "install_step4_p": "Запустите загруженный .exe-файл и следуйте инструкциям для настройки мастер-пароля.",
        "install_step5_h": "Введите настройки:",
        "install_step5_p": "В разделе настроек графического интерфейса приложения введите URL-адрес веб-камеры телефона, URL-адрес веб-хука Discord, желаемый порт веб-потока и т.д., а затем нажмите 'Применить настройки и сохранить'.",
        "install_step6_h": "Запустите камеру:",
        "install_step6_p": "Нажмите кнопку 'Запустить/Остановить YOLO-камеру', чтобы начать анализ.",
        "install_windows_download_btn": "Загрузить последнюю версию для Windows",
        "install_mac_h": "YoLuWa! для macOS (Скоро)",
        "install_mac_p1": "Версия для macOS находится в разработке. Скоро будет предоставлен удобный установщик.",
        "install_mac_p2": "Будет предоставлен пакет приложений PyInstaller",
        "install_mac_p3": "Оптимизированная производительность и пользовательский опыт",
        "install_mac_p4": "Тем временем вы можете использовать исходный код для ручной установки.",
        "install_linux_h": "YoLuWa! для Linux (Скоро)",
        "install_linux_p1": "Версия для Linux находится в разработке. Мы предоставим стабильные установочные пакеты для различных дистрибутивов.",
        "install_linux_p2": "Будут предоставлены пакеты AppImage или Snap/Flatpak",
        "install_linux_p3": "Сотрудничество с сообществом для более широкой поддержки",
        "install_source_h": "Установка и запуск из исходного кода",
        "install_source_p": "Это руководство для разработчиков и опытных пользователей по установке из исходного кода.",
        "install_python_install_h": "Установить Python:",
        "install_python_install_p": "Убедитесь, что установлен Python 3.8 или выше.",
        "install_git_clone_h": "Git Clone или загрузка:",
        "install_git_clone_p": "Загрузите исходный код из репозитория YoLuWa! GitHub.",
        "install_venv_h": "Настройка виртуальной среды (Рекомендуется):",
        "install_lib_install_h": "Установить необходимые библиотеки:",
        "install_yolo_model_install_h": "Подготовьте файл модели YOLO:",
        "install_yolo_model_install_p": "Поместите файл модели YOLO в формате .pt и index.html из папки templates в тот же каталог, что и yoluwaPC.py.",
        "install_yoluwa_exec_h": "Запустите YoLuWa!:",
        "install_master_pw_h": "Первоначальная настройка:",
        "install_master_pw_p": "Настройте мастер-пароль при первом запуске программы.",
        "install_settings_h": "Введите настройки:",
        "install_settings_p": "Введите необходимые настройки (URL веб-камеры, веб-хук Discord и т.д.) в разделе настроек графического интерфейса приложения и сохраните их.",
        "github_repo_link": "Перейти в репозиторий GitHub",
        "source_code_download": "Скачать исходный код",
        "previous_versions_title": "Скачать предыдущие версии",
        "previous_versions_desc": "Если требуются определенные среды или функции, вы можете скачать предыдущие версии YoLuWa!.",
        "previous_versions_loading": "Загрузка предыдущих версий...",
        "release_tag_name": "Выпуск",
        "release_download_count": "Загрузки:",
        "no_previous_releases": "Предыдущих версий нет.",
        "manual_download_title": "Прямые ссылки для скачивания (для ручного обновления)",
        "manual_download_desc": "Загрузите последнюю версию для каждой платформы. Ссылки ниже требуют <strong>ручного обновления</strong>.",
        "manual_windows_download": "Windows (.exe)",
        "manual_mac_download": "macOS (.zip)",
        "manual_linux_download": "Linux (.AppImage)",
        "manual_source_download": "Исходный код (.zip)",
        "manual_update_note": "Мы рекомендуем автоматически загружаемый раздел 'Скачать предыдущие версии', так как эти ссылки нуждаются в ручном обновлении.",
        "cta_title": "Попробуйте YoLuWa! прямо сейчас!",
        "cta_desc": "Добавьте новый уровень удобства и безопасности в свои проекты компьютерного зрения с помощью ИИ.",
        "cta_download_btn": "Скачать YoLuWa!",
        "footer_rights": "2025 YoLuWa!. Все права защищены.",
        "footer_website": "Официальный сайт:",
        "footer_developer": "Разработчик:",
        "donate_title": "Пожертвовать YoLuWa!",
        "donate_p1": "Проект YoLuWa! развивается благодаря вашему интересу и поддержке. Ваши ценные вклады — большая поддержка для команды разработчиков. Мы искренне благодарим всех, кто жертвует!",
        "bank_name": "Название банка:",
        "bank_name_value": "KakaoBank",
        "account_number": "Номер счета:",
        "account_number_value": "7777-03-5969570",
        "account_holder": "Владелец счета:",
        "account_holder_value": "석*우 (Seok*Woo)",
        "copy_account_btn": "Копировать номер счета",
        "copied_message": "Номер счета скопирован!",
        "mobile_download_note": "Эта страница оптимизирована для мобильных устройств.",
        "no_downloads_available": "Нет доступных файлов для скачивания."
    },
    // Japanese translation
    "ja_JP": {
        "nav_about": "概要",
        "nav_video": "ビデオガイド",
        "nav_features": "機能",
        "nav_model_download": "モデルダウンロード",
        "nav_install": "インストールとダウンロード",
        "nav_donate": "寄付",
        "nav_contact": "お問い合わせ",
        "hero_title": "YoLuWa!",
        "hero_slogan_part1": "強力なYOLOベースのリアルタイムウェブカメラ分析、",
        "hero_slogan_part2": "簡単なリモート制御、安全なプライバシー保護！",
        "hero_watch_video": "ビデオガイドを見る",
        "hero_get_started": "今すぐ始める",
        "total_downloads": "総ダウンロード数：",
        "loading": "読み込み中...",
        "about_title": "YoLuWa!とは？",
        "about_p1": "YoLuWa!は、**Your YOLO Live Web Analyzer**の略で、スマートフォンのカメラをYOLOベースのリアルタイム物体検出に活用し、ウェブインターフェースを通じてリモートで結果を制御・監視できる革新的なPythonアプリです。ユーザーの利便性、強力な機能、堅牢なセキュリティを最優先に設計されています。",
        "about_p2": "強力なウェブベースのリモート制御機能により、PCに直接アクセスすることなく、カメラのストリームを確認したり、YOLOモデルを変更したり、信頼度閾値を調整したり、さまざまなタスクを実行できます。さらに、Discordウェブフックと統合して分析結果画像を簡単に共有でき、すべての設定はマスターパスワードで安全に保護されます。",
        "about_p3": "YoLuWa!は、YOLOモデルの「遅延ロード」アプローチにより、アプリ起動時のリソース消費を最小限に抑え、分析が必要なときにのみモデルをロードすることで、快適なユーザーエクスペリエンスを提供します。YoLuWa!は、AIベースのビジョンプロジェクトをより簡単かつ強力にするあなたのスマートパートナーとなるでしょう。",
        "video_title": "YoLuWa! ビデオガイド",
        "video_desc": "YoLuWa!の主要機能と使い方をビデオで簡単に確認してください！",
        "features_title": "主な機能",
        "feature_realtime_yolo_h": "リアルタイムYOLO分析",
        "feature_realtime_yolo_p": "スマートフォンのカメラをウェブカメラとして活用し、リアルタイムYOLO物体検出を実行し、分析結果をストリーミングします。",
        "feature_intuitive_web_h": "直感的なウェブ制御",
        "feature_intuitive_web_p": "PCに直接アクセスすることなく、スマートフォンのウェブブラウザを介してすべての機能をリモートで制御します。",
        "feature_strong_security_h": "強力なセキュリティ",
        "feature_strong_security_p": "マスターパスワードの設定とウェブフックURLの暗号化により、アプリとデータのセキュリティを徹底的に保護します。",
        "feature_dynamic_model_h": "動的なモデル管理",
        "feature_dynamic_model_p": "YOLOモデルをリアルタイムで変更し、信頼度閾値を調整して、さまざまな環境で最適なパフォーマンスを実現します。",
        "feature_discord_integration_h": "Discord連携",
        "feature_discord_integration_p": "分析結果の画像をカスタムメッセージとともにDiscordチャンネルに即座に送信します。",
        "feature_performance_h": "パフォーマンス最適化",
        "feature_performance_p": "遅延ロードによりアプリ起動時のリソース消費を最小限に抑え、スムーズなユーザーエクスペリエンスを提供します。",

        "model_download_title": "YOLOモデルのダウンロードとカスタムモデル作成",
        "yolo_model_download_desc": "YoLuWa!で利用可能なさまざまな事前学習済みYOLOモデルをダウンロードし、Roboflowを介して独自のカスタムモデルを体験・作成できます。",
        "download_pretrained_models_h": "事前学習済みYOLOモデルをダウンロード",
        "download_pretrained_models_p": "Ultralyticsが公式に提供する様々なサイズと性能のYOLOv8モデルをダウンロードし、YoLuWa!アプリで直接使用してください。",
        "ultralytics_website_btn": "Ultralyticsウェブサイトへ",
        "roboflow_intro_h": "Roboflowで独自のYOLOモデルを作成",
        "roboflow_intro_p1": "Roboflowは、データセット管理、アノテーション、前処理、拡張、モデルトレーニングまで、YOLOモデル開発のすべてのステップをサポートする強力なプラットフォームです。事前学習済みモデルを体験し、独自のデータを使用して新しいモデルを作成してください！",
        "roboflow_explore_btn": "Roboflowでモデルを探索",
        "roboflow_create_btn": "Roboflowでモデルを作成",

        "install_title": "インストールとダウンロード",
        "install_windows_btn": "Windows",
        "install_mac_btn": "macOS",
        "install_linux_btn": "Linux",
        "install_source_btn": "ソースコード",
        "install_windows_h": "Windows版YoLuWa!のインストール（推奨）",
        "install_windows_p": "Windowsユーザーは、以下の手順でYoLuWa!を簡単にインストールして実行できます。",
        "install_step1_h": "最新バージョンをダウンロード：",
        "install_step1_p": "以下のボタンをクリックして、YoLuWa!のWindows実行ファイルをダウンロードしてください。",
        "install_step2_h": "YOLOモデルファイルを準備：",
        "install_step2_p": ".pt形式のYOLOモデルファイルを用意してください（例：yolov8n.pt）。",
        "install_step3_h": "IP WebCamアプリをインストール：",
        "install_step3_p": "スマートフォンにIP WebCam（Android）または類似のiOSアプリをインストールして起動し、ストリーミングURLを確認してください。",
        "install_step4_h": "YoLuWa!を実行：",
        "install_step4_p": "ダウンロードした.exeファイルを実行し、指示に従ってマスターパスワードを設定してください。",
        "install_step5_h": "設定を入力：",
        "install_step5_p": "アプリのGUI設定セクションで、スマートフォンのウェブカメラURL、DiscordウェブフックURL、希望するウェブストリーミングポートなどを入力し、「設定適用と保存」ボタンをクリックします。",
        "install_step6_h": "カメラを起動：",
        "install_step6_p": "「YOLOカメラの開始/停止」ボタンをクリックして分析を開始します。",
        "install_windows_download_btn": "Windows用最新バージョンをダウンロード",
        "install_mac_h": "macOS版YoLuWa!（近日公開）",
        "install_mac_p1": "macOSバージョンは現在準備中です。近いうちに便利なインストーラを提供する予定です。",
        "install_mac_p2": "PyInstallerアプリバンドルが提供される予定です",
        "install_mac_p3": "最適化されたパフォーマンスとユーザーエクスペリエンス",
        "install_mac_p4": "それまでは、ソースコードを使用して手動でインストールすることも可能です。",
        "install_linux_h": "Linux版YoLuWa!（近日公開）",
        "install_linux_p1": "Linuxバージョンは現在準備中です。様々なディストリビューション向けに安定したインストールパッケージを提供する予定です。",
        "install_linux_p2": "AppImageまたはSnap/Flatpakパッケージが提供される予定です",
        "install_linux_p3": "より広範なサポートのためのコミュニティとの連携",
        "install_source_h": "ソースコードからのインストールと実行",
        "install_source_p": "このガイドは、開発者および上級ユーザー向けのソースコードインストール手順です。",
        "install_python_install_h": "Pythonをインストール：",
        "install_python_install_p": "Python 3.8以降がインストールされていることを確認します。",
        "install_git_clone_h": "Git Cloneまたはダウンロード：",
        "install_git_clone_p": "YoLuWa! GitHubリポジトリからソースコードをダウンロードします。",
        "install_venv_h": "仮想環境のセットアップ（推奨）：",
        "install_lib_install_h": "必要なライブラリをインストール：",
        "install_yolo_model_install_h": "YOLOモデルファイルを準備：",
        "install_yolo_model_install_p": ".pt形式のYOLOモデルファイルと、templatesフォルダ内のindex.htmlをyoluwaPC.pyと同じディレクトリに置きます。",
        "install_yoluwa_exec_h": "YoLuWa!を実行：",
        "install_master_pw_h": "初回設定：",
        "install_master_pw_p": "プログラムの初回実行時にマスターパスワードを設定します。",
        "install_settings_h": "設定を入力：",
        "install_settings_p": "アプリのGUI設定セクションで、必要な設定（ウェブカメラURL、Discordウェブフックなど）を入力して保存します。",
        "github_repo_link": "GitHubリポジトリへ移動",
        "source_code_download": "ソースコードをダウンロード",
        "previous_versions_title": "以前のバージョンをダウンロード",
        "previous_versions_desc": "特定の環境や機能が必要な場合、以前のバージョンのYoLuWa!をダウンロードできます。",
        "previous_versions_loading": "以前のバージョンを読み込み中...",
        "release_tag_name": "リリース",
        "release_download_count": "ダウンロード数：",
        "no_previous_releases": "以前のバージョンは利用できません。",
        "manual_download_title": "直接ダウンロードリンク（手動更新が必要な場合）",
        "manual_download_desc": "各プラットフォームの最新バージョンをダウンロードしてください。以下のリンクは<strong>手動で更新</strong>する必要があります。",
        "manual_windows_download": "Windows (.exe)",
        "manual_mac_download": "macOS (.zip)",
        "manual_linux_download": "Linux (.AppImage)",
        "manual_source_download": "ソースコード (.zip)",
        "manual_update_note": "自動ロードされる「以前のバージョンをダウンロード」セクションを推奨します。これらのリンクは手動で更新する必要があります。",
        "cta_title": "今すぐYoLuWa!を体験しよう！",
        "cta_desc": "ビジョンAIプロジェクトに新たなレベルの利便性とセキュリティを追加します。",
        "cta_download_btn": "YoLuWa!をダウンロード",
        "footer_rights": "2025 YoLuWa!. 無断複写・転載を禁じます。",
        "footer_website": "公式サイト：",
        "footer_developer": "開発者：",
        "donate_title": "YoLuWa!への寄付",
        "donate_p1": "YoLuWa!プロジェクトは皆様のご関心とご支援によって発展します。貴重なご寄付は開発チームにとって大きな励みとなります。ご寄付くださったすべての方に心より感謝申し上げます！",
        "bank_name": "銀行名：",
        "bank_name_value": "カカオバンク",
        "account_number": "口座番号：",
        "account_number_value": "7777-03-5969570",
        "account_holder": "預金者名：",
        "account_holder_value": "石*優",
        "copy_account_btn": "口座番号をコピー",
        "copied_message": "口座番号がコピーされました！",
        "mobile_download_note": "このページはモバイル端末向けに最適化されています。",
        "no_downloads_available": "ダウンロード可能なファイルはありません。"
    },
    // Chinese (Simplified) translation
    "zh_CN": {
        "nav_about": "关于",
        "nav_video": "视频教程",
        "nav_features": "功能",
        "nav_model_download": "模型下载",
        "nav_install": "安装与下载",
        "nav_donate": "捐赠",
        "nav_contact": "联系我们",
        "hero_title": "YoLuWa!",
        "hero_slogan_part1": "强大的基于YOLO的实时网络摄像头分析，",
        "hero_slogan_part2": "简便的远程控制，安全的隐私保护！",
        "hero_watch_video": "观看视频教程",
        "hero_get_started": "立即开始",
        "total_downloads": "总下载量：",
        "loading": "加载中...",
        "about_title": "什么是 YoLuWa!?",
        "about_p1": "YoLuWa!, 全称 **Your YOLO Live Web Analyzer**, 是一款创新的 Python 应用程序，它利用您手机的摄像头进行实时基于 YOLO 的对象检测。它通过网页界面实现远程控制和监控结果，旨在以用户便利性、强大功能和坚固安全性为首要任务。",
        "about_p2": "凭借强大的基于网络的远程控制功能，您可以无需直接访问您的 PC，即可查看摄像头流、更改 YOLO 模型、调整置信度阈值并执行各种任务。此外，它还集成了 Discord Webhook，可轻松共享分析结果图像，所有设置均通过主密码安全保护。",
        "about_p3": "YoLuWa! 通过 YOLO 模型的“惰性加载”方法优化了应用程序启动时的资源消耗，仅在需要分析时加载模型，从而提供舒适的用户体验。YoLuWa! 将成为您的智能伙伴，使基于 AI 的视觉项目更简单、更强大。",
        "video_title": "YoLuWa! 视频教程",
        "video_desc": "观看视频，轻松了解 YoLuWa! 的主要功能和使用方法！",
        "features_title": "主要功能",
        "feature_realtime_yolo_h": "实时 YOLO 分析",
        "feature_realtime_yolo_p": "利用手机摄像头作为网络摄像头，执行实时 YOLO 对象检测并流式传输分析结果。",
        "feature_intuitive_web_h": "直观的网页控制",
        "feature_intuitive_web_p": "无需直接访问 PC，通过手机的网页浏览器远程控制所有功能。",
        "feature_strong_security_h": "强大的安全性",
        "feature_strong_security_p": "主密码设置和 Webhook URL 加密，确保应用程序和数据的全面保护。",
        "feature_dynamic_model_h": "动态模型管理",
        "feature_dynamic_model_p": "实时更改 YOLO 模型并调整置信度阈值，以优化在各种环境下的性能。",
        "feature_discord_integration_h": "Discord 集成",
        "feature_discord_integration_p": "立即将分析结果图像和自定义消息发送到您的 Discord 频道。",
        "feature_performance_h": "性能优化",
        "feature_performance_p": "通过惰性加载最大限度地减少应用程序启动时的资源消耗，提供流畅的用户体验。",

        "model_download_title": "YOLO 模型下载与自定义模型创建",
        "yolo_model_download_desc": "下载 YoLuWa! 可用的各种预训练 YOLO 模型，并通过 Roboflow 体验和创建您自己的自定义模型。",
        "download_pretrained_models_h": "下载预训练 YOLO 模型",
        "download_pretrained_models_p": "下载 Ultralytics 官方提供的各种大小和性能的 YOLOv8 模型，并直接在 YoLuWa! 应用程序中使用。",
        "ultralytics_website_btn": "访问 Ultralytics 网站",
        "roboflow_intro_h": "使用 Roboflow 创建您自己的 YOLO 模型",
        "roboflow_intro_p1": "Roboflow 是一个强大的平台，支持 YOLO 模型开发的每一步，从数据集管理、标注、预处理、增强到模型训练。体验预训练模型，并使用您自己的数据创建新模型！",
        "roboflow_explore_btn": "在 Roboflow 探索模型",
        "roboflow_create_btn": "在 Roboflow 创建模型",

        "install_title": "安装与下载",
        "install_windows_btn": "Windows",
        "install_mac_btn": "macOS",
        "install_linux_btn": "Linux",
        "install_source_btn": "源代码",
        "install_windows_h": "安装 Windows 版 YoLuWa! (推荐)",
        "install_windows_p": "Windows 用户可以按照以下步骤轻松安装和运行 YoLuWa!。",
        "install_step1_h": "下载最新版本：",
        "install_step1_p": "点击下方按钮下载 Windows 版 YoLuWa! 可执行文件。",
        "install_step2_h": "准备 YOLO 模型文件：",
        "install_step2_p": "准备好 .pt 格式的 YOLO 模型文件（例如 yolov8n.pt）。",
        "install_step3_h": "安装 IP 网络摄像头应用：",
        "install_step3_p": "在您的手机上安装 IP 网络摄像头（Android）或类似的 iOS 应用，并启动它以获取流媒体 URL。",
        "install_step4_h": "运行 YoLuWa!：",
        "install_step4_p": "运行下载的 .exe 文件，并按照说明设置主密码。",
        "install_step5_h": "输入设置：",
        "install_step5_p": "在应用程序的 GUI 设置部分输入手机网络摄像头 URL、Discord Webhook URL、所需的网络流媒体端口等，然后点击“应用设置并保存”。",
        "install_step6_h": "启动摄像头：",
        "install_step6_p": "点击“启动/停止 YOLO 摄像头”按钮开始分析。",
        "install_windows_download_btn": "下载 Windows 最新版本",
        "install_mac_h": "macOS 版 YoLuWa! (即将推出)",
        "install_mac_p1": "macOS 版本正在准备中。我们很快将提供一个便捷的安装程序。",
        "install_mac_p2": "将提供 PyInstaller 应用捆绑包",
        "install_mac_p3": "优化性能和用户体验",
        "install_mac_p4": "同时，您可以使用源代码进行手动安装。",
        "install_linux_h": "Linux 版 YoLuWa! (即将推出)",
        "install_linux_p1": "Linux 版本正在准备中。我们将为各种发行版提供稳定的安装包。",
        "install_linux_p2": "将提供 AppImage 或 Snap/Flatpak 包",
        "install_linux_p3": "与社区合作，提供更广泛的支持",
        "install_source_h": "从源代码安装和运行",
        "install_source_p": "本指南适用于开发者和高级用户进行源代码安装。",
        "install_python_install_h": "安装 Python：",
        "install_python_install_p": "确保安装了 Python 3.8 或更高版本。",
        "install_git_clone_h": "Git 克隆或下载：",
        "install_git_clone_p": "从 YoLuWa! GitHub 仓库下载源代码。",
        "install_venv_h": "设置虚拟环境（推荐）：",
        "install_lib_install_h": "安装所需库：",
        "install_yolo_model_install_h": "准备 YOLO 模型文件：",
        "install_yolo_model_install_p": "将您的 .pt 格式 YOLO 模型文件和 templates 文件夹中的 index.html 放在与 yoluwaPC.py 相同的目录中。",
        "install_yoluwa_exec_h": "运行 YoLuWa!：",
        "install_master_pw_h": "初始设置：",
        "install_master_pw_p": "首次运行程序时设置主密码。",
        "install_settings_h": "输入设置：",
        "install_settings_p": "在应用程序的 GUI 设置部分输入必要的设置（网络摄像头 URL、Discord Webhook 等）并保存。",
        "github_repo_link": "前往 GitHub 仓库",
        "source_code_download": "下载源代码",
        "previous_versions_title": "下载旧版本",
        "previous_versions_desc": "如果需要特定环境或功能，可以下载 YoLuWa! 的旧版本。",
        "previous_versions_loading": "正在加载旧版本...",
        "release_tag_name": "发布",
        "release_download_count": "下载量：",
        "no_previous_releases": "没有旧版本可用。",
        "manual_download_title": "直接下载链接（用于手动更新）",
        "manual_download_desc": "下载适用于每个平台的最新版本。以下链接需要<strong>手动更新</strong>。",
        "manual_windows_download": "Windows (.exe)",
        "manual_mac_download": "macOS (.zip)",
        "manual_linux_download": "Linux (.AppImage)",
        "manual_source_download": "源代码 (.zip)",
        "manual_update_note": "我们推荐自动加载的“下载旧版本”部分，因为这些链接需要手动更新。",
        "cta_title": "立即体验 YoLuWa!！",
        "cta_desc": "为您的视觉 AI 项目带来新的便利性和安全性。",
        "cta_download_btn": "下载 YoLuWa!",
        "footer_rights": "2025 YoLuWa!. 版权所有。",
        "footer_website": "官方网站：",
        "footer_developer": "开发者：",
        "donate_title": "支持 YoLuWa!",
        "donate_p1": "YoLuWa! 项目在您的关注和支持下不断发展。您宝贵的贡献是对开发团队的巨大鼓励。我们衷心感谢所有捐赠者！",
        "bank_name": "银行名称：",
        "bank_name_value": "KakaoBank",
        "account_number": "账号：",
        "account_number_value": "7777-03-5969570",
        "account_holder": "户主：",
        "account_holder_value": "石*宇",
        "copy_account_btn": "复制账号",
        "copied_message": "账号已复制！",
        "mobile_download_note": "此页面已针对移动设备优化。",
        "no_downloads_available": "没有可用的下载文件。",
        "copied_message_error": "계좌번호 복사에 실패했습니다!"
    }
};

// ... (Rest of the WebSocket and language related JS) ...

// JavaScript에서 사용할 유틸리티 함수 (translations 객체에 포함)
function getTranslation(key, lang) {
    return translations[lang] && translations[lang][key] ? translations[lang][key] : (translations["ko_KR"] && translations["ko_KR"][key] ? translations["ko_KR"][key] : key);
}

// 이 아래는 이전과 동일한 JavaScript 코드이므로 생략했습니다.
// 전체 코드는 이전에 드렸던 `index.html` 완성본과 `resources.js`의 나머지 부분에서 확인하실 수 있습니다.
// ...

// WebSocket connection for real-time language updates
let ws;
let currentLanguage = localStorage.getItem('user_language') || "ko_KR"; // 로컬 저장소 또는 기본값

function connectWebSocket() {
    const websocketPort = document.body.dataset.websocketPort || "8001"; // HTML data-websocket-port 속성에서 포트 가져오기, 기본값 8001
    const ws_url = `ws://${location.hostname}:${websocketPort}`; 
    ws = new WebSocket(ws_url);

    ws.onopen = () => {
        console.log("WebSocket connected.");
        // 연결 시 PC 앱으로 현재 웹사이트 언어 설정 전송
        if (currentLanguage) {
            ws.send(JSON.stringify({ type: "website_language_update", lang: currentLanguage }));
        }
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "pc_language_update") {
            console.log("Language updated from PC:", message.lang);
            setLanguage(message.lang, true); // true for from_pc
        }
    };

    ws.onclose = () => {
        console.log("WebSocket disconnected. Retrying in 5 seconds...");
        setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };
}

function setLanguage(lang, from_pc = false) {
    // 지원하지 않는 언어 코드인 경우 기본값인 ko_KR로 폴백
    if (!translations[lang]) lang = "ko_KR"; 

    // 현재 언어가 이미 적용된 언어와 같고, PC로부터의 업데이트가 아니며,
    // 웹사이트의 언어 선택 드롭다운이 이미 해당 언어를 표시하고 있다면 불필요한 업데이트 방지
    const langSelect = document.getElementById('langSelect');
    let isSelectAlreadySet = langSelect && langSelect.value === lang;

    if (currentLanguage === lang && !from_pc && isSelectAlreadySet) return; 

    currentLanguage = lang;
    localStorage.setItem('user_language', lang); // 사용자 선택 언어를 로컬 스토리지에 저장

    // UI 텍스트 업데이트 (data-translate-key 속성을 가진 모든 요소)
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (key) {
            // 특정 태그(예: <p> 태그 내의 Strong)는 innerHTML로 처리하여 HTML 구조를 유지
            // 주의: 이 부분을 HTML 구조에 맞게 세밀하게 조정해야 합니다.
            // 번역 데이터에 HTML 태그가 포함될 수 있다면 innerHTML을 사용하고, 그렇지 않다면 textContent를 사용하세요.
            const translatedText = getTranslation(key, currentLanguage);
            if (element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'A' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'STRONG' || element.tagName === 'EM' || element.tagName === 'SMALL' || element.tagName === 'LI') {
                 // 여기서는 innerHTML을 사용하여 Bold 태그 등을 유지하도록 합니다.
                element.innerHTML = translatedText;
            } else {
                element.textContent = translatedText;
            }
        }
    });

    // Spacing for feature-card icons (스타일링 관련)
    document.querySelectorAll('.feature-card .icon, .model-card .icon').forEach(icon => {
        if (!icon.classList.contains('me-3')) icon.classList.add('mb-3');
    });

    // Update special cases (e.g., navigation links or specific elements without data-translate-key)
    // 네비게이션 링크는 data-translate-key 속성만 있으면 자동으로 업데이트됩니다.
    // 탭 버튼 등은 직접 접근해서 업데이트가 필요합니다.
    const installTabs = document.getElementById('installTabs');
    if (installTabs) {
        // 탭 버튼 텍스트 업데이트 (아이콘 뒤의 텍스트를 찾아 업데이트)
        document.getElementById('windows-tab').querySelector('i').nextSibling.textContent = getTranslation('install_windows_btn', currentLanguage);
        document.getElementById('mac-tab').querySelector('i').nextSibling.textContent = getTranslation('install_mac_btn', currentLanguage);
        document.getElementById('linux-tab').querySelector('i').nextSibling.textContent = getTranslation('install_linux_btn', currentLanguage);
        document.getElementById('source-tab').querySelector('i').nextSibling.textContent = getTranslation('install_source_btn', currentLanguage);
    }
    
    // Model Download Section specific buttons
    if (document.getElementById('ultralyticsWebsiteBtn')) document.getElementById('ultralyticsWebsiteBtn').textContent = getTranslation('ultralytics_website_btn', currentLanguage);
    if (document.getElementById('roboflowExploreBtn')) document.getElementById('roboflowExploreBtn').textContent = getTranslation('roboflow_explore_btn', currentLanguage);
    if (document.getElementById('roboflowCreateBtn')) document.getElementById('roboflowCreateBtn').textContent = getTranslation('roboflow_create_btn', currentLanguage);
    
    // Donate Section
    if (document.getElementById('copyAccountBtn')) document.getElementById('copyAccountBtn').textContent = getTranslation('copy_account_btn', currentLanguage);

    // Update the language selector to reflect the change
    if (langSelect && langSelect.value !== lang) {
        for (let i = 0; i < langSelect.options.length; i++) {
            if (langSelect.options[i].value === lang) {
                langSelect.selectedIndex = i;
                break;
            }
        }
    }

    // GitHub 다운로드 섹션의 번역된 텍스트를 업데이트하기 위해 다시 호출
    // 이 함수 내부에서 `currentLanguage`를 사용하여 텍스트를 가져오기 때문에 업데이트 필요.
    updateDownloadSection();


    // Send language update to PC only if not initiated from PC
    // PC로부터의 업데이트가 아니고, 웹소켓이 연결되어 있다면 PC로 변경사항 알림
    if (!from_pc && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "website_language_update", lang: lang }));
    }
}

// =========================================================
// 페이지 로드 시 초기화 및 이벤트 리스너 설정
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // 웹소켓 연결
    connectWebSocket();

    // 초기 언어 설정 (로컬 스토리지 또는 URL 파라미터, 없으면 기본값)
    const savedLang = localStorage.getItem('user_language');
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    let initialLang = "ko_KR"; // Default
    if (urlLang && translations[urlLang]) {
        initialLang = urlLang;
    } else if (savedLang && translations[savedLang]) {
        initialLang = savedLang;
    }
    setLanguage(initialLang); // 초기 언어 적용

    // 언어 선택 드롭다운 이벤트 리스너
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }

    // 계좌번호 복사 버튼 기능
    const copyButton = document.getElementById('copyAccountBtn');
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const accountNumber = document.getElementById('accountNumberValue').textContent.trim();
            try {
                await navigator.clipboard.writeText(accountNumber);
                const originalText = copyButton.textContent; // Original text for the button
                copyButton.textContent = getTranslation('copied_message', currentLanguage); // Temporarily change text
                setTimeout(() => { copyButton.textContent = originalText; }, 2000); // Revert after 2 seconds
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // 실패 시 알림 (이 키는 resources.js에 있음)
                alert(getTranslation('copied_message_error', currentLanguage)); 
            }
        });
    }
    // 마지막으로 GitHub 다운로드 섹션 업데이트
    updateDownloadSection();
});
