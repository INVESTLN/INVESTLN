document.head.innerHTML += "<style>.dark-mode-btn {position: fixed;bottom: 94px;right: 18px;width: 64px;height: 64px;border-radius: 50%;background-color: #6e6e6e;color: white;display: flex;justify-content: center;align-items: center;cursor: pointer;}.dark-mode-btn:hover {background-color: #4d4d4d;transform: scale(1.1, 1.1);}</style>";
document.body.innerHTML += '<div class="dark-mode-btn" data-bs-toggle="tooltip" title="背景模式"><i class="fa-solid fa-circle-half-stroke  fa-2xl"></i></div>';
DarkModeBtn = document.querySelector('.dark-mode-btn');
let DarkMode;

try {
  DarkMode = document.cookie.split('DarkMode=')[1].split('; ')[0];
} catch {
  DarkMode = 'auto';
  document.cookie = 'DarkMode=auto';
}

// 初始加載時設置模式
if (DarkMode == 'dark') {
  DarkModeBtn.innerHTML = '<i class="fa-regular fa-moon fa-2xl"></i>';
  dark();
} else if (DarkMode == 'light') {
  DarkModeBtn.innerHTML = '<i class="fa-regular fa-sun  fa-2xl"></i>';
  light();
} else if (DarkMode == 'auto') {
  DarkModeBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke  fa-2xl"></i>';
  // 首次載入現在的模式
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    dark();
  } else {
    light();
  }
}

// 監聽模式的變更
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newColorScheme = e.matches ? 'dark' : 'light';
  if (DarkMode == 'auto') {
    if (newColorScheme == 'dark') {
      dark();
    } else if (newColorScheme == 'light') {
      light();
    }
  }
});

// 點擊懸浮按鈕切換模式
DarkModeBtn.addEventListener("click", function () {
  if (DarkMode == 'dark') {
    DarkMode = 'light';
    DarkModeBtn.innerHTML = '<i class="fa-regular fa-sun  fa-2xl"></i>';
    document.cookie = 'DarkMode=light';
    light();
  } else if (DarkMode == 'light') {
    DarkMode = 'auto';
    DarkModeBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke  fa-2xl"></i>';
    document.cookie = 'DarkMode=auto';
    // 首次載入現在的模式
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dark();
    } else {
      light();
    }
  } else if (DarkMode == 'auto') {
    DarkMode = 'dark';
    DarkModeBtn.innerHTML = '<i class="fa-regular fa-moon fa-2xl"></i>';
    document.cookie = 'DarkMode=dark';
    dark();
  }
});

function dark() {
  // 深色模式
  document.querySelector('html').dataset.bsTheme = 'dark';
  document.querySelector('#page-content-wrapper').classList.remove('bg-light')
}

function light() {
  // 淺色模式
  document.querySelector('html').dataset.bsTheme = 'light';
  document.querySelector('#page-content-wrapper').classList.add('bg-light')
}
