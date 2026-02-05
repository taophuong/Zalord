/**
 * ═══════════════════════════════════════════════════════════════
 * Zalord Edition 3.6 - Enhanced Zalo Experience
 * ═══════════════════════════════════════════════════════════════
 * 
 * @module      data
 * @author      TaoPhuong
 * @version     3.6.0
 * @date        2026-01-29
 * 
 * This software is provided as-is for educational purposes.
 * Feel free to copy, modify, and distribute this code.
 * 
 * WARNING: This code ISN'T protected by copyright law.
 * You may use this code without any restrictions.
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// TaoPhuong-3.6-Zalord-VN-2026
// --- FILE: modules/data.js ---
const ANON_CONFIG = {
    fakeName: "Anonymous",
    maskColor: "#888",
    placeholderText: "Nhập @, tin nhắn tới Anonymous",
    typingText: "Anonymous đang soạn tin...",
    avatarUrl: "https://i.postimg.cc/wTD7CM5L/Anonymous-emblem-svg.png"
};

const GLOBAL_VARS = `
    :root {
        --item-opacity: 0.25; --liquid-radius: 18px; --neon-rgb: 255, 0, 0;
        --input-bg-color: rgba(255, 255, 255, 1); --input-text-color: #333333;
        --input-font-size: 14px; --input-font-weight: normal; --input-font-style: normal; --input-text-decoration: none;
        --recent-msg-color: #7589a3; --recent-msg-size: 13px; --recent-msg-weight: normal; --recent-msg-style: normal;
        --recent-unread-color: #2196f3; --recent-unread-size: 13px; --recent-unread-weight: bold; --recent-unread-style: normal;
        --bg-image-url: none;
`;

const CSS_CORE = `
    :root { --bg-blur-amount: 0px; --primary-color: #2196F3; --bg-overlay: rgba(0, 0, 0, 0.61); --transition-normal: 0.3s ease-in-out; --transition-slow: 0.5s ease-in-out; --radius-medium: 18px; --radius-full: 1000px; }
    body { background-image: var(--bg-image-url) !important; background-size: cover !important; background-position: center center !important; background-attachment: fixed !important; background-repeat: no-repeat !important; transition: background-image var(--transition-slow); }
    body::before { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-image: inherit; background-size: cover; background-position: center center; background-attachment: fixed; background-repeat: no-repeat; filter: blur(var(--bg-blur-amount)); z-index: -1; pointer-events: none; }
    #app, #app-page, #container, #sidebarNav, .main, #chatOnboard,#searchResultList, .flx, .flx-col, .flx-cell, .use-system-banner, #contact-search, .msg-filters-bar, .main__center, #chatViewContainer, #header, #chatView, #messageView, #chat-box-bar-id, #chatInput, #recent-search-list, .conv-item, .chat-onboard, main, .chat-group-topic-outer, .chat-group-topic__preview, .chat-group-topic__item, .border-6 .img-msg-v2__bub, .img-msg-v2__bub--audit .capt, .dark .bg__dark-mode, .chat-info__header, .chat-info-general__item, .chat-info-general__section__header, .contact-tab-v2, .msg-item, .message-view__blur__overlay_noavatar,.contact-pages.page-container,.head__page__contact__tab,.contact-pages.page-container .card-list-title,.contact-pages.page-container .contact-filter-wrapper { background: transparent !important; }
    .chat-info-general__section--border { border-top: none !important; }
    .card { background: rgba(0, 0, 0, 0.48) !important; font-weight: 500 !important; border-radius: 12px; backdrop-filter: blur(10px); }
    #conversationListId { background: none !important; padding: 10px 0; transform: translateZ(0); }
    #conversationListId .conv-item { transition: all var(--transition-normal); background-color: rgba(255, 255, 255, var(--item-opacity)) !important; border-radius: var(--liquid-radius) !important; }
`;

const CSS_BLUR_INACTIVE = `
    :root { --inactive-blur-amount: 2.5px; }
    #conversationListId .conv-item:where(:not(:has(.conv-action__unread-v2)), :has(.--noti-disable)):not(.selected) { opacity: 0.5; filter: blur(var(--inactive-blur-amount)); transform: scale(0.98); }
    #conversationListId .conv-item.selected { background: var(--bg-overlay) !important; border: 2px solid #fff; opacity: 1; filter: blur(0); transform: scale(1.02); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
    #conversationListId .conv-item:hover { opacity: 1; filter: blur(0); transform: scale(1.02); }
`;

const CSS_NEON = `
    div.doing-something.message-view__typing { background-color: rgba(var(--neon-rgb), .15) !important; padding: 6px 14px !important; border-radius: 18px !important; border: 2px solid rgb(var(--neon-rgb)) !important; display: inline-flex !important; align-items: center !important; animation: neonPulse 1.5s ease-in-out infinite; box-shadow: 0 0 10px rgba(var(--neon-rgb), .5); }
    div.doing-something.message-view__typing span { color: rgb(var(--neon-rgb)) !important; font-weight: 600 !important; font-size: 19px !important; }
    @keyframes neonPulse { 0%, 100% { box-shadow: 0 0 10px rgba(var(--neon-rgb), .5); border-color: rgb(var(--neon-rgb)); } 50% { box-shadow: 0 0 20px rgba(var(--neon-rgb), .8); border-color: rgb(var(--neon-rgb)); } }
`;

const CSS_INPUT_STYLE = `
    .chat-input-container, #chatInput { background-color: var(--input-bg-color) !important; transition: all 0.3s ease; border-radius: 12px; }
    #richInput, .chat-input__content { color: var(--input-text-color) !important; font-size: var(--input-font-size) !important; font-weight: var(--input-font-weight) !important; font-style: var(--input-font-style) !important; text-decoration: var(--input-text-decoration) !important; }
    #richInput:empty::before { color: rgba(150,150,150,0.7); }
`;

const CSS_RECENT_MSG = `
    .conv-message { color: var(--recent-msg-color) !important; font-size: var(--recent-msg-size) !important; font-weight: var(--recent-msg-weight) !important; font-style: var(--recent-msg-style) !important; }
    .conv-message.unread { color: var(--recent-unread-color) !important; font-size: var(--recent-unread-size) !important; font-weight: var(--recent-unread-weight) !important; font-style: var(--recent-unread-style) !important; }
`;

const CSS_EXTRAS = `
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); border-radius: var(--radius-full); }
    ::-webkit-scrollbar-thumb { background: rgba(33, 150, 243, 0.5); border-radius: var(--radius-full); }
    .chat-message-v2 .message-bubble { border-radius: 18px !important; backdrop-filter: blur(5px); }
    .chat-message-v2 .message-bubble[data-sender="me"] { background: rgba(33, 150, 243, 0.2) !important; border: 1px solid rgba(33, 150, 243, 0.3); }
    .chat-message-v2 .message-bubble[data-sender="other"] { background: rgba(255, 255, 255, 0.15) !important; border: 1px solid rgba(255, 255, 255, 0.2); }
`;

// Anonymous Mode - Ẩn tên cuộc trò chuyện
const CSS_ANON_HIDE_NAMES = `
    .conv-item-title__name, 
    header .header-title, 
    .header-title,
    .title-name,
    .header-info__name { 
        visibility: hidden; 
        position: relative; 
        min-width: 150px; 
    }
    
    .conv-item-title__name::after, 
    header .header-title::after, 
    .header-title::after,
    .title-name::after,
    .header-info__name::after { 
        visibility: visible; 
        content: "${ANON_CONFIG.fakeName}"; 
        position: absolute; 
        top: 0; 
        left: 0; 
        color: inherit; 
        font-weight: bold; 
        pointer-events: auto; 
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    
    /* Zalo native styling for .header-info__name */
    .header-info__name::after { 
        height: 26px;
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 1.5;
        justify-content: center;
    }
    
    header .header-title::after, 
    .header-title::after { 
        font-size: 16px; 
    }
    
    .conv-item-title__name::after,
    .title-name::after { 
        font-size: 14px;
    }
    
    .conv-item-title__name:hover, 
    header .header-title:hover, 
    .header-title:hover,
    .title-name:hover,
    .header-info__name:hover { 
        visibility: visible !important; 
        cursor: help; 
    }
    
    .conv-item-title__name:hover::after, 
    header .header-title:hover::after, 
    .header-title:hover::after,
    .title-name:hover::after,
    .header-info__name:hover::after { 
        display: none !important; 
    }
`;

// Anonymous Mode - Ẩn tin nhắn trong cuộc trò chuyện
const CSS_ANON_HIDE_MESSAGES = `
    /* Ẩn tên người gửi */
    .message-sender-name-content .truncate, .chat-box-member__info__name.v2, .contact-pages.page-container .contact-item-v2-wrapper>.friend-info>.detail-info>.name-wrapper>.name { font-size: 0 !important; line-height: 0 !important; }
    .message-sender-name-content .truncate::after, .chat-box-member__info__name.v2::after, .contact-pages.page-container .contact-item-v2-wrapper>.friend-info>.detail-info>.name-wrapper>.name::after { content: "${ANON_CONFIG.fakeName}"; font-size: 13px !important; line-height: 1.5 !important; display: inline-block !important; visibility: visible !important; font-weight: bold; }
    .message-sender-name-content .truncate:hover, .chat-box-member__info__name.v2:hover, .contact-pages.page-container .contact-item-v2-wrapper>.friend-info>.detail-info>.name-wrapper>.name:hover { font-size: 13px !important; line-height: 1.5 !important; cursor: help; }
    .message-sender-name-content .truncate:hover::after, .chat-box-member__info__name.v2:hover::after, .contact-pages.page-container .contact-item-v2-wrapper>.friend-info>.detail-info>.name-wrapper>.name:hover::after { display: none !important; }
    
    /* Ẩn typing status - match Zalo native formatting */
    .doing-something.message-view__typing { visibility: hidden !important; position: relative !important; cursor: help; }
    .doing-something.message-view__typing::after { 
        content: "${ANON_CONFIG.typingText}" !important; 
        visibility: visible !important; 
        position: absolute; 
        top: 0; 
        left: 0; 
        font-size: .75rem !important;
        font-weight: 400 !important;
        color: var(--text-primary) !important;
        line-height: normal !important;
        white-space: nowrap; 
        display: flex;
        align-items: center;
    }
    .doing-something.message-view__typing:hover { visibility: visible !important; }
    .doing-something.message-view__typing:hover::after { display: none !important; }
    
    /* Placeholder text - Zalo default format */
    .rich-input.empty::before, #richInput.empty::before { visibility: hidden !important; opacity: 0 !important; }
    .rich-input.empty::after, #richInput.empty::after { 
        content: "${ANON_CONFIG.placeholderText}"; 
        visibility: visible !important; 
        display: block !important; 
        position: absolute; 
        top: 0 !important; 
        left: 0 !important; 
        padding: 0 !important; 
        color: ${ANON_CONFIG.maskColor} !important; 
        font-size: .9375rem !important; 
        font-weight: 400 !important; 
        line-height: 1.5 !important;
        word-break: break-word !important;
        word-wrap: break-word !important;
        height: auto !important;
        min-height: 22.5px !important;
        overflow: hidden !important;
        pointer-events: none; 
        z-index: 10; 
    }

    
    /* 80% opacity when not hovering - messages and header */
    .message-view__scroll__inner,
    .message-view__header,
    header .header-title,
    .header-title {
        opacity: 0.2 !important;
        transition: opacity 0.3s ease;
    }
    
    .message-view__scroll__inner:hover,
    .message-view__scroll__inner:hover ~ .message-view__header,
    .message-view__header:hover,
    header .header-title:hover,
    .header-title:hover {
        opacity: 1 !important;
    }
`;

// Anonymous Mode - Ẩn ảnh đại diện
const CSS_ANON_HIDE_AVATARS = `
    .zavatar, .zavatar-container, .group-avatar { border-radius: 50% !important; cursor: help !important; }
    .zavatar .a-child, .zavatar > img, .zavatar > div, .zavatar-container > .avatar-img, .zavatar-container > img { opacity: 0 !important; visibility: hidden !important; transition: opacity 0.2s; }
    .zavatar::after, .zavatar-container::after, .group-avatar::after { content: "" !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; background: #fff url('${ANON_CONFIG.avatarUrl}') center/cover no-repeat !important; border-radius: 50% !important; z-index: 100 !important; pointer-events: none !important; opacity: 1 !important; transition: opacity 0.2s; }
    .zavatar:hover::after, .zavatar-container:hover::after, .group-avatar:hover::after { opacity: 0 !important; }
    .zavatar:hover .a-child, .zavatar:hover > img, .zavatar:hover > div, .zavatar-container:hover > .avatar-img, .zavatar-container:hover > img { opacity: 1 !important; visibility: visible !important; }
`;

// Anonymous Mode - Ẩn tin nhắn gần nhất (trong danh sách)
const CSS_ANON_HIDE_RECENT = `
    .conv-message { visibility: hidden !important; }
    .conv-message::after { content: "***"; visibility: visible !important; color: #999; font-style: italic; }
`;

// Giữ lại biến cũ cho backward compatibility nếu cần
const CSS_ANONYMOUS = CSS_ANON_HIDE_NAMES + CSS_ANON_HIDE_MESSAGES + CSS_ANON_HIDE_AVATARS + CSS_ANON_HIDE_RECENT;

const SVG_CONTENT = `
    <svg style="position:absolute; width:0; height:0; pointer-events:none;">
      <defs>
        <filter id="liquid-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="liquid" />
          <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
        </filter>
      </defs>
    </svg>
`;

// Thêm đoạn này vào cuối biến GLOBAL_VARS hoặc tạo một biến CSS riêng
const CSS_GOOGLE_FONT = `
    /* Mặc định biến font là font hệ thống */
    :root {
        --zalord-font-family: 'Segoe UI', sans-serif;
    }

    /* Khi attribute data-zalord-font tồn tại (đã load font custom) */
    /* IMPORTANT: Exclude #zalord-popup to keep menu font as Saira */
    html[data-zalord-font="true"] body:not(#zalord-popup):not(#zalord-popup *),
    html[data-zalord-font="true"] button:not(#zalord-popup *),
    html[data-zalord-font="true"] input:not(#zalord-popup *),
    html[data-zalord-font="true"] textarea:not(#zalord-popup *),
    html[data-zalord-font="true"] select:not(#zalord-popup *),
    html[data-zalord-font="true"] .conv-message:not(#zalord-popup *),
    html[data-zalord-font="true"] .message-view:not(#zalord-popup *),
    html[data-zalord-font="true"] .txt-global:not(#zalord-popup *),
    html[data-zalord-font="true"] .header-title:not(#zalord-popup *),
    html[data-zalord-font="true"] div:not(#zalord-popup):not(#zalord-popup *),
    html[data-zalord-font="true"] span:not(#zalord-popup *),
    html[data-zalord-font="true"] p:not(#zalord-popup *) {
        font-family: var(--zalord-font-family) !important;
    }
`;

const SETTINGS = [
    { id: 'core', name: 'Background', css: CSS_CORE, default: false, hasBgInput: true, hasExtra: true },
    { id: 'blur', name: 'Làm mờ hội thoại', css: CSS_BLUR_INACTIVE, default: false, hasExtra: true, hasBlurSlider: true, hasSlider: true, hasRadiusSlider: true },
    { id: 'neon', name: ' Màu chữ đang soạn tin', css: CSS_NEON, default: false, hasColorPicker: true, hasExtra: true },
    { id: 'input_style', name: 'Tuỳ biến Khung Chat & Giao diện', css: '', default: false, isInputCustomizer: true, hasExtra: true },
    { id: 'recent_msg', name: 'Tùy chỉnh tin nhắn gần đây', css: CSS_RECENT_MSG, default: false, isRecentMsgCustomizer: true, hasExtra: true },
    { id: 'anonymous', name: 'Chế độ Ẩn danh', css: CSS_ANONYMOUS, default: false, hasExtra: false },
    { id: 'custom_reaction', name: 'Reaction Tùy chỉnh ', css: '', default: false, hasExtra: false },
    { id: 'auto_open', name: 'Tự động mở tin nhắn mới', css: '', default: false, hasExtra: false },
    { id: 'block_typing', name: 'Ẩn trạng thái Đang Soạn Tin', css: '', default: false, hasExtra: false },
    { id: 'block_seen', name: 'Ẩn trạng thái đã xem', css: '', default: false, hasExtra: false },
    { id: 'block_delivered', name: 'Ẩn trạng thái đã nhận', css: '', default: false, hasExtra: false },
    { id: 'anon_hide_names', name: 'Ẩn tên cuộc trò chuyện', css: CSS_ANON_HIDE_NAMES, default: false, hasExtra: false },
    { id: 'anon_hide_messages', name: 'Ẩn tin nhắn trong cuộc trò chuyện', css: CSS_ANON_HIDE_MESSAGES, default: false, hasExtra: false },
    { id: 'anon_hide_avatars', name: 'Ẩn ảnh đại diện cuộc trò chuyện', css: CSS_ANON_HIDE_AVATARS, default: false, hasExtra: false },
    { id: 'anon_hide_recent', name: 'Ẩn tin nhắn gần nhất', css: CSS_ANON_HIDE_RECENT, default: false, hasExtra: false },
    { id: 'menu_position_right', name: 'Bảng điều khiển bên phải', css: '', default: false, hasExtra: false },
    {
        id: 'theme_mode',
        name: 'Theme',
        css: '',
        default: 'dark',
        hasExtra: false,
        isThemeSelector: true,  // Changed from isThemeToggle to isThemeSelector
        options: [
            { value: 'light', label: 'Sáng' },
            { value: 'dark', label: 'Tối' },
            { value: 'system', label: 'Hệ thống' }
        ],
        onSelect: function (selectedTheme) {
            // selectedTheme can be: 'light', 'dark', or 'system'
            let actualTheme = selectedTheme;
            
            if (selectedTheme === 'system') {
                // Detect system theme
                actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }

            console.log(`[Theme] Switching to ${selectedTheme} mode (actual: ${actualTheme})...`);

            // Apply theme to Zalo
            if (actualTheme === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }

            // Update localStorage for Zalo persistence
            const zaloTheme = { theme: actualTheme };
            localStorage.setItem('za_theme', JSON.stringify(zaloTheme));

            // Sync Zalord menu theme (SAME as Zalo, not inverted)
            document.documentElement.setAttribute('data-zalord-theme', actualTheme);
            GM_setValue('zalord_theme', actualTheme);
            GM_setValue('theme_mode', selectedTheme); // Save user preference (light/dark/system)

            console.log('[Theme] Theme switched successfully!');
        }
    },
    {
        id: 'google_font',
        name: 'Phông chữ từ Google Fonts',
        default: true,
        isFontInput: true,
        hasExtra: false,
        noToggle: true,
        placeholder: 'Mặc định',
        css: CSS_GOOGLE_FONT
    }
];

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ZalordSettings = SETTINGS;
}
