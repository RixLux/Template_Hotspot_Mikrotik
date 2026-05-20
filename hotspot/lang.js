const translations = {
    'en': {
        'name': 'English',
        'login_title': 'LOGIN',
        'login_desc': 'Please enter your username and password to access the internet.',
        'username_label': 'Username',
        'username_placeholder': 'Enter username',
        'password_label': 'Password',
        'password_placeholder': 'Enter password',
        'login_button': 'LOGIN',
        'trial_msg': 'Or try for free for a few minutes.',
        'trial_button': 'TRY FREE',
        'logout_title': 'LOGGED OUT',
        'logout_desc': 'Thank you for using our hotspot service. Your session has ended.',
        'ip_label': 'IP Address',
        'mac_label': 'MAC Address',
        'session_time_label': 'Session Time',
        'time_left_label': 'Time Left',
        'usage_label': 'Usage (Up/Down)',
        'login_again_button': 'LOG IN AGAIN',
        'status_title': 'STATUS',
        'welcome_trial': 'Welcome trial user!',
        'welcome_prefix': 'Welcome',
        'connected_label': 'Connected',
        'connected_left_label': 'Connected / Left',
        'refresh_label': 'Refresh In',
        'status_label': 'Status',
        'ads_required': 'Advertisement required',
        'log_off_button': 'LOG OFF',
        'error_title': 'ERROR',
        'error_desc': 'An error occurred while processing your request.',
        'back_to_login': 'BACK TO LOGIN',
        'connecting_title': 'CONNECTING',
        'connecting_desc': 'Please wait a moment, you are being redirected to the internet.',
        'manual_redirect_msg': 'If you are not redirected automatically, please click the button below.',
        'continue_button': 'CONTINUE',
        'ad_title': 'ADVERTISEMENT',
        'ad_desc': 'Please view this advertisement to continue your internet access.',
        'auto_redirect_msg': 'You will be redirected automatically...',
        'view_manually_button': 'VIEW MANUALLY'
    },
    'id': {
        'name': 'Bahasa Indonesia',
        'login_title': 'MASUK',
        'login_desc': 'Silakan masukkan nama pengguna dan kata sandi Anda untuk mengakses internet.',
        'username_label': 'Nama Pengguna',
        'username_placeholder': 'Masukkan username',
        'password_label': 'Kata Sandi',
        'password_placeholder': 'Masukkan password',
        'login_button': 'MASUK',
        'trial_msg': 'Atau coba gratis selama beberapa menit.',
        'trial_button': 'COBA GRATIS',
        'logout_title': 'KELUAR',
        'logout_desc': 'Terima kasih telah menggunakan layanan hotspot kami. Sesi Anda telah diakhiri.',
        'ip_label': 'Alamat IP',
        'mac_label': 'Alamat MAC',
        'session_time_label': 'Waktu Sesi',
        'time_left_label': 'Sisa Waktu',
        'usage_label': 'Penggunaan (Unggah/Unduh)',
        'login_again_button': 'MASUK LAGI',
        'status_title': 'STATUS',
        'welcome_trial': 'Selamat datang pengguna percobaan!',
        'welcome_prefix': 'Selamat datang',
        'connected_label': 'Tersambung',
        'connected_left_label': 'Tersambung / Sisa',
        'refresh_label': 'Segarkan Dalam',
        'status_label': 'Status',
        'ads_required': 'Iklan diperlukan',
        'log_off_button': 'KELUAR',
        'error_title': 'KESALAHAN',
        'error_desc': 'Terjadi kesalahan saat memproses permintaan Anda.',
        'back_to_login': 'KEMBALI KE LOGIN',
        'connecting_title': 'MENYAMBUNGKAN',
        'connecting_desc': 'Harap tunggu sebentar, Anda sedang dialihkan ke internet.',
        'manual_redirect_msg': 'Jika Anda tidak dialihkan secara otomatis, silakan klik tombol di bawah ini.',
        'continue_button': 'LANJUTKAN',
        'ad_title': 'IKLAN',
        'ad_desc': 'Harap lihat iklan ini untuk melanjutkan akses internet Anda.',
        'auto_redirect_msg': 'Anda akan dialihkan secara otomatis...',
        'view_manually_button': 'LIHAT MANUAL'
    }
};

function applyLanguage(lang) {
    const translation = translations[lang] || translations['en'];
    
    // Update elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translation[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = translation[key];
            } else {
                // Keep icons if present
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + translation[key]));
                } else {
                    el.textContent = translation[key];
                }
            }
        }
    });

    // Save preference
    localStorage.setItem('preferred_lang', lang);
}

function createLanguageSelector() {
    const container = document.getElementById('lang-selector-container');
    if (!container) return;

    const select = document.createElement('select');
    select.className = 'lang-select';
    
    Object.keys(translations).forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = translations[lang].name;
        select.appendChild(option);
    });

    const savedLang = localStorage.getItem('preferred_lang') || 'en';
    select.value = savedLang;
    applyLanguage(savedLang);

    select.addEventListener('change', (e) => {
        applyLanguage(e.target.value);
    });

    container.appendChild(select);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', createLanguageSelector);
