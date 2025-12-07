// yoluwa_website/resources.js
// 이 파일은 각 언어별 번역 데이터를 직접 포함하지 않고,
// 언어 데이터를 동적으로 로드하는 로직과 웹사이트 전반에 필요한 JavaScript 기능을 담당합니다.

let ws = null; // 'ws' 변수를 전역 스코프에서 한 번만 선언
let currentLanguage = localStorage.getItem('user_language') || "ko_KR"; // 로컬 저장소 또는 기본값

// 번역 데이터를 저장할 객체. 동적으로 로드됩니다.
let loadedTranslations = {}; 

/**
 * 특정 언어의 번역 파일을 동적으로 로드합니다.
 * @param {string} lang - 언어 코드 (예: "ko_KR", "en_US").
 * @returns {Promise<void>} - 번역 파일 로딩이 완료될 때 resolve되는 Promise.
 */
async function loadLanguageFile(lang) {
    if (loadedTranslations[lang]) { // 이미 로드된 언어팩이면 다시 로드할 필요 없음
        window.langData = loadedTranslations[lang];
        return;
    }

    try {
        const response = await fetch(`./lang/${lang}.js`);
        if (!response.ok) {
            throw new Error(`Failed to load language file: ${lang}.js (status: ${response.status})`);
        }
        const scriptContent = await response.text();
        
        // 스크립트 내용을 실행하여 window.langData에 할당
        // 이 방법은 보안상 주의가 필요하나, 내부 파일이므로 괜찮음
        const script = document.createElement('script');
        script.textContent = scriptContent;
        document.head.appendChild(script);
        document.head.removeChild(script); // 스크립트 실행 후 제거

        // langData는 lang/{lang}.js 파일에서 전역 window.langData에 할당됩니다.
        loadedTranslations[lang] = window.langData; 

        console.log(`Language file ${lang}.js loaded successfully.`);
    } catch (error) {
        console.error("Error loading language file:", error);
        // 로드 실패 시 한국어(기본값)로 폴백 로직 추가 가능
        if (lang !== "ko_KR") {
            console.warn(`Falling back to default language ko_KR.`);
            await loadLanguageFile("ko_KR");
        }
    }
}


/**
 * 번역 데이터를 가져오는 함수
 * @param {string} key - 번역 키.
 * @param {string} lang - 언어 코드 (사용하지 않지만 호환성을 위해 유지).
 * @returns {string} - 번역된 텍스트.
 */
function getTranslation(key) {
    // window.langData (현재 활성화된 언어팩)에서 번역을 찾습니다.
    // 현재 언어팩에 없으면 ko_KR (기본 언어)에서 찾고, 그것도 없으면 key 자체를 반환합니다.
    return (window.langData && window.langData[key]) ? window.langData[key] : 
           (loadedTranslations["ko_KR"] && loadedTranslations["ko_KR"][key] ? loadedTranslations["ko_KR"][key] : key);
}


/**
 * 웹사이트 UI 언어를 설정하고 업데이트하는 메인 함수
 * @param {string} newLang - 설정할 새 언어 코드.
 * @param {boolean} from_pc - PC 앱으로부터의 변경인지 여부.
 * @returns {Promise<void>}
 */
async function setLanguage(newLang, from_pc = false) {
    // 지원하지 않는 언어 코드인 경우 기본값인 ko_KR로 폴백
    if (!loadedTranslations[newLang] && !['ko_KR', 'en_US', 'de', 'ru', 'ja_JP', 'zh_CN'].includes(newLang)) {
        newLang = "ko_KR"; 
    }

    const langSelect = document.getElementById('langSelect');
    let isSelectAlreadySet = langSelect && langSelect.value === newLang;

    // 현재 언어가 이미 적용된 언어와 같고, PC로부터의 업데이트가 아니며,
    // 웹사이트의 언어 선택 드롭다운이 이미 해당 언어를 표시하고 있다면 불필요한 업데이트 방지
    if (currentLanguage === newLang && !from_pc && isSelectAlreadySet) return; 

    // 새로운 언어 파일 로드
    await loadLanguageFile(newLang); // 동기적으로 언어 파일 로드 대기

    currentLanguage = newLang;
    localStorage.setItem('user_language', newLang); // 사용자 선택 언어를 로컬 스토리지에 저장

    // UI 텍스트 업데이트 (data-translate-key 속성을 가진 모든 요소)
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (key) {
            const translatedText = getTranslation(key);
            // 특정 태그(예: <p> 태그 내의 Strong)는 innerHTML 사용, 그 외는 textContent
            if (element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'A' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'STRONG' || element.tagName === 'EM' || element.tagName === 'SMALL' || element.tagName === 'LI' || element.classList.contains('lead')) {
                element.innerHTML = translatedText;
            } else {
                element.textContent = translatedText;
            }
        }
    });

    // 특수 처리 요소 (네비게이션 링크, 탭 버튼 등)
    document.querySelector('a[href="#about"]').textContent = getTranslation('nav_about');
    document.querySelector('a[href="#video"]').textContent = getTranslation('nav_video');
    document.querySelector('a[href="#features"]').textContent = getTranslation('nav_features');
    document.querySelector('a[href="#model-download"]').textContent = getTranslation('nav_model_download');
    document.querySelector('a[href="#install"]').textContent = getTranslation('nav_install');
    document.querySelector('a[href="#donate"]').textContent = getTranslation('nav_donate');
    document.querySelector('a[href="#contact"]').textContent = getTranslation('nav_contact');

    // Install section tabs
    const windowsTab = document.getElementById('windows-tab');
    if (windowsTab) windowsTab.querySelector('span').textContent = getTranslation('install_windows_btn');
    const macTab = document.getElementById('mac-tab');
    if (macTab) macTab.querySelector('span').textContent = getTranslation('install_mac_btn');
    const linuxTab = document.getElementById('linux-tab');
    if (linuxTab) linuxTab.querySelector('span').textContent = getTranslation('install_linux_btn');
    const sourceTab = document.getElementById('source-tab');
    if (sourceTab) sourceTab.querySelector('span').textContent = getTranslation('install_source_btn');


    // Model Download Section specific buttons
    if (document.getElementById('ultralyticsWebsiteBtn')) document.getElementById('ultralyticsWebsiteBtn').textContent = getTranslation('ultralytics_website_btn');
    if (document.getElementById('roboflowExploreBtn')) document.getElementById('roboflowExploreBtn').textContent = getTranslation('roboflow_explore_btn');
    if (document.getElementById('roboflowCreateBtn')) document.getElementById('roboflowCreateBtn').textContent = getTranslation('roboflow_create_btn');
    
    // Donate Section
    if (document.getElementById('copyAccountBtn')) document.getElementById('copyAccountBtn').textContent = getTranslation('copy_account_btn');
    if (document.getElementById('bankNameValue')) document.getElementById('bankNameValue').textContent = getTranslation('bank_name_value');
    if (document.getElementById('accountHolderValue')) document.getElementById('accountHolderValue').textContent = getTranslation('account_holder_value');


    // 드롭다운 언어 선택기가 현재 언어에 맞춰지도록 설정
    if (langSelect && langSelect.value !== newLang) {
        for (let i = 0; i < langSelect.options.length; i++) {
            if (langSelect.options[i].value === newLang) {
                langSelect.selectedIndex = i;
                break;
            }
        }
    }

    // GitHub 다운로드 섹션의 텍스트도 번역된 텍스트를 사용하기 위해 다시 호출
    await updateDownloadSection(); // 비동기 함수이므로 await

    // PC로부터의 업데이트가 아니고, 웹소켓이 연결되어 있다면 PC로 변경사항 알림
    if (!from_pc && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "website_language_update", lang: newLang }));
    }
}


// =========================================================
// GitHub API를 통한 다운로드 정보 및 이전 버전 로딩 (동적 콘텐츠)
// =========================================================
// !!! 주인님: 이 부분에 GitHub 사용자 이름과 리포지토리 이름을 정확히 입력해주세요!
const GITHUB_REPO_API_URL = "https://api.github.com/repos/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME/releases";
// const GITHUB_TOKEN = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"; // 필요시 사용 (API 요청 제한 회피용)
let totalDownloadCount = 0; // 전역으로 선언하여 다른 함수에서도 사용 가능하도록

async function fetchGitHubReleases() {
    try {
        const headers = {};
        // if (GITHUB_TOKEN) { headers['Authorization'] = `token ${GITHUB_TOKEN}`; }
        const response = await fetch(GITHUB_REPO_API_URL, { headers: headers });
        if (!response.ok) {
            throw new Error(`GitHub API HTTP error! status: ${response.status}`);
        }
        const releases = await response.json();
        return releases;
    } catch (error) {
        console.error("Failed to fetch GitHub releases:", error);
        return [];
    }
}

async function updateDownloadSection() {
    const releases = await fetchGitHubReleases();
    totalDownloadCount = 0; // 초기화
    const previousVersionsList = document.getElementById('previous-versions-list');
    if (previousVersionsList) previousVersionsList.innerHTML = ''; // 기존 목록 비우기
    const latestWindowsDownloadBtn = document.getElementById('latestWindowsDownload');
    const noDownloadsAvailable = document.getElementById('noDownloadsAvailable');
    const previousVersionsLoading = document.getElementById('previousVersionsLoading');
    if (previousVersionsLoading) previousVersionsLoading.style.display = 'none'; // 로딩 메시지 숨기기
    
    if (releases.length === 0) {
        if (document.getElementById('totalDownloadCount')) document.getElementById('totalDownloadCount').innerText = "0";
        if (noDownloadsAvailable) noDownloadsAvailable.style.display = 'block';
        if (latestWindowsDownloadBtn) {
            latestWindowsDownloadBtn.href = "#"; // 링크 비활성화
            latestWindowsDownloadBtn.textContent = getTranslation('no_downloads_available');
            latestWindowsDownloadBtn.classList.add('disabled'); // 버튼 비활성화 시각화
        }
        // 수동 다운로드 링크도 비활성화 처리
        const manualWindowsBtn = document.getElementById('manualWindowsDownload');
        if(manualWindowsBtn) {
            manualWindowsBtn.href = "#";
            manualWindowsBtn.classList.add('disabled');
            manualWindowsBtn.textContent = getTranslation('no_downloads_available');
        }
        // 나머지 수동 다운로드 버튼도 필요에 따라 disabled 처리
        // 예: document.getElementById('manualMacDownload').classList.add('disabled');

        return;
    } else {
        if (noDownloadsAvailable) noDownloadsAvailable.style.display = 'none';
    }

    // 가장 최신 릴리스 정보 (Windows용 .exe)
    const latestRelease = releases[0];
    let latestWindowsExeLink = '#';
    if (latestRelease && latestRelease.assets) {
        const windowsExeAsset = latestRelease.assets.find(asset => asset.name.endsWith('.exe'));
        if (windowsExeAsset) {
            latestWindowsExeLink = windowsExeAsset.browser_download_url;
            if (latestWindowsDownloadBtn) {
                latestWindowsDownloadBtn.href = latestWindowsExeLink;
                latestWindowsDownloadBtn.textContent = `${getTranslation('install_windows_download_btn')} (${latestRelease.tag_name})`;
                latestWindowsDownloadBtn.classList.remove('disabled'); // 활성화
            }
            // 수동 다운로드 섹션의 Windows 링크 업데이트
            const manualWindowsBtn = document.getElementById('manualWindowsDownload');
            if (manualWindowsBtn) {
                manualWindowsBtn.href = latestWindowsExeLink;
                manualWindowsBtn.textContent = `${getTranslation('manual_windows_download')} (${latestRelease.tag_name})`;
                manualWindowsBtn.classList.remove('disabled');
            }
        }
    }


    releases.forEach(release => {
        let releaseDownloadCount = 0;
        const assetsHtml = [];

        release.assets.forEach(asset => {
            releaseDownloadCount += asset.download_count;
            let iconClass = 'fas fa-file';
            let btnClass = 'btn-outline-primary';
            if (asset.name.endsWith('.exe')) {
                iconClass = 'fab fa-windows';
                btnClass = 'btn-primary';
            } else if (asset.name.endsWith('.zip') || asset.name.endsWith('.dmg')) {
                iconClass = 'fas fa-archive';
                btnClass = 'btn-secondary';
            } else if (asset.name.endsWith('.AppImage')) {
                iconClass = 'fab fa-linux';
                btnClass = 'btn-success';
            } else if (asset.name.endsWith('.tar.gz')) { // 추가
                iconClass = 'fas fa-box-open';
                btnClass = 'btn-warning';
            } else if (asset.name.endsWith('.deb')) {
                iconClass = 'fab fa-debian';
                btnClass = 'btn-success';
            } else if (asset.name.endsWith('.msi')) { // 추가
                iconClass = 'fas fa-box';
                btnClass = 'btn-info';
            }

            assetsHtml.push(`
                <a href="${asset.browser_download_url}" class="btn btn-sm ${btnClass} me-2 mb-2" download>
                    <i class="${iconClass} me-1"></i>${asset.name} (${(asset.size / (1024 * 1024)).toFixed(1)} MB)
                </a>
            `);
        });

        totalDownloadCount += releaseDownloadCount;

        const releaseCard = `
            <div class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header">
                        <span class="badge bg-primary me-2">${release.tag_name}</span>
                        <small class="text-muted">${getTranslation('release_tag_name')}: ${release.tag_name} - ${new Date(release.published_at).toLocaleDateString()}</small>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${release.name || release.tag_name} ${getTranslation('release_tag_name')}</p>
                        <p class="card-text text-muted small">${getTranslation('release_download_count')}: ${releaseDownloadCount}</p>
                        <div class="mt-3">
                            ${assetsHtml.join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (previousVersionsList) previousVersionsList.innerHTML += releaseCard;
    });

    if (document.getElementById('totalDownloadCount')) document.getElementById('totalDownloadCount').innerText = totalDownloadCount;
}


// =========================================================
// 페이지 로드 시 초기화 및 이벤트 리스너 설정
// =========================================================
document.addEventListener('DOMContentLoaded', async () => {
    // 초기 언어 설정 (로컬 스토리지 또는 URL 파라미터, 없으면 기본값)
    const savedLang = localStorage.getItem('user_language');
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    let initialLang = "ko_KR"; // Default
    if (urlLang && ['ko_KR', 'en_US', 'de', 'ru', 'ja_JP', 'zh_CN'].includes(urlLang)) { // 지원 언어만 허용
        initialLang = urlLang;
    } else if (savedLang && ['ko_KR', 'en_US', 'de', 'ru', 'ja_JP', 'zh_CN'].includes(savedLang)) {
        initialLang = savedLang;
    }
    
    // 초기 언어 파일을 먼저 로드
    await loadLanguageFile(initialLang);

    // 웹소켓 연결 (언어 파일 로드 후)
    connectWebSocket();

    setLanguage(initialLang); // 초기 언어 적용 (UI 업데이트)

    // 언어 선택 드롭다운 이벤트 리스너
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('change', async (event) => { // async 추가
            await setLanguage(event.target.value); // await 추가
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
                copyButton.textContent = getTranslation('copied_message'); // Temporarily change text
                setTimeout(() => { copyButton.textContent = originalText; }, 2000); // Revert after 2 seconds
            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert(getTranslation('copied_message_error')); // 실패 시 알림 
            }
        });
    }
});
