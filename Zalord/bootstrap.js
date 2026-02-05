/**
 * ═══════════════════════════════════════════════════════════════
 * Zalord Edition 3.6 - Enhanced Zalo Experience
 * ═══════════════════════════════════════════════════════════════
 * 
 * @module      bootstrap (CSP Bypass)
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

const { app, session } = require('electron');

// Hàm xóa CSP Header (Lính canh cửa)
const bypassCSP = (details, callback) => {
    const responseHeaders = Object.assign({}, details.responseHeaders);
    
    // Danh sách các header cần tiêu diệt
    const headersToRemove = [
        'content-security-policy',
        'x-content-security-policy',
        'x-webkit-csp',
        'content-security-policy-report-only'
    ];

    headersToRemove.forEach(header => {
        // Xóa header thường
        if (responseHeaders[header]) delete responseHeaders[header];
        
        // Xóa header viết hoa/thường lẫn lộn
        Object.keys(responseHeaders).forEach(k => {
            if (k.toLowerCase() === header) delete responseHeaders[k];
        });
    });

    callback({ cancel: false, responseHeaders: responseHeaders });
};

app.whenReady().then(() => {
    console.log('[Zalord] Đang bẻ khóa CSP để load Google Fonts...');

    const partitions = [
        'persist:zalo',               // Partition chính
        'persist:zalo_chat_webview',  // Partition webview chat
        'persist:webviewsession'      // Partition phụ
    ];

    partitions.forEach(p => {
        try {
            session.fromPartition(p).webRequest.onHeadersReceived(
                { urls: ['*://*/*'] }, 
                bypassCSP
            );
        } catch (e) {}
    });

    // Session Mặc định
    session.defaultSession.webRequest.onHeadersReceived(
        { urls: ['*://*/*'] }, 
        bypassCSP
    );

    console.log('[Zalord] ✅ Đã bẻ khóa thành công. Ready!');
});