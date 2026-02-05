/**
 * ZALORD MAIN PROCESS - CSP BYPASS (CRITICAL)
 * Chỉ bypass CSP cho Google Fonts, KHÔNG bypass cho tất cả request
 */

const { app, session } = require('electron');

// Hàm xóa CSP Header CHỈ cho Google Fonts
const bypassCSP = (details, callback) => {
    const url = details.url || '';
    const responseHeaders = Object.assign({}, details.responseHeaders);

    // CRITICAL FIX: CHỈ bypass CSP nếu là Google Fonts
    const isGoogleFonts = url.includes('fonts.googleapis.com') ||
        url.includes('fonts.gstatic.com');

    if (!isGoogleFonts) {
        // Không phải Google Fonts → Giữ nguyên headers (bao gồm CSP)
        callback({ cancel: false, responseHeaders: responseHeaders });
        return;
    }

    // Là Google Fonts → Xóa CSP để load được font
    const headersToRemove = [
        'content-security-policy',
        'x-content-security-policy',
        'x-webkit-csp',
        'content-security-policy-report-only'
    ];

    headersToRemove.forEach(header => {
        if (responseHeaders[header]) delete responseHeaders[header];

        Object.keys(responseHeaders).forEach(k => {
            if (k.toLowerCase() === header) delete responseHeaders[k];
        });
    });

    callback({ cancel: false, responseHeaders: responseHeaders });
};

app.whenReady().then(() => {
    console.log('[Zalord] Đang setup CSP bypass cho Google Fonts...');

    const partitions = [
        'persist:zalo',
        'persist:zalo_chat_webview',
        'persist:webviewsession'
    ];

    partitions.forEach(p => {
        try {
            session.fromPartition(p).webRequest.onHeadersReceived(
                // CHỈ intercept Google Fonts URLs
                { urls: ['*://fonts.googleapis.com/*', '*://fonts.gstatic.com/*'] },
                bypassCSP
            );
        } catch (e) { }
    });

    // Session Mặc định
    session.defaultSession.webRequest.onHeadersReceived(
        // CHỈ intercept Google Fonts URLs
        { urls: ['*://fonts.googleapis.com/*', '*://fonts.gstatic.com/*'] },
        bypassCSP
    );

    console.log('[Zalord] ✅ CSP bypass chỉ cho Google Fonts. Ready!');
});