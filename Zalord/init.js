/**
 * ═══════════════════════════════════════════════════════════════
 * Zalord Edition 3.6 - Enhanced Zalo Experience
 * ═══════════════════════════════════════════════════════════════
 * 
 * @module      init
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
// --- FILE: modules/init.js ---

// ============================================
// MIGRATION: Remove old default background URL
// ============================================
(function() {
    const oldDefaultUrl = 'https://i.postimg.cc/tTDQv9PK/anthony_delanoix_ur_Ud_KCxs_TUI_unsplash.jpg';
    const currentBgUrl = GM_getValue('bg_custom_url', '');
    
    if (currentBgUrl === oldDefaultUrl) {
        GM_setValue('bg_custom_url', '');
        console.log('[Zalord Migration] Removed old default background URL');
    }
})();

// Read Zalo's native theme setting
let savedTheme = 'dark'; // default to dark
try {
    const zaloTheme = JSON.parse(localStorage.getItem('za_theme') || '{}');
    if (zaloTheme.theme === 'light' || zaloTheme.theme === 'dark') {
        savedTheme = zaloTheme.theme;
    }
} catch (e) {
    console.warn('[Init] Could not read za_theme, using default dark');
}

// Apply .dark class to body for instant theme
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
} else {
    document.body.classList.remove('dark');
}

// Sync Zalord menu theme (SAME as Zalo's theme, not inverted)
const menuTheme = savedTheme; // Changed from inverted logic
document.documentElement.setAttribute('data-zalord-theme', menuTheme);
GM_setValue('zalord_theme', menuTheme);

// Initialize theme_mode if not set (for new 3-option system)
if (!GM_getValue('theme_mode')) {
    GM_setValue('theme_mode', savedTheme); // Default to current theme
}

injectSVG();
GM_addStyle(GLOBAL_VARS);
GM_addStyle(CSS_GOOGLE_FONT); // ← Inject Google Font CSS
console.log("-> Kích hoạt Module Zalo Ultimate...");
console.log(`-> Theme: ${savedTheme} (synced with Zalo)`);
loadSettings();
createControlPanel();