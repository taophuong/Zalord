// --- FILE: modules/ghost-mode.js ---
(function () {
    'use strict';

    console.log("%c [MODULE] Ghost Mode: ACTIVATED", "color: #00e676; font-weight: bold;");

    // DANH SÁCH API CẦN TRẤN ÁP
    const API_MAP = {
        typing: '/api/message/typing',
        seen: '/api/message/seenv2',
        delivered: '/api/message/deliveredv2'
    };

    // Hàm tạo phản hồi GIẢ (Fake Response) - Cực quan trọng cho tính năng "Đã nhận"
    const fakeResponse = () => {
        return Promise.resolve(new Response(JSON.stringify({
            error_code: 0,
            data: {},
            msg: "Success"
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
    };

    // 1. CAN THIỆP FETCH (Giao thức chính của Zalo Web)
    const originalFetch = window.fetch;
    window.fetch = function (input, init) {
        const url = (typeof input === 'string') ? input : (input.url || '');

        // CRITICAL FIX: Chỉ intercept các API cụ thể, BỎ QUA tất cả request khác
        // Nếu URL không chứa API cần chặn → Cho phép ngay lập tức
        const isTargetAPI = url.includes(API_MAP.typing) ||
            url.includes(API_MAP.seen) ||
            url.includes(API_MAP.delivered);

        if (!isTargetAPI) {
            // Không phải API cần chặn → Cho qua ngay (bao gồm upload ảnh)
            return originalFetch.apply(this, arguments);
        }

        // Kiểm tra GM_getValue có tồn tại không (phòng khi polyfill chưa load)
        if (typeof GM_getValue !== 'function') {
            return originalFetch.apply(this, arguments);
        }

        // 1. Chặn "Đang soạn tin"
        if (GM_getValue('block_typing', false) && url.includes(API_MAP.typing)) {
            // console.log("👻 Blocked: Typing");
            return fakeResponse();
        }

        // 2. Chặn "Đã xem"
        if (GM_getValue('block_seen', false) && url.includes(API_MAP.seen)) {
            // console.log("👻 Blocked: Seen");
            return fakeResponse();
        }

        // 3. Chặn "Đã nhận" (Ninja Mode)
        if (GM_getValue('block_delivered', false) && url.includes(API_MAP.delivered)) {
            console.log("👻 Blocked: Delivered (Fake Success sent)");
            return fakeResponse();
        }

        return originalFetch.apply(this, arguments);
    };

    // 2. CAN THIỆP XMLHttpRequest (Dự phòng)
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (typeof url === 'string') {
            // CRITICAL FIX: Chỉ đánh dấu block nếu là target API
            const isTargetAPI = url.includes(API_MAP.typing) ||
                url.includes(API_MAP.seen) ||
                url.includes(API_MAP.delivered);

            this._shouldBlock = false;

            if (isTargetAPI && typeof GM_getValue === 'function') {
                if (GM_getValue('block_typing', false) && url.includes(API_MAP.typing)) this._shouldBlock = true;
                if (GM_getValue('block_seen', false) && url.includes(API_MAP.seen)) this._shouldBlock = true;
                if (GM_getValue('block_delivered', false) && url.includes(API_MAP.delivered)) this._shouldBlock = true;
            }
        }
        return originalOpen.apply(this, arguments);
    };

    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        if (this._shouldBlock) {
            // Giả vờ thành công với XHR
            // Sử dụng defineProperty với writable: true để có thể override
            try {
                Object.defineProperty(this, 'status', { value: 200, writable: true, configurable: true });
                Object.defineProperty(this, 'responseText', { value: '{"error_code":0,"msg":"Success"}', writable: true, configurable: true });
                Object.defineProperty(this, 'readyState', { value: 4, writable: true, configurable: true });

                // Trigger các event handlers đúng cách
                if (this.onreadystatechange) this.onreadystatechange();
                if (this.onload) this.onload();
                if (this.addEventListener) {
                    this.dispatchEvent(new Event('readystatechange'));
                    this.dispatchEvent(new Event('load'));
                }
            } catch (e) {
                console.warn('[Ghost Mode] XHR blocking error:', e);
            }
            return;
        }
        return originalSend.apply(this, arguments);
    };

})();