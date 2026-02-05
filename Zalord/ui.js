/**
 * ═══════════════════════════════════════════════════════════════
 * Zalord Edition 3.6 - Enhanced Zalo Experience
 * ═══════════════════════════════════════════════════════════════
 * 
 * @module      ui
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
// --- FILE: modules/ui.js (REFACTORED - MODULAR) ---

function createControlPanel() {
    // ============================================
    // 0. INJECT CSS STYLES FROM MODULE
    // ============================================
    if (typeof ZalordStyles !== 'undefined' && ZalordStyles.inject) {
        ZalordStyles.inject();
    } else {
        console.error('[UI] ZalordStyles module not loaded!');
    }

    // ============================================
    // 0.5 SIDEBAR MENU HELPERS
    // ============================================
    // Note: togglePanel is defined later in the code and used here

    // Create sidebar menu item
    function createSidebarMenu() {
        const menuItem = document.createElement('div');
        menuItem.className = 'zalord-sidebar-menu';
        menuItem.id = 'zalord-sidebar-settings';

        menuItem.innerHTML = `
    <div class="zalord-sidebar-menu__icon" style="font-size: 36px; line-height: 1;">
        ⭐️
    </div>
    <div class="zalord-sidebar-menu__text">Cài đặt Zalo Ultimate 2.0</div>
`;

        // Click handler - will use togglePanel function
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof togglePanel === 'function') {
                togglePanel();
            }
        });

        return menuItem;
    }

    // Inject sidebar menu using MutationObserver
    function injectSidebarMenu() {
        let injectionAttempts = 0;
        const maxAttempts = 20; // ✅ Reduced from 50 (4s instead of 10s)

        const tryInject = () => {
            if (injectionAttempts >= maxAttempts) {
                console.log('[Zalord] Sidebar injection max attempts reached');
                return;
            }

            // Check if already injected
            if (document.getElementById('zalord-sidebar-settings')) {
                return;
            }

            // Try multiple selectors for Zalo sidebar
            const selectors = [
                '#sidebarNav',
                '.sidebar',
                '[class*="sidebar"]',
                '.left-bar',
                '[class*="leftbar"]',
                '.nav-bar',
                '[class*="navbar"]'
            ];

            let sidebar = null;
            for (const selector of selectors) {
                sidebar = document.querySelector(selector);
                if (sidebar) {
                    console.log(`[Zalord] Found sidebar with selector: ${selector}`);
                    break;
                }
            }

            if (sidebar) {
                const menuItem = createSidebarMenu();

                // Try to find bottom container or just append
                const bottomContainer = sidebar.querySelector('.sidebar__bottom, .nav__bottom, [class*="bottom"]');
                if (bottomContainer) {
                    bottomContainer.appendChild(menuItem);
                } else {
                    sidebar.appendChild(menuItem);
                }

                console.log('[Zalord] Sidebar menu injected successfully');
            } else {
                injectionAttempts++;
                setTimeout(tryInject, 200);
            }
        };

        // Start injection attempts
        setTimeout(tryInject, 500);

        // Also observe DOM changes
        const observer = new MutationObserver(() => {
            if (!document.getElementById('zalord-sidebar-settings')) {
                tryInject();
            } else {
                // ✅ Stop observing after sidebar is injected (fix memory leak)
                observer.disconnect();
                console.log('[Zalord] Sidebar observer disconnected');
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Floating button removed - using sidebar menu only

    // ============================================
    // 2. Zalord POPUP STRUCTURE (EXACT COPY)
    // ============================================
    const popper = document.createElement('div');
    popper.className = 'zalord-popper';
    popper.id = 'js-zalord-popup';
    popper.style.cssText = 'display: none; opacity: 0; transform: scale(0.95); transition: all 0.15s ease;';

    const popup = document.createElement('div');
    popup.id = 'zalord-popup';

    // Header
    const header = document.createElement('div');
    header.className = 'zalord-popup__header';
    header.innerHTML = `
        <div class="zalord-popup__header__logo">
            <div class="zalord-premium-title">
                <span class="zalord-premium-icon">✨</span>
                <span class="zalord-premium-text">Zalỏ</span>
            </div>
        </div>
        <div class="zalord-popup__header__menu-list" style="display: none;">
            <span class="zalord-popup__header__menu-item">
                <a href="https://zalo.me/84979641371" target="_blank" title="Liên hệ và Góp ý" style="color: #3989ff; font-weight: 600; font-size: 13px;">💬 Liên hệ và Góp ý</a>
            </span>
        </div>
    `;
    popup.appendChild(header);

    // Timer and premium manager removed - all features are now free


    // Scrollable content
    const scrollable = document.createElement('div');
    scrollable.className = 'zalord-popup__scrollable';
    scrollable.id = 'js-zalord-popup__scrollable';

    const main = document.createElement('div');
    main.className = 'zalord-popup__main';

    // Password prompt and premium activation features removed

    // ============================================
    // PANEL CONTENT
    // ============================================

    // ============================================
    // SETTINGS PANEL (EXPANDABLE)
    // ============================================
    const settingsCollapsiblePanel = document.createElement('div');
    settingsCollapsiblePanel.className = 'zalord-panel';
    const settingsCollapsibleBody = document.createElement('div');
    settingsCollapsibleBody.className = 'zalord-panel__body';

    // Header row with expand button
    const settingsHeaderRow = document.createElement('div');
    settingsHeaderRow.className = 'zalord-switch__header';
    settingsHeaderRow.style.cssText = 'cursor: pointer; user-select: none;';

    const settingsLabel = document.createElement('div');
    settingsLabel.className = 'zalord-switch__label';
    settingsLabel.style.cssText = 'flex: 1; font-weight: 600; font-size: 14px;';
    settingsLabel.textContent = '⚙️ Cài đặt';

    const settingsExpandBtn = document.createElement('button');
    settingsExpandBtn.className = 'zalord-expand-btn';
    settingsExpandBtn.innerHTML = '+';
    settingsExpandBtn.type = 'button';
    settingsExpandBtn.style.cssText = 'width: 24px; height: 24px; flex-shrink: 0;';

    settingsHeaderRow.appendChild(settingsLabel);
    settingsHeaderRow.appendChild(settingsExpandBtn);
    settingsCollapsibleBody.appendChild(settingsHeaderRow);

    // Expandable content
    const settingsExpandableContent = document.createElement('div');
    settingsExpandableContent.className = 'zalord-details';
    settingsExpandableContent.style.display = 'none';

    // === HOTKEY SETTINGS (inside expandable) ===
    const hotkeySettings = document.createElement('div');
    hotkeySettings.className = 'font-settings font-settings--border-default';
    hotkeySettings.style.cssText = 'margin: 0; padding-top: 0; border-top: none;';

    const hotkeyLabel = document.createElement('label');
    hotkeyLabel.className = 'font-settings__label';
    hotkeyLabel.textContent = 'Phím tắt Menu:';

    const DEFAULT_HOTKEY = { key: 'f9', ctrl: false, alt: false, shift: false };
    let currentHotKey = GM_getValue('hotkey_config', DEFAULT_HOTKEY);
    const getHotKeyText = (config) => {
        let parts = [];
        if (config.ctrl) parts.push('Ctrl');
        if (config.alt) parts.push('Alt');
        if (config.shift) parts.push('Shift');
        parts.push(config.key.toUpperCase());
        return parts.join(' + ');
    };

    const hkBtn = document.createElement('button');
    hkBtn.className = 'zalord-input';
    hkBtn.style.cssText = 'cursor: pointer; text-align: center; color: transparent; transition: color 0.2s ease;';
    hkBtn.textContent = getHotKeyText(currentHotKey);
    let isRecordingKey = false;

    // Hiện text khi hover
    hkBtn.addEventListener('mouseenter', () => {
        if (!isRecordingKey) {
            hkBtn.style.color = 'var(--zalord-neutral-base)';
        }
    });
    hkBtn.addEventListener('mouseleave', () => {
        if (!isRecordingKey) {
            hkBtn.style.color = 'transparent';
        }
    });

    hkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isRecordingKey = true;
        hkBtn.textContent = 'Đang chờ phím...';
        hkBtn.style.borderColor = '#f59e0b';
        hkBtn.style.color = 'var(--zalord-neutral-base)'; // Show text khi recording
    });

    hotkeySettings.appendChild(hotkeyLabel);
    hotkeySettings.appendChild(hkBtn);
    settingsExpandableContent.appendChild(hotkeySettings);

    // === SETTINGS HOTKEY (Ctrl+Alt+F1) ===
    const settingsHotkeySettings = document.createElement('div');
    settingsHotkeySettings.className = 'font-settings font-settings--border-default';
    settingsHotkeySettings.style.cssText = 'margin: 0; padding-top: 12px; border-top: 1px solid var(--zalord-border-light);';

    const settingsHotkeyLabel = document.createElement('label');
    settingsHotkeyLabel.className = 'font-settings__label';
    settingsHotkeyLabel.textContent = 'Phím tắt Settings:';

    const DEFAULT_SETTINGS_HOTKEY = { key: 'f1', ctrl: true, alt: true, shift: false };
    let currentSettingsHotKey = GM_getValue('settings_hotkey_config', DEFAULT_SETTINGS_HOTKEY);

    const getSettingsHotKeyText = (config) => {
        let parts = [];
        if (config.ctrl) parts.push('Ctrl');
        if (config.alt) parts.push('Alt');
        if (config.shift) parts.push('Shift');
        parts.push(config.key.toUpperCase());
        return parts.join(' + ');
    };

    const settingsHkBtn = document.createElement('button');
    settingsHkBtn.className = 'zalord-input zalord-hotkey-btn';
    settingsHkBtn.style.cssText = 'color: transparent; transition: color 0.2s ease;';
    settingsHkBtn.textContent = getSettingsHotKeyText(currentSettingsHotKey);
    let isRecordingSettingsKey = false;

    // Hiện text khi hover
    settingsHkBtn.addEventListener('mouseenter', () => {
        if (!isRecordingSettingsKey) {
            settingsHkBtn.style.color = 'var(--zalord-neutral-base)';
        }
    });
    settingsHkBtn.addEventListener('mouseleave', () => {
        if (!isRecordingSettingsKey) {
            settingsHkBtn.style.color = 'transparent';
        }
    });

    settingsHkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isRecordingSettingsKey = true;
        settingsHkBtn.textContent = 'Đang chờ phím...';
        settingsHkBtn.style.borderColor = '#f59e0b';
        settingsHkBtn.style.color = 'var(--zalord-neutral-base)'; // Show text khi recording
    });

    settingsHotkeySettings.appendChild(settingsHotkeyLabel);
    settingsHotkeySettings.appendChild(settingsHkBtn);
    settingsExpandableContent.appendChild(settingsHotkeySettings);

    // Password settings removed - no longer needed without premium system

    // === Toggle expand/collapse ===
    let isSettingsExpanded = false;
    settingsHeaderRow.addEventListener('click', () => {
        isSettingsExpanded = !isSettingsExpanded;
        settingsExpandableContent.style.display = isSettingsExpanded ? 'flex' : 'none';
        settingsExpandBtn.innerHTML = isSettingsExpanded ? '−' : '+';
        settingsExpandBtn.classList.toggle('zalord-expand-btn--expanded', isSettingsExpanded);
    });

    settingsCollapsibleBody.appendChild(settingsExpandableContent);
    settingsCollapsiblePanel.appendChild(settingsCollapsibleBody);

    // Ẩn settings panel mặc định - chỉ hiển thị khi nhấn hotkey
    settingsCollapsiblePanel.style.display = 'none';

    main.appendChild(settingsCollapsiblePanel);

    // Settings panel
    const settingsPanel = document.createElement('div');
    settingsPanel.className = 'zalord-panel';
    const settingsPanelBody = document.createElement('div');
    settingsPanelBody.className = 'zalord-panel__body';
    const switchList = document.createElement('div');
    switchList.className = 'zalord-switch__list';

    SETTINGS.forEach((item, index) => {

        const switchItem = document.createElement('div');
        switchItem.className = index > 0 && SETTINGS[index - 1].hasExtra ? 'zalord-switch zalord-switch--border-default' : 'zalord-switch';

        // Premium checks removed - all features are free

        // ============================================
        // HELPER: Create tooltip icon
        // ============================================
        const createTooltipIcon = (tooltipText) => {
            const tooltipIcon = document.createElement('span');
            tooltipIcon.innerHTML = '❔';
            tooltipIcon.className = 'zalord-tooltip-icon';
            tooltipIcon.style.cssText = `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 16px;
                height: 16px;
                font-size: 12px;
                cursor: help;
                opacity: 0.6;
                transition: opacity 0.2s;
                margin-left: 6px;
            `;
            tooltipIcon.title = tooltipText;
            tooltipIcon.addEventListener('mouseenter', () => {
                tooltipIcon.style.opacity = '1';
            });
            tooltipIcon.addEventListener('mouseleave', () => {
                tooltipIcon.style.opacity = '0.6';
            });
            return tooltipIcon;
        };

        // ============================================
        // TOOLTIP CONTENT FOR EACH FEATURE
        // ============================================
        const tooltips = {


            'core': '📌 Thay đổi ảnh nền tùy chỉnh\n\n• 1. Vào trang https://i.postimg.cc/ \n• 2. Chọn choose để tải ảnh lên\n• 3. Copy Direct Link rồi dán vào ô bên dưới là được',

            'blur': '📌 Làm mờ các hội thoại không hoạt động\n\n• Làm nổi bật hội thoại đang chọn\n• Nói xấu sếp mà không bị sợ phát hiện\n• Điều chỉnh mức độ mờ, độ trong suốt và bo góc',

            'anonymous': '📌 Chế độ riêng tư tối đa\n\n• Ẩn tên người dùng thành "Anonymous"\n• Che avatar bằng biểu tượng ẩn danh\n• Di chuột vào để xem thông tin thật\n• Bảo vệ quyền riêng tư khi chia sẻ màn hình',

            'neon': '📌 Tùy chỉnh màu chữ "Đang soạn tin"\n\n• Thay đổi màu hiệu ứng Neon\n• Hiển thị khi người khác đang soạn tin\n• Tạo hiệu ứng nổi bật và bắt mắt',

            'input_style': '📌 Tùy biến giao diện khung chat\n\n• Thay đổi màu nền và chữ khung nhập\n• Điều chỉnh kích thước font chữ\n• Tùy chỉnh kiểu chữ (Bold, Italic, Strike)\n• Cá nhân hóa bong bóng tin nhắn và header',

            'recent_msg': '📌 Tùy chỉnh tin nhắn gần đây\n\n• Thay đổi màu sắc tin nhắn đã đọc/chưa đọc\n• Điều chỉnh kích thước và kiểu chữ\n• Phân biệt rõ ràng giữa các trạng thái',

            'custom_reaction': '📌 Sử dụng Reaction tùy chỉnh\n\n• Thêm 36 emoji mới và reaction độc đáo\n• Cá nhân hóa cách tương tác\n• Tạo trải nghiệm chat thú vị hơn',

            'auto_open': '📌 Tự động mở tin nhắn mới\n\n• Tự động chuyển sang hội thoại có tin mới\n• Tiết kiệm thời gian khi có nhiều tin nhắn\n• Có thể sẽ gây khó chịu khi tự động nhảy đoạn chat',

            'block_typing': '📌 Ẩn trạng thái "Đang soạn tin"\n\n• Người khác không thấy bạn đang gõ\n• Bảo vệ quyền riêng tư khi chat\n• Không bị sếp dí tin nhắn',

            'block_seen': '📌 Ẩn trạng thái "Đã xem"\n\n• Người gửi không biết bạn đã đọc tin\n• Đọc tin nhắn mà không bị "bắt bài"\n• Không bị sếp dí tin nhắn',

            'block_delivered': '📌 Ẩn trạng thái "Đã nhận"\n\n• Ẩn dấu tick xanh khi tin đến\n• Tăng sự riêng tư trong giao tiếp\n• Không bị sếp dí tin nhắn',

            'anon_hide_names': '📌 Ẩn tên cuộc trò chuyện\n\n• Thay tên bằng "Anonymous"\n• Di chuột vào để xem tên thật\n• Bảo vệ quyền riêng tư khi share màn hình\n• Áp dụng cho danh sách chat và header',

            'anon_hide_messages': '📌 Ẩn tin nhắn trong cuộc trò chuyện\n\n• Ẩn tên người gửi thành "Anonymous"\n• Ẩn placeholder "Đang soạn tin..."\n• Di chuột vào để xem thông tin thật\n• Bảo vệ nội dung chat khi demo',

            'anon_hide_avatars': '📌 Ẩn ảnh đại diện cuộc trò chuyện\n\n• Thay avatar bằng biểu tượng ẩn danh\n• Di chuột vào để xem avatar thật\n• Áp dụng cho tất cả avatar trong Zalo\n• Tăng tính riêng tư khi trình chiếu',

            'anon_hide_recent': '📌 Ẩn tin nhắn gần nhất\n\n• Che nội dung tin nhắn preview\n• Hiển thị "***" thay vì nội dung\n• Bảo vệ nội dung riêng tư\n• Hữu ích khi share màn hình',

            'theme_mode': '📌 Chế độ giao diện\n\n• Light: Giao diện sáng\n• Dark: Giao diện tối\n• Hệ thống: Tự động theo cài đặt Windows\n\n⚡ Theme của menu Zalỏ sẽ đồng bộ với Zalo',

            'google_font': '📌 Thay đổi phông chữ hệ thống\n\n• Nhập tên font từ Google Fonts\n• VD: "Roboto", "Patrick Hand", "Dancing Script"\n• Lưu ý chữ hoa/thường và khoảng cách\n• Nhấn Enter để áp dụng\n• Để trống = font mặc định "Open Sans"\n\n🔗 Tìm font tại: fonts.google.com'
        };

        const label = document.createElement('label');
        label.className = 'zalord-switch__label zalord-switch__label--helper';
        label.setAttribute('for', `zalord-switch-${item.id}`);

        // Create label text without bold formatting
        const labelText = document.createElement('span');
        labelText.textContent = item.name;
        label.appendChild(labelText);

        // Add tooltip if available for this feature
        if (tooltips[item.id]) {
            label.appendChild(createTooltipIcon(tooltips[item.id]));
        }

        // Premium badge removed - all features are free

        const controlsDiv = document.createElement('div');
        controlsDiv.style.cssText = 'display: flex; align-items: center; gap: 8px;';

        // Expand button OR spacer (to prevent text jumping)
        let toggleDetailsBtn = null;
        if (item.hasExtra) {
            toggleDetailsBtn = document.createElement('button');
            toggleDetailsBtn.className = 'zalord-expand-btn';
            toggleDetailsBtn.innerHTML = '+';
            toggleDetailsBtn.type = 'button';
            toggleDetailsBtn.style.cssText = 'width: 24px; height: 24px; flex-shrink: 0;';
        } else {
            // Create invisible spacer to reserve space
            toggleDetailsBtn = document.createElement('div');
            toggleDetailsBtn.className = 'zalord-expand-spacer';
            toggleDetailsBtn.style.cssText = 'width: 24px; height: 24px; flex-shrink: 0; visibility: hidden; pointer-events: none;';
        }

        // Font input (no switch, always show) - CHECK EARLY
        if (item.isFontInput) {
            // Create font settings row (no switch UI!)
            const fontSettings = document.createElement('div');
            fontSettings.className = 'font-settings font-settings--border-default';
            fontSettings.style.marginTop = '8px';
            fontSettings.style.paddingTop = '8px';
            fontSettings.style.borderTop = '1px solid var(--zalord-border-light)';

            const labelDiv = document.createElement('div');
            labelDiv.className = 'font-settings__label';
            labelDiv.style.display = 'flex';
            labelDiv.style.alignItems = 'center';
            labelDiv.style.gap = '8px';
            labelDiv.style.flex = '1';

            const labelText = document.createElement('span');
            labelText.textContent = item.name;

            labelDiv.appendChild(labelText);

            // Add tooltip using helper function
            if (tooltips[item.id]) {
                labelDiv.appendChild(createTooltipIcon(tooltips[item.id]));
            }

            fontSettings.appendChild(labelDiv);

            // Input field
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.className = 'zalord-input';
            inp.placeholder = 'mặc định';
            inp.style.minWidth = '168px';

            // Load saved font
            (async () => {
                let retries = 0;
                while (!window.ZalordFont && retries < 20) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    retries++;
                }
                if (window.ZalordFont) {
                    const savedFont = window.ZalordFont.getSavedFont();
                    if (savedFont && savedFont !== 'Open Sans') {
                        inp.value = savedFont;
                    }
                }
            })();

            fontSettings.appendChild(inp);
            switchItem.appendChild(fontSettings);

            // Status message box
            const statusMsg = document.createElement('div');
            statusMsg.className = 'zalord-font-status-msg';
            statusMsg.style.marginTop = '8px';
            statusMsg.style.fontSize = '12px';
            statusMsg.style.minHeight = '20px';
            switchItem.appendChild(statusMsg);

            // Handle Enter key
            inp.addEventListener('keydown', async (e) => {
                if (e.key === 'Enter') {
                    const fontName = inp.value.trim();
                    const targetFont = fontName || 'Open Sans'; // Empty = default

                    inp.disabled = true;
                    inp.style.borderColor = '#f59e0b';
                    statusMsg.textContent = fontName
                        ? `⏳ Đang tải "${fontName}"...`
                        : '⏳ Đang khôi phục mặc định "Open Sans"...';
                    statusMsg.style.color = '#f59e0b';

                    const oldError = switchItem.querySelector('.zalord-error-details');
                    if (oldError) oldError.remove();

                    if (!window.ZalordFont) {
                        // ✅ Add error logging for debugging
                        console.error('[Zalord] ZalordFont module not loaded');
                        console.error('[Zalord] Check if bootstrap.js is loaded and CSP is bypassed');
                        
                        inp.disabled = false;
                        inp.style.borderColor = '#dc2626';
                        statusMsg.textContent = '❌ Lỗi: Module Font chưa tải xong.';
                        statusMsg.style.color = '#dc2626';
                        return;
                    }

                    try {
                        await window.ZalordFont.loadAndApply(targetFont);
                        inp.disabled = false;
                        inp.style.borderColor = '#059669';
                        statusMsg.textContent = fontName
                            ? `✓ Đã áp dụng: ${fontName}`
                            : '✓ Đã về mặc định: Open Sans';
                        statusMsg.style.color = '#059669';
                    } catch (err) {
                        inp.disabled = false;
                        inp.style.borderColor = '#dc2626';
                        if (err.message && err.message.includes('Timeout')) {
                            statusMsg.textContent = '❌ Lỗi: Quá thời gian tải (Mạng lag)';
                        } else {
                            statusMsg.textContent = '❌ Không tìm thấy font này';
                        }
                        statusMsg.style.color = '#dc2626';

                        const errorDetails = document.createElement('div');
                        errorDetails.className = 'zalord-error-details';
                        errorDetails.style.cssText = `
                            font-size: 11px;
                            color: #dc2626;
                            margin-top: 8px;
                            padding-left: 12px;
                            border-left: 2px solid #dc2626;
                            line-height: 1.5;
                        `;
                        errorDetails.innerHTML = `
                            <div>• Kiểm tra tên font (VD: "Patrick Hand", "Roboto")</div>
                            <div>• Tìm font tại: fonts.google.com</div>
                            <div>• Kiểm tra kết nối mạng</div>
                        `;
                        switchItem.appendChild(errorDetails);
                    }
                }
            });

            // Add to list and SKIP creating switch
            switchList.appendChild(switchItem);
            return; // Exit forEach early - don't create switch!
        }

        // Theme selector (3 radio circles: Sáng, Tối, Hệ thống) - CHECK EARLY
        if (item.isThemeSelector) {
            // Create theme settings row
            const themeSettings = document.createElement('div');
            themeSettings.className = 'font-settings font-settings--border-default';
            themeSettings.style.marginTop = '8px';
            themeSettings.style.paddingTop = '8px';
            themeSettings.style.borderTop = '1px solid var(--zalord-border-light)';

            const labelDiv = document.createElement('div');
            labelDiv.className = 'font-settings__label';
            labelDiv.style.display = 'flex';
            labelDiv.style.alignItems = 'center';
            labelDiv.style.gap = '8px';
            labelDiv.style.flex = '1';

            const labelText = document.createElement('span');
            labelText.textContent = item.name;

            labelDiv.appendChild(labelText);

            // Add tooltip if available
            if (tooltips[item.id]) {
                labelDiv.appendChild(createTooltipIcon(tooltips[item.id]));
            }

            themeSettings.appendChild(labelDiv);

            // Radio group container (horizontal layout)
            const radioGroup = document.createElement('div');
            radioGroup.className = 'zalord-radio-group';
            radioGroup.style.cssText = 'display: flex; gap: 16px; margin-top: 12px; align-items: center;';

            const savedThemeMode = GM_getValue('theme_mode', item.default || 'dark');

            // Helper to get text color based on current theme
            const getTextColor = () => {
                const currentTheme = document.documentElement.getAttribute('data-zalord-theme') || 'dark';
                return currentTheme === 'light' ? '#333333' : '#e5e7eb';
            };

            item.options.forEach(option => {
                // Radio option wrapper
                const radioWrapper = document.createElement('label');
                radioWrapper.style.cssText = `
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    user-select: none;
                `;

                // Radio circle (custom styled)
                const radioCircle = document.createElement('span');
                radioCircle.className = 'zalord-radio-circle';
                const isActive = option.value === savedThemeMode;
                
                radioCircle.style.cssText = `
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    border: 2px solid ${isActive ? '#3989ff' : '#999'};
                    background: ${isActive ? '#3989ff' : 'transparent'};
                    position: relative;
                    transition: all 0.2s;
                    flex-shrink: 0;
                `;

                // Inner dot for active state
                if (isActive) {
                    const innerDot = document.createElement('span');
                    innerDot.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: white;
                    `;
                    radioCircle.appendChild(innerDot);
                }

                // Label text
                const labelSpan = document.createElement('span');
                labelSpan.textContent = option.label;
                labelSpan.style.cssText = `
                    font-size: 14px;
                    color: ${getTextColor()};
                    transition: color 0.2s;
                `;

                radioWrapper.appendChild(radioCircle);
                radioWrapper.appendChild(labelSpan);

                // Click handler
                radioWrapper.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Deactivate all
                    radioGroup.querySelectorAll('.zalord-radio-circle').forEach(circle => {
                        circle.style.border = '2px solid #999';
                        circle.style.background = 'transparent';
                        circle.innerHTML = ''; // Remove inner dot
                    });

                    // Activate this one
                    radioCircle.style.border = '2px solid #3989ff';
                    radioCircle.style.background = '#3989ff';
                    
                    // Add inner dot
                    const innerDot = document.createElement('span');
                    innerDot.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: white;
                    `;
                    radioCircle.appendChild(innerDot);

                    // Call onSelect handler
                    if (item.onSelect && typeof item.onSelect === 'function') {
                        item.onSelect(option.value);
                        
                        // Update text colors after theme change
                        setTimeout(() => {
                            const newTextColor = getTextColor();
                            cachedTextSpans.forEach(span => {
                                span.style.color = newTextColor;
                            });
                        }, 100);
                    }
                });

                radioGroup.appendChild(radioWrapper);
            });

            // ✅ Cache spans to avoid re-querying on every click
            const cachedTextSpans = radioGroup.querySelectorAll('label span:last-child');

            themeSettings.appendChild(radioGroup);
            switchItem.appendChild(themeSettings);

            // Add to list and SKIP creating switch
            switchList.appendChild(switchItem);
            return; // Exit forEach early - don't create switch!
        }

        // Normal switch toggle (for non-font items only)
        const switchWrapper = document.createElement('label');
        switchWrapper.className = 'zalord-switch__checkbox';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'zalord-switch__input';
        checkbox.id = `zalord-switch-${item.id}`;
        checkbox.checked = GM_getValue(item.id, item.default);

        const slider = document.createElement('span');
        slider.className = 'zalord-switch__slider';

        switchWrapper.appendChild(checkbox);
        switchWrapper.appendChild(slider);



        checkbox.addEventListener('change', (e) => {
            const checked = e.target.checked;




            // Normal flow
            GM_setValue(item.id, checked);
            toggleStyle(item.id, item.css, checked);
            if (item.onToggle && typeof item.onToggle === 'function') {
                item.onToggle(checked);
            }


            // ✅ Show restart notification for features that need it
            const requiresRestart = ['custom_reaction', 'block_typing', 'block_seen', 'block_delivered', 'auto_open'];
            if (checked && requiresRestart.includes(item.id)) {
                // Custom message for beta features
                let warningTitle = 'Yêu cầu khởi động lại';
                let warningMessage = 'Vui lòng <strong>tắt và mở lại Zalo</strong> để chức năng hoạt động.';
                
                if (item.id === 'auto_open') {
                    warningTitle = '⚠️ Tính năng Beta';
                    warningMessage = `
                        Vui lòng <strong>tắt và mở lại Zalo</strong> để chức năng hoạt động.<br><br>
                        <span style="color: #f59e0b; font-size: 13px;">
                            ⚡ <strong>Lưu ý:</strong> Tính năng này đang trong giai đoạn phát triển, 
                            có thể chưa hoạt động trơn tru.
                        </span>
                    `;
                }
                
                // Create notification popup
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--zalord-white-300);
                    color: var(--zalord-neutral-base);
                    padding: 24px;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    z-index: 999999;
                    min-width: 320px;
                    max-width: 400px;
                    text-align: center;
                    font-family: var(--zalord-popup-font-family);
                    animation: slideIn 0.3s ease-out;
                `;
                notification.innerHTML = `
                    <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                    <h3 style="margin: 0 0 12px 0; font-size: 18px; color: var(--zalord-neutral-base);">${warningTitle}</h3>
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: var(--zalord-neutral-500);">
                        ${warningMessage}
                    </p>
                `;
                document.body.appendChild(notification);

                // Auto remove after 2 seconds (or 4s for beta warning)
                const timeout = item.id === 'auto_open' ? 4000 : 2000;
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.style.animation = 'slideOut 0.3s ease-out';
                        setTimeout(() => notification.remove(), 300);
                    }
                }, timeout);
            }


            // Special handling for Input Customizer
            if (item.isInputCustomizer && window.ChatCustomizer) {
                if (!checked) {
                    // Tắt toggle chính → tắt TẤT CẢ sub-toggles
                    window.ChatCustomizer.set('msg_enable', false);
                    window.ChatCustomizer.set('header_enable', false);
                }
                // Removed auto-enable: User must manually enable sub-toggles
            }

            if (item.isFontInput) {
                const fontBox = switchItem.querySelector('.zalord-font-box');
                if (fontBox) fontBox.style.display = checked ? 'block' : 'none';
            }
        });

        if (toggleDetailsBtn) controlsDiv.appendChild(toggleDetailsBtn);
        controlsDiv.appendChild(switchWrapper);

        // Create header row (contains label + controls)
        const headerRow = document.createElement('div');
        headerRow.className = 'zalord-switch__header';
        headerRow.appendChild(label);
        headerRow.appendChild(controlsDiv);

        switchItem.appendChild(headerRow);

        // Expandable details
        if (item.hasExtra) {
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'zalord-details';

            let isExpanded = false;
            if (toggleDetailsBtn) {
                toggleDetailsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();



                    isExpanded = !isExpanded;
                    detailsDiv.classList.toggle('zalord-details--expanded', isExpanded);
                    toggleDetailsBtn.innerHTML = isExpanded ? '−' : '+';
                    toggleDetailsBtn.classList.toggle('zalord-expand-btn--expanded', isExpanded);
                });
            }

            // Background input
            if (item.hasBgInput) {
                const bgInput = document.createElement('input');
                bgInput.type = 'text';
                bgInput.className = 'zalord-input';
                bgInput.placeholder = 'Dán link ảnh background...';
                bgInput.value = GM_getValue('bg_custom_url', '');
                bgInput.addEventListener('change', (e) => updateBgUrl(e.target.value));
                detailsDiv.appendChild(bgInput);
            }

            // Blur slider
            if (item.hasBlurSlider) {
                const sliderGroup = document.createElement('div');
                sliderGroup.className = 'zalord-slider-group';
                const header = document.createElement('div');
                header.className = 'zalord-slider-header';
                header.innerHTML = `<span>Mức độ mờ</span><span id="blur-val">${GM_getValue('inactive_blur_val', 25)}%</span>`;
                const rng = document.createElement('input');
                rng.type = 'range';
                rng.className = 'zalord-slider';
                rng.min = '0';
                rng.max = '100';
                rng.value = GM_getValue('inactive_blur_val', 25);
                rng.addEventListener('input', (e) => {
                    document.getElementById('blur-val').textContent = e.target.value + '%';
                    updateInactiveBlur(e.target.value);
                });
                sliderGroup.appendChild(header);
                sliderGroup.appendChild(rng);
                detailsDiv.appendChild(sliderGroup);
            }

            // Opacity & Radius sliders
            if (item.hasSlider || item.hasRadiusSlider) {
                if (item.hasSlider) {
                    const sliderGroup = document.createElement('div');
                    sliderGroup.className = 'zalord-slider-group';
                    const header = document.createElement('div');
                    header.className = 'zalord-slider-header';
                    header.innerHTML = `<span>Độ trong suốt</span><span id="liq-val">${GM_getValue('liquid_opacity_val', 25)}%</span>`;
                    const rng = document.createElement('input');
                    rng.type = 'range';
                    rng.className = 'zalord-slider';
                    rng.min = '0';
                    rng.max = '100';
                    rng.value = GM_getValue('liquid_opacity_val', 25);
                    rng.addEventListener('input', (e) => {
                        document.getElementById('liq-val').textContent = e.target.value + '%';
                        updateOpacityVariable(e.target.value);
                    });
                    sliderGroup.appendChild(header);
                    sliderGroup.appendChild(rng);
                    detailsDiv.appendChild(sliderGroup);
                }
                if (item.hasRadiusSlider) {
                    const sliderGroup = document.createElement('div');
                    sliderGroup.className = 'zalord-slider-group';
                    const header = document.createElement('div');
                    header.className = 'zalord-slider-header';
                    header.innerHTML = `<span>Bo góc</span><span id="rad-val">${GM_getValue('liquid_radius_val', 36)}%</span>`;
                    const rng = document.createElement('input');
                    rng.type = 'range';
                    rng.className = 'zalord-slider';
                    rng.min = '0';
                    rng.max = '100';
                    rng.value = GM_getValue('liquid_radius_val', 36);
                    rng.addEventListener('input', (e) => {
                        document.getElementById('rad-val').textContent = e.target.value + '%';
                        updateLiquidRadius(e.target.value);
                    });
                    sliderGroup.appendChild(header);
                    sliderGroup.appendChild(rng);
                    detailsDiv.appendChild(sliderGroup);
                }
            }

            // Color picker
            if (item.hasColorPicker) {
                const colorGroup = document.createElement('div');
                colorGroup.className = 'zalord-color-picker-group';
                const label = document.createElement('span');
                label.className = 'zalord-color-picker-label';
                label.textContent = 'Màu Neon';
                const cp = document.createElement('input');
                cp.type = 'color';
                cp.className = 'zalord-color-picker';
                cp.value = GM_getValue('neon_color_val', '#ff0000');
                cp.addEventListener('input', (e) => updateNeonColor(e.target.value));
                colorGroup.appendChild(label);
                colorGroup.appendChild(cp);
                detailsDiv.appendChild(colorGroup);
            }

            // Input customizer
            if (item.isInputCustomizer) {
                const sectionTitle = document.createElement('div');
                sectionTitle.className = 'zalord-section-title';
                sectionTitle.textContent = 'Khung Nhập Liệu';
                detailsDiv.appendChild(sectionTitle);

                // Helper to create sections with toggle
                const createSection = (title, enableKey, contentFn) => {
                    const secDiv = document.createElement('div');
                    secDiv.className = 'zalord-chat-section'; // Reuse existing class or add new style
                    secDiv.style.marginTop = '12px';
                    secDiv.style.borderTop = '1px solid var(--zalord-border-light)';
                    
                    const head = document.createElement('div');
                    head.className = 'zalord-switch__header';
                    head.style.marginBottom = '8px';
                    head.style.paddingTop = '8px';
                    
                    const label = document.createElement('span');
                    label.className = 'zalord-switch__label';
                    label.textContent = title;
                    label.style.fontWeight = '600';
                    head.appendChild(label);

                    const toggle = document.createElement('input');
                    toggle.type = 'checkbox';
                    toggle.className = 'zalord-switch__input';
                    toggle.checked = GM_getValue(enableKey, false);
                    toggle.style.marginLeft = 'auto'; // Push to right
                    
                    // Custom switch UI
                    const switchLabel = document.createElement('label');
                    switchLabel.className = 'zalord-switch__checkbox';
                    const slider = document.createElement('span');
                    slider.className = 'zalord-switch__slider';
                    switchLabel.appendChild(toggle);
                    switchLabel.appendChild(slider);
                    head.appendChild(switchLabel);

                    toggle.onchange = (e) => {
                        GM_setValue(enableKey, e.target.checked);
                        updateInputStyleVars();
                        contentDiv.style.opacity = e.target.checked ? '1' : '0.5';
                        contentDiv.style.pointerEvents = e.target.checked ? 'auto' : 'none';
                    };

                    secDiv.appendChild(head);

                    const contentDiv = document.createElement('div');
                    contentDiv.style.transition = 'opacity 0.2s';
                    contentDiv.style.opacity = toggle.checked ? '1' : '0.5';
                    contentDiv.style.pointerEvents = toggle.checked ? 'auto' : 'none';
                    
                    contentFn(contentDiv);
                    secDiv.appendChild(contentDiv);
                    
                    detailsDiv.appendChild(secDiv);
                };

                // UNIFIED SECTION: KHUNG NHẬP LIỆU
                createSection('Tùy chỉnh', 'inp_enable', (container) => {
                   // 1. Background
                   const bgRow = document.createElement('div');
                   bgRow.className = 'zalord-control-row';
                   bgRow.innerHTML = '<span class="zalord-control-label">Màu nền:</span>';
                   
                   const bgColor = document.createElement('input');
                   bgColor.type = 'color';
                   bgColor.className = 'zalord-color-picker';
                   bgColor.value = GM_getValue('inp_bg_hex', '#ffffff');
                   bgColor.addEventListener('input', (e) => {
                       GM_setValue('inp_bg_hex', e.target.value);
                       updateInputStyleVars();
                   });
                   bgRow.appendChild(bgColor);
                   container.appendChild(bgRow);

                   const opacityGroup = document.createElement('div');
                   opacityGroup.className = 'zalord-slider-group';
                   const opHeader = document.createElement('div');
                   opHeader.className = 'zalord-slider-header';
                   opHeader.innerHTML = `<span>Độ mờ nền</span><span id="inp-op-val">${GM_getValue('inp_bg_opacity', 100)}%</span>`;
                   const opRng = document.createElement('input');
                   opRng.type = 'range';
                   opRng.className = 'zalord-slider';
                   opRng.min = '0';
                   opRng.max = '100';
                   opRng.value = GM_getValue('inp_bg_opacity', 100);
                   opRng.addEventListener('input', (e) => {
                       document.getElementById('inp-op-val').textContent = e.target.value + '%';
                       GM_setValue('inp_bg_opacity', e.target.value);
                       updateInputStyleVars();
                   });
                   opacityGroup.appendChild(opHeader);
                   opacityGroup.appendChild(opRng);
                   container.appendChild(opacityGroup);

                   // 2. Text Color
                   const textRow = document.createElement('div');
                   textRow.className = 'zalord-control-row';
                   textRow.style.marginTop = '8px';
                   textRow.innerHTML = '<span class="zalord-control-label">Màu chữ:</span>';
                   
                   const textColor = document.createElement('input');
                   textColor.type = 'color';
                   textColor.className = 'zalord-color-picker';
                   textColor.value = GM_getValue('inp_text_color', '#333333');
                   textColor.addEventListener('input', (e) => {
                       GM_setValue('inp_text_color', e.target.value);
                       updateInputStyleVars();
                   });
                   textRow.appendChild(textColor);
                   container.appendChild(textRow);

                   // 3. Font Style
                   const sizeRow = document.createElement('div');
                   sizeRow.className = 'zalord-control-row';
                   sizeRow.style.marginTop = '8px';
                   sizeRow.innerHTML = '<span class="zalord-control-label">Size chữ:</span>';
                   
                   const sizeInput = document.createElement('input');
                   sizeInput.type = 'number';
                   sizeInput.className = 'zalord-number-input';
                   sizeInput.min = '10';
                   sizeInput.max = '30';
                   sizeInput.value = GM_getValue('inp_size', 14);
                   sizeInput.addEventListener('change', (e) => {
                       GM_setValue('inp_size', e.target.value);
                       updateInputStyleVars();
                   });
                   sizeRow.appendChild(sizeInput);
                   container.appendChild(sizeRow);

                   const btnGroup = document.createElement('div');
                   btnGroup.className = 'zalord-btn-group';
                   btnGroup.style.marginTop = '8px';
                   
                   const createToggleBtn = (txt, key, styleVal) => {
                       const b = document.createElement('button');
                       b.className = 'zalord-toggle-btn';
                       b.textContent = txt;
                       const isActive = GM_getValue(key, false);
                       if (isActive) b.classList.add('zalord-toggle-btn--active');
                       if (styleVal === 'italic') b.style.fontStyle = 'italic';
                       if (txt === 'S') b.style.textDecoration = 'line-through';
                       b.onclick = () => {
                           const newVal = !GM_getValue(key, false);
                           GM_setValue(key, newVal);
                           b.classList.toggle('zalord-toggle-btn--active', newVal);
                           updateInputStyleVars();
                       };
                       return b;
                   };
                   btnGroup.appendChild(createToggleBtn('B', 'inp_bold', 'normal'));
                   btnGroup.appendChild(createToggleBtn('I', 'inp_italic', 'italic'));
                   btnGroup.appendChild(createToggleBtn('S', 'inp_strike', 'normal'));
                   container.appendChild(btnGroup);
                });

                // Chat customizer
                if (window.ChatCustomizer) {
                    const chatTitle = document.createElement('div');
                    chatTitle.className = 'zalord-section-title';
                    chatTitle.textContent = 'Tin nhắn và Header';
                    detailsDiv.appendChild(chatTitle);

                    const sectionToggles = {}; // Store toggle references

                    const createSection = (title, enableKey, contentFn) => {
                        const secDiv = document.createElement('div');
                        secDiv.className = 'zalord-chat-section';
                        secDiv.style.marginTop = '12px';
                        secDiv.style.borderTop = '1px solid var(--zalord-border-light)';
                        
                        const head = document.createElement('div');
                        head.className = 'zalord-switch__header';
                        head.style.marginBottom = '8px';
                        head.style.paddingTop = '8px';
                        
                        const label = document.createElement('span');
                        label.className = 'zalord-switch__label';
                        label.textContent = title;
                        label.style.fontWeight = '600';
                        head.appendChild(label);

                        const toggle = document.createElement('input');
                        toggle.type = 'checkbox';
                        toggle.className = 'zalord-switch__input';
                        toggle.checked = window.ChatCustomizer.get(enableKey);
                        toggle.style.marginLeft = 'auto';
                        
                        // Custom switch UI (slider)
                        const switchLabel = document.createElement('label');
                        switchLabel.className = 'zalord-switch__checkbox';
                        const slider = document.createElement('span');
                        slider.className = 'zalord-switch__slider';
                        switchLabel.appendChild(toggle);
                        switchLabel.appendChild(slider);
                        head.appendChild(switchLabel);

                        toggle.onchange = (e) => window.ChatCustomizer.set(enableKey, e.target.checked);
                        secDiv.appendChild(head);

                        // Store toggle reference
                        sectionToggles[enableKey] = toggle;

                        contentFn(secDiv);
                        detailsDiv.appendChild(secDiv);
                    };

                    const createColorRow = (label, key, enableKey) => {
                        const d = document.createElement('div');
                        d.className = 'zalord-control-row';
                        d.innerHTML = `<span class="zalord-control-label">${label}</span>`;
                        const cp = document.createElement('input');
                        cp.type = 'color';
                        cp.className = 'zalord-color-picker';
                        cp.value = window.ChatCustomizer.get(key);
                        cp.oninput = (e) => {
                            window.ChatCustomizer.set(key, e.target.value);
                        };
                        d.appendChild(cp);
                        return d;
                    };

                    const createStyleRow = (sizeKey, boldKey, italicKey, enableKey) => {
                        const d = document.createElement('div');
                        d.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-top: 8px;';
                        d.innerHTML = '<span class="zalord-control-label">Size:</span>';
                        const num = document.createElement('input');
                        num.type = 'number';
                        num.className = 'zalord-number-input';
                        num.value = window.ChatCustomizer.get(sizeKey);
                        num.onchange = (e) => {
                            window.ChatCustomizer.set(sizeKey, e.target.value);
                        };
                        d.appendChild(num);
                        const btnGroup = document.createElement('div');
                        btnGroup.className = 'zalord-btn-group';
                        const createBtn = (txt, key, styleVal) => {
                            const b = document.createElement('button');
                            b.className = 'zalord-toggle-btn';
                            b.textContent = txt;
                            const active = window.ChatCustomizer.get(key);
                            if (active) b.classList.add('zalord-toggle-btn--active');
                            if (styleVal === 'italic') b.style.fontStyle = 'italic';
                            b.onclick = () => {
                                const nv = !window.ChatCustomizer.get(key);
                                window.ChatCustomizer.set(key, nv);
                                b.classList.toggle('zalord-toggle-btn--active', nv);
                            };
                            return b;
                        };
                        if (boldKey) btnGroup.appendChild(createBtn('B', boldKey, 'normal'));
                        if (italicKey) btnGroup.appendChild(createBtn('I', italicKey, 'italic'));
                        d.appendChild(btnGroup);
                        return d;
                    };

                    createSection('Tin nhắn', 'msg_enable', (container) => {
                        container.appendChild(createColorRow('Màu nền:', 'msg_bg', 'msg_enable'));
                        const opGroup = document.createElement('div');
                        opGroup.className = 'zalord-slider-group';
                        const opHeader = document.createElement('div');
                        opHeader.className = 'zalord-slider-header';
                        opHeader.innerHTML = `<span>Trong suốt</span><span id="chat-op-val">${window.ChatCustomizer.get('msg_opacity')}%</span>`;
                        const rng = document.createElement('input');
                        rng.type = 'range';
                        rng.className = 'zalord-slider';
                        rng.min = 0;
                        rng.max = 100;
                        rng.value = window.ChatCustomizer.get('msg_opacity');
                        rng.oninput = (e) => {
                            window.ChatCustomizer.set('msg_opacity', e.target.value);
                            container.querySelector('#chat-op-val').textContent = e.target.value + '%';
                        };
                        opGroup.appendChild(opHeader);
                        opGroup.appendChild(rng);
                        container.appendChild(opGroup);
                        container.appendChild(createColorRow('Màu chữ:', 'msg_text', 'msg_enable'));
                        container.appendChild(createStyleRow('msg_size', 'msg_bold', 'msg_italic', 'msg_enable'));
                    });

                    createSection('Tiêu đề hội thoại', 'header_enable', (container) => {
                        container.appendChild(createColorRow('Màu tiêu đề:', 'header_color', 'header_enable'));
                        container.appendChild(createStyleRow('header_size', 'header_bold', 'header_italic', 'header_enable'));
                    });
                }
            }

            // Recent message customizer
            if (item.isRecentMsgCustomizer) {
                const createControlRow = (label, prefixKey, defColor, defBold) => {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'zalord-control-row';
                    wrapper.innerHTML = `<span class="zalord-control-label">${label}:</span>`;
                    const rightGroup = document.createElement('div');
                    rightGroup.className = 'zalord-control-group';

                    const cp = document.createElement('input');
                    cp.type = 'color';
                    cp.className = 'zalord-color-picker';
                    cp.value = GM_getValue(`${prefixKey}_color`, defColor);
                    cp.addEventListener('input', (e) => {
                        GM_setValue(`${prefixKey}_color`, e.target.value);
                        updateRecentMsgStyleVars();
                    });
                    rightGroup.appendChild(cp);

                    const num = document.createElement('input');
                    num.type = 'number';
                    num.className = 'zalord-number-input';
                    num.min = '10';
                    num.max = '20';
                    num.value = GM_getValue(`${prefixKey}_size`, 13);
                    num.addEventListener('change', (e) => {
                        GM_setValue(`${prefixKey}_size`, e.target.value);
                        updateRecentMsgStyleVars();
                    });
                    rightGroup.appendChild(num);

                    const btnGroup = document.createElement('div');
                    btnGroup.className = 'zalord-btn-group';
                    const createBtn = (txt, suffix, styleVal, isDefActive) => {
                        const b = document.createElement('button');
                        b.className = 'zalord-toggle-btn';
                        b.textContent = txt;
                        const isActive = GM_getValue(`${prefixKey}_${suffix}`, isDefActive);
                        if (isActive) b.classList.add('zalord-toggle-btn--active');
                        if (styleVal === 'italic') b.style.fontStyle = 'italic';
                        b.onclick = () => {
                            const newVal = !GM_getValue(`${prefixKey}_${suffix}`, isDefActive);
                            GM_setValue(`${prefixKey}_${suffix}`, newVal);
                            b.classList.toggle('zalord-toggle-btn--active', newVal);
                            updateRecentMsgStyleVars();
                        };
                        return b;
                    };
                    btnGroup.appendChild(createBtn('B', 'bold', 'normal', defBold));
                    btnGroup.appendChild(createBtn('I', 'italic', 'italic', false));
                    rightGroup.appendChild(btnGroup);
                    wrapper.appendChild(rightGroup);
                    return wrapper;
                };

                detailsDiv.appendChild(createControlRow('Đã xem', 'recent_msg', '#7589a3', false));
                detailsDiv.appendChild(createControlRow('Chưa xem', 'recent_unread', '#2196f3', true));
            }

            switchItem.appendChild(detailsDiv);
        }

        switchList.appendChild(switchItem);
    });

    settingsPanelBody.appendChild(switchList);
    settingsPanel.appendChild(settingsPanelBody);
    main.appendChild(settingsPanel);

    scrollable.appendChild(main);
    popup.appendChild(scrollable);



    // Footer: Zalord by TaoPhuong
    const footer = document.createElement('div');
    footer.className = 'zalord-popup__footer';
    footer.innerHTML = `
        <div style="font-size: 11px; color: var(--zalord-neutral-500);">
            Zalord by TaoPhuong
        </div>
    `;
    
    popup.appendChild(footer);

    popper.appendChild(popup);
    document.body.appendChild(popper);





    // Activation modal and related functions removed - premium system no longer exists

    // ============================================
    // 3. INTERACTIONS - SIDEBAR MENU ONLY
    // ============================================
    let isOpen = false;

    const togglePanel = () => {
        isOpen = !isOpen;
        if (isOpen) {
            popper.style.display = 'block';
            popper.style.opacity = '0';

            // Check if menu should be positioned on right side
            const isMenuRight = GM_getValue('menu_position_right', false);

            // Position menu full height at edge of screen
            popper.style.top = '0px';
            popper.style.bottom = '0px';
            popper.style.height = '100vh';

            // Position horizontally based on setting
            if (isMenuRight) {
                popper.style.right = '0px';
                popper.style.left = 'auto';
            } else {
                popper.style.left = '0px';
                popper.style.right = 'auto';
            }

            requestAnimationFrame(() => {
                popper.style.opacity = '1';
                popper.style.transform = 'scale(1)';
            });
        } else {
            popper.style.opacity = '0';
            popper.style.transform = 'scale(0.95)';
            setTimeout(() => {
                popper.style.display = 'none';
            }, 150);
        }
    };

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (isOpen && !popper.contains(e.target)) {
            togglePanel();
        }
    });

    // Hotkey handling
    document.addEventListener('keydown', (e) => {
        // Handle settings hotkey recording
        if (isRecordingSettingsKey) {
            if (e.key === 'Escape') {
                isRecordingSettingsKey = false;
                settingsHkBtn.textContent = getSettingsHotKeyText(currentSettingsHotKey);
                settingsHkBtn.style.borderColor = '';
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;

            const newConfig = {
                key: e.key.toLowerCase(),
                ctrl: e.ctrlKey,
                alt: e.altKey,
                shift: e.shiftKey
            };
            GM_setValue('settings_hotkey_config', newConfig);
            currentSettingsHotKey = newConfig;
            settingsHkBtn.textContent = getSettingsHotKeyText(newConfig);
            settingsHkBtn.style.borderColor = '';
            isRecordingSettingsKey = false;
            return;
        }

        // Handle menu hotkey recording
        if (isRecordingKey) {
            if (e.key === 'Escape') {
                isRecordingKey = false;
                hkBtn.textContent = getHotKeyText(currentHotKey);
                hkBtn.style.borderColor = '';
                hkBtn.style.color = 'transparent';
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;

            const newConfig = {
                key: e.key.toLowerCase(),
                ctrl: e.ctrlKey,
                alt: e.altKey,
                shift: e.shiftKey
            };
            GM_setValue('hotkey_config', newConfig);
            currentHotKey = newConfig;
            hkBtn.textContent = getHotKeyText(newConfig);
            hkBtn.style.borderColor = '';
            isRecordingKey = false;
            return;
        }

        const isMatch = (event, config) =>
            event.key.toLowerCase() === config.key.toLowerCase() &&
            event.ctrlKey === (config.ctrl || false) &&
            event.altKey === (config.alt || false) &&
            event.shiftKey === (config.shift || false);

        // Check settings hotkey (Ctrl+Alt+F1) - password protection removed
        if (isMatch(e, currentSettingsHotKey)) {
            e.preventDefault();
            // Directly toggle settings panel without password
            const isVisible = settingsCollapsiblePanel.style.display !== 'none';
            settingsCollapsiblePanel.style.display = isVisible ? 'none' : 'block';
            console.log('[Settings] Panel toggled');
            return;
        }

        // Menu toggle hotkey removed - use sidebar menu only
    });

    // ============================================
    // 4. INITIALIZE SIDEBAR MENU
    // ============================================
    console.log('[Zalord] Initializing sidebar menu...');
    injectSidebarMenu();


}
