// --- FILE: modules/font-customizer.js ---

(function () {
    'use strict';

    console.log('[Zalord] Đang khởi tạo module Font...');

    // 1. CẤU HÌNH & STORAGE
    const STORAGE_KEY = 'zalord_custom_font';
    const DEFAULT_FONT = 'Segoe UI, sans-serif'; // Font gốc của Zalo Windows

    // Hàm tiêm script WebFont Loader vào trang
    // Sử dụng CDN Google WebFont Loader
    function injectWebFontLoader() {
        return new Promise((resolve, reject) => {
            if (typeof WebFont !== 'undefined') {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
            script.async = true;
            script.onload = () => {
                console.log('[Zalord] WebFont Loader đã sẵn sàng');
                resolve();
            };
            script.onerror = () => reject(new Error('Không thể tải WebFont Loader'));
            document.head.appendChild(script);
        });
    }

    // 2. LOGIC XỬ LÝ FONT
    const FontManager = {
        // Lấy font đã lưu
        getSavedFont: () => {
            return localStorage.getItem(STORAGE_KEY) || '';
        },

        // Lưu font
        saveFont: (fontName) => {
            if (!fontName) {
                localStorage.removeItem(STORAGE_KEY);
            } else {
                localStorage.setItem(STORAGE_KEY, fontName);
            }
        },

        // Áp dụng CSS Variable
        applyToDOM: (fontName) => {
            const root = document.documentElement;
            if (!fontName) {
                // Reset về mặc định
                root.style.removeProperty('--zalord-font-family');
                root.removeAttribute('data-zalord-font');
            } else {
                // Set font mới
                // Thêm subsets latin,vietnamese để hỗ trợ tiếng Việt
                const fontString = `'${fontName}', sans-serif`;
                root.style.setProperty('--zalord-font-family', fontString);
                root.setAttribute('data-zalord-font', 'true');
            }
        },

        // Hàm chính gọi từ UI
        loadAndApply: async (fontName) => {
            // Trường hợp 1: Người dùng xóa input -> Về mặc định
            if (!fontName) {
                FontManager.saveFont('');
                FontManager.applyToDOM('');
                return true;
            }

            // Đảm bảo WebFont Loader đã có
            await injectWebFontLoader();

            // Trường hợp 2: Tải font mới
            return new Promise((resolve, reject) => {
                // Simplified format - Google WebFont API will handle weights automatically
                const fontRequest = fontName;

                WebFont.load({
                    google: {
                        families: [fontRequest]
                    },
                    active: () => {
                        console.log(`[Zalord] Đã tải xong font: ${fontName}`);
                        FontManager.saveFont(fontName);
                        FontManager.applyToDOM(fontName);
                        resolve(true);
                    },
                    inactive: () => {
                        console.error(`[Zalord] Không tìm thấy font: ${fontName}`);
                        reject(new Error('Font not found'));
                    },
                    timeout: 5000 // Increase timeout to 5 seconds for slower connections
                });
            });
        },

        // Khởi chạy ban đầu
        init: async () => {
            const saved = FontManager.getSavedFont();
            if (saved) {
                console.log('[Zalord] Phát hiện font đã lưu:', saved);
                // Áp dụng ngay (có thể chưa load xong nhưng cứ set CSS trước)
                FontManager.applyToDOM(saved);

                // Sau đó gọi tải ngầm
                try {
                    await injectWebFontLoader();
                    WebFont.load({
                        google: { families: [saved] }
                    });
                } catch (e) {
                    console.error('[Zalord] Lỗi tải lại font cũ', e);
                }
            }
        }
    };

    // 3. PUBLIC API (Để UI.js gọi)
    window.ZalordFont = {
        loadAndApply: FontManager.loadAndApply,
        getSavedFont: FontManager.getSavedFont
    };

    // Chạy init
    FontManager.init();

})();