/**
 * ═══════════════════════════════════════════════════════════════
 * Zalord Edition 3.6 - Enhanced Zalo Experience
 * ═══════════════════════════════════════════════════════════════
 * 
 * @module      logic
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
// --- FILE: modules/logic.js ---
function injectSVG() {
    if (!document.getElementById('zalo-liquid-svg')) {
        const div = document.createElement('div');
        div.id = 'zalo-liquid-svg';
        div.innerHTML = SVG_CONTENT;
        div.style.cssText = "position:absolute; top:0; left:0; z-index:-9999;";
        (document.head || document.documentElement).appendChild(div);
    }
}

// ✅ Helper function: Convert hex color to RGB array
function hexToRGB(hex) {
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return null;
    let c = hex.substring(1).split('');
    if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    c = parseInt(c.join(''), 16);
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
}

function toggleStyle(id, css, isEnabled) {
    const styleId = `zalo-style-${id}`;
    let styleEl = document.getElementById(styleId);
    if (isEnabled) {
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            styleEl.textContent = css;
            document.head.appendChild(styleEl);
        }
    } else {
        if (styleEl) styleEl.remove();
    }
}


// ✅ Consolidated style updater functions into single object
const StyleUpdater = {
    opacity: (valuePercent) => {
        document.documentElement.style.setProperty('--item-opacity', valuePercent / 100);
        GM_setValue('liquid_opacity_val', valuePercent);
    },
    bgUrl: (url) => {
        if (url && url.trim() !== '') {
            document.documentElement.style.setProperty('--bg-image-url', `url('${url}')`);
            GM_setValue('bg_custom_url', url);
        }
    },
    liquidRadius: (val) => {
        document.documentElement.style.setProperty('--liquid-radius', `${Math.floor((val / 100) * 50)}px`);
        GM_setValue('liquid_radius_val', val);
    },
    inactiveBlur: (val) => {
        document.documentElement.style.setProperty('--inactive-blur-amount', `${(val / 100) * 10}px`);
        GM_setValue('inactive_blur_val', val);
    }
};

// Backward compatibility - keep old function names
function updateOpacityVariable(valuePercent) { StyleUpdater.opacity(valuePercent); }
function updateBgUrl(url) { StyleUpdater.bgUrl(url); }
function updateLiquidRadius(val) { StyleUpdater.liquidRadius(val); }
function updateInactiveBlur(val) { StyleUpdater.inactiveBlur(val); }


function updateNeonColor(hexColor) {
    const rgb = hexToRGB(hexColor);
    if (rgb) {
        const rgbStr = rgb.join(',');
        document.documentElement.style.setProperty('--neon-rgb', rgbStr);
        GM_setValue('neon_color_val', hexColor);
    }
}

function updateInputStyleVars() {
    // Check BOTH main toggle (input_style) AND sub-toggle (inp_enable)
    if (GM_getValue('input_style', false) && GM_getValue('inp_enable', false)) {
        // 1. Background
        const hex = GM_getValue('inp_bg_hex', '#ffffff');
        const opacityPercent = GM_getValue('inp_bg_opacity', 100);
        
        const rgb = hexToRGB(hex);
        let r = 255, g = 255, b = 255;
        if (rgb) {
            [r, g, b] = rgb;
        }
        const rgba = `rgba(${r}, ${g}, ${b}, ${opacityPercent / 100})`;
        document.documentElement.style.setProperty('--input-bg-color', rgba);

        // 2. Text Color
        document.documentElement.style.setProperty('--input-text-color', GM_getValue('inp_text_color', '#333333'));

        // 3. Font Style
        document.documentElement.style.setProperty('--input-font-size', GM_getValue('inp_size', '14') + 'px');
        document.documentElement.style.setProperty('--input-font-weight', GM_getValue('inp_bold', false) ? 'bold' : 'normal');
        document.documentElement.style.setProperty('--input-font-style', GM_getValue('inp_italic', false) ? 'italic' : 'normal');
        document.documentElement.style.setProperty('--input-text-decoration', GM_getValue('inp_strike', false) ? 'line-through' : 'none');
        
        // 4. Inject CSS (CRITICAL: Only when both toggles are on)
        const styleId = 'zalord-input-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .chat-input-container, #chatInput { background-color: var(--input-bg-color) !important; transition: all 0.3s ease; border-radius: 12px; }
                #richInput, .chat-input__content { color: var(--input-text-color) !important; font-size: var(--input-font-size) !important; font-weight: var(--input-font-weight) !important; font-style: var(--input-font-style) !important; text-decoration: var(--input-text-decoration) !important; }
                #richInput:empty::before { color: rgba(150,150,150,0.7); }
            `;
            document.head.appendChild(style);
        }
    } else {
        // Revert all to default
        document.documentElement.style.removeProperty('--input-bg-color');
        document.documentElement.style.removeProperty('--input-text-color');
        document.documentElement.style.removeProperty('--input-font-size');
        document.documentElement.style.removeProperty('--input-font-weight');
        document.documentElement.style.removeProperty('--input-font-style');
        document.documentElement.style.removeProperty('--input-text-decoration');
        
        // Remove injected CSS
        const styleId = 'zalord-input-style';
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
            existingStyle.remove();
        }
    }
}

function updateRecentMsgStyleVars() {
    const docStyle = document.documentElement.style;
    docStyle.setProperty('--recent-msg-color', GM_getValue('recent_msg_color', '#7589a3'));
    docStyle.setProperty('--recent-msg-size', GM_getValue('recent_msg_size', '13') + 'px');
    docStyle.setProperty('--recent-msg-weight', GM_getValue('recent_msg_bold', false) ? 'bold' : 'normal');
    docStyle.setProperty('--recent-msg-style', GM_getValue('recent_msg_italic', false) ? 'italic' : 'normal');
    docStyle.setProperty('--recent-unread-color', GM_getValue('recent_unread_color', '#2196f3'));
    docStyle.setProperty('--recent-unread-size', GM_getValue('recent_unread_size', '13') + 'px');
    docStyle.setProperty('--recent-unread-weight', GM_getValue('recent_unread_bold', true) ? 'bold' : 'normal');
    docStyle.setProperty('--recent-unread-style', GM_getValue('recent_unread_italic', false) ? 'italic' : 'normal');
}

function loadSettings() {
    // Load all settings without premium checks - all features are free
    SETTINGS.forEach(item => {
        toggleStyle(item.id, item.css, GM_getValue(item.id, item.default));
    });

    updateOpacityVariable(GM_getValue('liquid_opacity_val', 25));
    updateNeonColor(GM_getValue('neon_color_val', '#ff0000'));
    updateBgUrl(GM_getValue('bg_custom_url', ''));
    updateLiquidRadius(GM_getValue('liquid_radius_val', 36));
    updateInactiveBlur(GM_getValue('inactive_blur_val', 25));

    // Always load input/recent styles - no premium restrictions
    updateInputStyleVars();
    updateRecentMsgStyleVars();
}