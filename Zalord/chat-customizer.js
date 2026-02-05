// --- FILE: modules/chat-customizer.js ---
(function () {
    'use strict';

    const CONFIG_KEY = 'zalo_chat_custom_config';

    // Config mặc định
    const DEFAULT_CONFIG = {
        msg_bg: '#ffffff', msg_opacity: 100, msg_text: '#000000', msg_size: 15, msg_bold: false, msg_italic: false, msg_enable: false,
        header_color: '#000000', header_size: 16, header_bold: true, header_italic: false, header_enable: false
    };

    let config = JSON.parse(localStorage.getItem(CONFIG_KEY)) || DEFAULT_CONFIG;

    // Hàm đổi HEX sang RGBA (Cốt lõi của việc làm mờ nền)
    const hexToRgba = (hex, alpha) => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) { r = parseInt(hex[1] + hex[1], 16); g = parseInt(hex[2] + hex[2], 16); b = parseInt(hex[3] + hex[3], 16); }
        else if (hex.length === 7) { r = parseInt(hex[1] + hex[2], 16); g = parseInt(hex[3] + hex[4], 16); b = parseInt(hex[5] + hex[6], 16); }
        return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
    };

    const styleId = 'zalo-custom-chat-style';
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }

    const updateCSS = () => {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));

        // Check if main toggle is enabled first
        const mainToggleEnabled = GM_getValue('input_style', false);
        
        // LUÔN regenerate CSS từ đầu (removed premium check)
        let css = '';

        // 1. Logic CSS Tin nhắn (Loại trừ Sender)
        // Check BOTH main toggle AND sub-toggle
        if (mainToggleEnabled && config.msg_enable) {
            const bgRgba = hexToRgba(config.msg_bg, config.msg_opacity);
            css += `
                .audio-expired, .card { background-color: ${bgRgba} !important; border: 1px solid rgba(128,128,128,0.2) !important; backdrop-filter: blur(5px); }
                /* Selector loại trừ sender name để không bị đổi màu theo */
                .audio-expired, .card, .card *:not(.message-sender-name-content):not(.message-sender-name-content *) {
                    color: ${config.msg_text} !important; font-size: ${config.msg_size}px !important; font-family: inherit;
                    font-weight: ${config.msg_bold ? 'bold' : 'normal'} !important; font-style: ${config.msg_italic ? 'italic' : 'normal'} !important;
                }
                .card a { text-decoration: underline !important; color: inherit !important; }
            `;
        }

        // 2. Logic CSS Header
        // Check BOTH main toggle AND sub-toggle
        if (mainToggleEnabled && config.header_enable) {
            css += `
                .header-title,
                .conv-item-title__name {
                    color: ${config.header_color} !important; font-size: ${config.header_size}px !important;
                    font-weight: ${config.header_bold ? 'bold' : 'normal'} !important; font-style: ${config.header_italic ? 'italic' : 'normal'} !important;
                }
            `;
        }

        // Apply CSS (sẽ clear nếu css rỗng)
        styleElement.innerHTML = css;
    };

    // Xuất hàm ra ngoài để ui.js gọi
    window.ChatCustomizer = {
        set: (key, value) => { config[key] = value; updateCSS(); },
        get: (key) => config[key],
        init: () => updateCSS()
    };

    // Chạy lần đầu
    updateCSS();
})();