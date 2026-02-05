// --- FILE: modules/auto-open.js ---
(function () {
    'use strict';

    // 0. CHỐT CHẶN ON/OFF
    if (!GM_getValue('auto_open', false)) return;

    console.log("%c [MODULE] Auto Open Message: ACTIVATED (Smart Mode)", "color: #fff; background: #e74c3c; font-weight: bold; padding: 5px;");

    // 1. HÀM CHECK TẮT THÔNG BÁO (MUTE)
    const isConversationMuted = (convItem) => {
        if (!convItem) return false;

        // Check 1: Class mute trên container (giữ lại phòng hờ phiên bản cũ)
        if (convItem.classList.contains('mute') || convItem.classList.contains('--noti-disable')) return true;

        // Check 2: TÌM ICON "Notif_Off" (Dựa trên ảnh ông gửi: fa-Notif_Off_24_Fill)
        // Dùng selector [class*="..."] để bắt tất cả các biến thể (Fill, Line, 16px, 24px...)
        const muteIcon = convItem.querySelector('[class*="Notif_Off"]');

        // Check 3: Chặn luôn tin nhắn từ "Cộng đồng" (Community) để tránh spam
        // (Trong ảnh dòng số 2, 7, 9 có icon Community)
        const communityIcon = convItem.querySelector('[class*="Community"]');

        return !!muteIcon || !!communityIcon;
    };

    // 2. HÀM CLICK MỞ CHAT
    const triggerOpenChat = (convItem, id) => {
        if (convItem) {
            console.log(`%c 🚀 Auto Open: Phát hiện tin mới (${id}) -> JUMP!`, "color: yellow; font-weight: bold;");

            convItem.click();

            const clickEvent = new MouseEvent('click', {
                view: window, bubbles: true, cancelable: true
            });
            convItem.dispatchEvent(clickEvent);

            if (convItem.scrollIntoView) {
                convItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // 3. OBSERVER
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const target = mutation.target;

            // Hàm check badge đỏ
            const isUnreadBadge = (node) => {
                if (!node || node.nodeType !== 1) return false;
                return node.matches('.z-noti-badge') ||
                    node.matches('.z-noti-badge.--counter') ||
                    node.classList.contains('markUnread') ||
                    node.classList.contains('func-unread');
            };

            let convItem = null;

            // A. Trường hợp thêm mới (Badge mới xuất hiện)
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (isUnreadBadge(node)) {
                        convItem = node.closest('.conv-item') || node.closest('[id^="group-item"]') || node.closest('[id^="conv-item"]');
                    }
                    else if (node.querySelector && (node.querySelector('.z-noti-badge') || node.querySelector('.markUnread'))) {
                        convItem = node.closest('.conv-item') || node;
                    }
                });
            }

            // B. Trường hợp thay đổi thuộc tính (Ẩn/Hiện badge)
            if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
                if (isUnreadBadge(target)) {
                    const style = window.getComputedStyle(target);
                    if (style.display !== 'none' && style.visibility !== 'hidden') {
                        convItem = target.closest('.conv-item') || target.closest('[id^="group-item"]');
                    }
                }
            }

            // --- XỬ LÝ CLICK ---
            if (convItem) {
                // [QUAN TRỌNG] BỘ LỌC TẮT THÔNG BÁO
                if (isConversationMuted(convItem)) {
                    // console.log("🔇 Bỏ qua tin nhắn từ hội thoại đã tắt thông báo");
                    return;
                }

                // Chỉ mở nếu đang không chọn nó
                if (!convItem.classList.contains('selected')) {
                    const convId = convItem.id;
                    triggerOpenChat(convItem, convId);
                }
            }
        });
    });

    // 4. KHỞI ĐỘNG
    const start = () => {
        const list = document.querySelector('#conversationListId') ||
            document.querySelector('.virtualized-scroll') ||
            document.querySelector('#item-list-container');

        if (list) {
            console.log("-> [Auto Open] Đã bắt được danh sách chat!");
            observer.observe(list, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'style'] });
        } else {
            console.log("-> [Auto Open] Đang tìm danh sách...");
            setTimeout(start, 500);
        }
    };

    start();

})();