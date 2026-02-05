// --- FILE: modules/custom-reaction.js (FULL OPTION V2) ---
(function () {
    'use strict';

    console.log('%c [CUSTOM REACTION] Module script loaded!', 'color: cyan; font-weight: bold;');

    // 0. CHỐT CHẶN ON/OFF
    const settingValue = GM_getValue('custom_reaction', false);
    console.log('%c [CUSTOM REACTION] Setting value:', 'color: yellow;', settingValue);

    if (!settingValue) {
        console.log('%c [CUSTOM REACTION] Module is OFF - exiting', 'color: orange;');
        return;
    }

    console.log("%c [MODULE] Custom Reaction: ACTIVATED", "color: #e67e22; font-weight: bold;");

    // ================= 1. DỮ LIỆU & CẤU HÌNH =================
    const settings = { isRecently: false };
    const reactions = [
        { type: 100, icon: "👏", name: "clap", bgPos: "80% 12.5%" },
        { type: 101, icon: "🎉", name: "huh", bgPos: "74% 62.5%" },
        { type: 102, icon: "🎨", name: "send_custom", bgPos: "84% 82.5%" },
    ];

    const emojiCategories = {
        "Smileys": ["😀", "🗣️", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥱", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤡", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😮‍💨", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥"],
        "Gestures": ["👋", "🤚", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏"],
        "People": ["👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👩‍🦱", "🧑‍🦱", "👨‍🦱", "👩‍🦰", "🧑‍🦰", "👨‍🦰", "👱‍♀️", "👱", "👱‍♂️", "👩‍🦳", "🧑‍🦳", "👨‍🦳", "👩‍🦲", "🧑‍🦲", "👨‍🦲", "🧔‍♀️", "🧔", "🧔‍♂️"],
        "Animals": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞"],
        "Food": ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🫑", "🌽", "🥕", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙"],
        "Activities": ["⚽️", "🏀", "🏈", "⚾️", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳️", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸", "🥌", "🎿"],
        "Objects": ["⌚️", "📱", "💻", "⌨️", "🖥", "🖱", "🖨", "🕹", "🗜", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽", "🎞", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛", "🧭", "⏱", "⏲", "⏰", "🕰"],
        "Symbols": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "🆔", "⚛️"],
        "Other": ["❓", "❌", "🔞", "🔕", "☠️", "❎", "♻️", "💯", "💤", "🆘", "🆗", "🆙", "🏳️‍🌈", "🇻🇳", "👀", "🙏", "✅", "🆑", "🔥", "⚡", "✨", "❄️", "📌", "🔍", "📈", "📉", "📥", "📤", "🛠", "⚰️", "🛌", "♠️", "♣️", "♥️", "♦️", "🔇", "♻️"]
    };

    // ================= 2. QUẢN LÝ REACTION GẦN ĐÂY =================
    const RecentlyReaction = {
        add: function (reaction) {
            const emojiCustom = {
                type: simpleHash(reaction),
                icon: reaction,
                name: reaction,
                class: "emoji-sizer emoji-outer",
                bgPos: "0% 0%",
            };
            if (settings.isRecently) reactions[reactions.length - 1] = emojiCustom;
            else reactions.push(emojiCustom);
            settings.isRecently = true;
            localStorage.setItem("recentlyCustomReaction", JSON.stringify(emojiCustom));
        },
        load: function () {
            const reaction = localStorage.getItem("recentlyCustomReaction");
            if (reaction) {
                settings.isRecently = true;
                reactions.push(JSON.parse(reaction));
            }
        }
    };

    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    // ================= 3. UI HELPER (EMOJI PICKER & POPUP) =================
    const createEmojiPicker = () => {
        const picker = document.createElement("div");
        picker.id = "emoji-picker";
        picker.style.cssText = `position: absolute; bottom: calc(100% + 10px); right: 0; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); padding: 8px; z-index: 10000; animation: fadeIn 0.2s ease-out; width: 280px; max-height: 350px; overflow: hidden; display: flex; flex-direction: column;`;

        const tabsContainer = document.createElement("div");
        tabsContainer.style.cssText = `display: flex; overflow-x: auto; padding-bottom: 5px; margin-bottom: 5px; border-bottom: 1px solid #eee; gap: 4px; scrollbar-width: none; -ms-overflow-style: none; height: 36px; min-height: 36px; align-items: center;`;

        // Hide scrollbar style
        const style = document.createElement('style');
        style.textContent = `#emoji-picker div::-webkit-scrollbar { display: none; } .emoji-category-tab { display: flex; align-items: center; justify-content: center; height: 28px; width: 28px; }`;
        document.head.appendChild(style);

        const emojiContent = document.createElement("div");
        emojiContent.style.cssText = `overflow-y: auto; display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; padding-right: 4px; max-height: 240px;`;

        Object.keys(emojiCategories).forEach((category, idx) => {
            const tab = document.createElement("button");
            tab.className = "emoji-category-tab";
            const categoryIcons = { "Smileys": "😀", "Gestures": "👍", "People": "👨", "Animals": "🐱", "Food": "🍔", "Activities": "⚽️", "Objects": "📱", "Symbols": "❤️", "Other": "❗" };
            tab.textContent = categoryIcons[category] || category.slice(0, 1);
            tab.title = category;
            tab.style.cssText = `background: ${idx === 0 ? '#e3f2fd' : 'transparent'}; border: none; border-radius: 6px; padding: 0; cursor: pointer; font-size: 16px; min-width: 28px; min-height: 28px; text-align: center; transition: background-color 0.2s; flex-shrink: 0;`;

            tab.addEventListener("click", () => {
                picker.querySelectorAll(".emoji-category-tab").forEach(t => t.style.background = "transparent");
                tab.style.background = "#e3f2fd";
                emojiContent.innerHTML = "";
                emojiCategories[category].forEach(emoji => {
                    const emojiButton = document.createElement("button");
                    emojiButton.className = "emoji-button";
                    emojiButton.textContent = emoji;
                    emojiButton.style.cssText = `background: none; border: none; cursor: pointer; font-size: 18px; padding: 4px; border-radius: 4px; transition: background-color 0.2s, transform 0.2s;`;
                    emojiButton.onmouseover = () => { emojiButton.style.backgroundColor = "#f0f0f0"; emojiButton.style.transform = "scale(1.1)"; };
                    emojiButton.onmouseout = () => { emojiButton.style.backgroundColor = "transparent"; emojiButton.style.transform = "scale(1)"; };
                    emojiContent.appendChild(emojiButton);
                });
            });
            tabsContainer.appendChild(tab);
        });

        picker.appendChild(tabsContainer);
        picker.appendChild(emojiContent);

        setTimeout(() => { const firstTab = picker.querySelector(".emoji-category-tab"); if (firstTab) firstTab.click(); }, 0);

        // Auto hide on click outside
        document.addEventListener("click", (e) => {
            if (picker.style.display === "flex" && !picker.contains(e.target) && e.target.id !== "emoji-button") {
                picker.style.display = "none";
            }
        });
        picker.style.display = "none";
        return picker;
    };

    const createTextInputPopup = () => {
        if (document.getElementById('custom-text-reaction-popup')) {
            return window.textInputPopupInstance; // Return existing instance
        }

        const popup = document.createElement("div");
        popup.id = "custom-text-reaction-popup";
        popup.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.25); padding: 20px; z-index: 9999; display: none; flex-direction: column; gap: 15px; min-width: 300px; font-family: 'Segoe UI', sans-serif; animation: fadeIn 0.2s ease-out;`;

        popup.innerHTML = `<div style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 5px;">Tùy chỉnh reaction</div>`;

        const inputContainer = document.createElement("div");
        inputContainer.style.cssText = "position: relative;";

        const input = document.createElement("input");
        input.type = "text"; input.id = "custom-text-reaction-input"; input.placeholder = "Nhập nội dung reaction..."; input.maxLength = 20;
        input.style.cssText = `padding: 10px 12px; padding-right: 40px; border: 2px solid #e0e0e0; border-radius: 8px; width: 100%; box-sizing: border-box; font-size: 14px; transition: border-color 0.2s; outline: none;`;
        input.addEventListener("focus", () => input.style.borderColor = "#2196F3");
        input.addEventListener("blur", () => input.style.borderColor = "#e0e0e0");

        const emojiButton = document.createElement("button");
        emojiButton.id = "emoji-button"; emojiButton.textContent = "😊";
        emojiButton.style.cssText = `position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 18px; cursor: pointer; padding: 0; opacity: 0.7; transition: opacity 0.2s, transform 0.2s;`;
        emojiButton.onmouseover = () => { emojiButton.style.opacity = "1"; emojiButton.style.transform = "translateY(-50%) scale(1.1)"; };
        emojiButton.onmouseout = () => { emojiButton.style.opacity = "0.7"; emojiButton.style.transform = "translateY(-50%) scale(1)"; };

        const emojiPicker = createEmojiPicker();
        emojiButton.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); emojiPicker.style.display = (emojiPicker.style.display === "none" || emojiPicker.style.display === "") ? "flex" : "none"; });

        const charCounter = document.createElement("div");
        charCounter.style.cssText = "position: absolute; right: 10px; bottom: -18px; font-size: 11px; color: #999;";
        charCounter.textContent = "0/20";
        input.addEventListener("input", () => charCounter.textContent = `${input.value.length}/20`);

        emojiPicker.addEventListener("click", (e) => {
            if (e.target.classList.contains("emoji-button")) {
                input.value += e.target.textContent;
                charCounter.textContent = `${input.value.length}/20`;
                emojiPicker.style.display = "none";
                input.focus();
            }
        });

        inputContainer.appendChild(input);
        inputContainer.appendChild(emojiButton);
        inputContainer.appendChild(charCounter);
        inputContainer.appendChild(emojiPicker);

        const buttonContainer = document.createElement("div");
        buttonContainer.style.cssText = "display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;";

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Hủy";
        cancelButton.style.cssText = `padding: 8px 16px; border: none; border-radius: 6px; background-color: #f5f5f5; color: #333; font-weight: 500; cursor: pointer;`;
        cancelButton.onclick = () => hidePopup();

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Gửi";
        confirmButton.style.cssText = `padding: 8px 16px; border: none; border-radius: 6px; background-color: #2196F3; color: white; font-weight: 500; cursor: pointer;`;

        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(confirmButton);
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") confirmButton.click(); });

        popup.appendChild(inputContainer);
        popup.appendChild(buttonContainer);

        const overlay = document.createElement("div");
        overlay.id = "custom-reaction-overlay";
        overlay.style.cssText = `position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 9998; display: none; animation: fadeIn 0.2s ease-out;`;
        overlay.onclick = () => hidePopup();

        const hidePopup = () => { popup.style.display = "none"; overlay.style.display = "none"; emojiPicker.style.display = "none"; };

        document.body.appendChild(popup);
        document.body.appendChild(overlay);

        const instance = {
            popup, input, confirmButton,
            show: () => { popup.style.display = "flex"; overlay.style.display = "block"; input.value = ""; charCounter.textContent = "0/20"; input.focus(); },
            hide: hidePopup
        };
        window.textInputPopupInstance = instance;
        return instance;
    };

    // ================= 4. INJECT CSS =================
    const injectStyles = () => {
        const style = document.createElement("style");
        style.textContent = `
            .message-reaction-container-v2 .emoji-list-wrapper.hide-elist { 
                left: calc(50% + 500px) !important; 
                max-width: 90vw !important;
            }
            .reaction-emoji-list { display: flex !important; width: fit-content !important; gap: 2px !important; border-radius: 28px !important; background-color: white !important; box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important; }
            .reaction-emoji-icon { display: flex !important; align-items: center !important; justify-content: center !important; font-size: 20px !important; border-radius: 50% !important; cursor: pointer !important; background-color: rgba(240, 240, 240, 0.5) !important; width: 32px; height: 32px; transition: transform 0.2s; }
            .reaction-emoji-icon:hover { transform: scale(1.2) !important; background-color: #e3f2fd !important; }
            .text-reaction { background-color: #e3f2fd; border-radius: 12px; padding: 3px 10px; font-size: 12px; font-weight: 600; color: #1976d2; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            [data-custom="true"]::after { content: ''; position: absolute; bottom: 0; right: 0; width: 6px; height: 6px; background: #2196F3; border-radius: 50%; }
        `;
        document.head.appendChild(style);
    };

    // ================= 5. CORE LOGIC (SEND REACTION) =================
    function sendReaction(wrapper, id, react) {
        const getReactFiber = el => { for (const k in el) if (k.startsWith("__react")) return el[k]; return null; };

        let fiber = getReactFiber(wrapper);
        let sent = false;
        if (fiber) {
            let limit = 0;
            while (fiber && limit < 20) {
                if (fiber.memoizedProps?.sendReaction) {
                    fiber.memoizedProps.sendReaction({ rType: react.type, rIcon: react.icon });
                    id && updateBtn(id, react);
                    sent = true; break;
                }
                fiber = fiber.return; limit++;
            }
        }
        if (!sent && window.S?.default?.reactionMsgInfo) {
            const msg = wrapper.closest(".msg-item");
            const msgFiber = msg && getReactFiber(msg);
            msgFiber?.memoizedProps?.sendReaction({ rType: react.type, rIcon: react.icon });
            id && updateBtn(id, react);
            wrapper.classList.add("hide-elist"); wrapper.classList.remove("show-elist");
        }
    }

    function updateBtn(id, react) {
        const span = document.querySelector(`#reaction-btn-${id} span`);
        if (span) {
            span.innerHTML = "";
            if (react.name === "text" || (typeof react.icon === "string" && react.icon.length > 2)) {
                const textContainer = document.createElement("div"); textContainer.className = "text-reaction"; textContainer.textContent = react.icon;
                span.appendChild(textContainer);
            } else {
                span.textContent = react.icon; span.style.fontSize = "20px";
            }
        }
    }

    // ================= 6. OBSERVER =================
    const observer = new MutationObserver(mutations => mutations.forEach(m => {
        if (m.type === "childList" && m.addedNodes.length > 0) {
            const addedNode = m.addedNodes[0];
            if (addedNode.querySelector?.(".reaction-emoji-list") || (addedNode.classList && addedNode.classList.contains("reaction-emoji-list"))) {
                setTimeout(() => {
                    document.querySelectorAll(".reaction-emoji-list").forEach(list => {
                        if (list.getAttribute("data-extended") !== "true") {
                            list.setAttribute("data-extended", "true");
                            const wrapper = list.closest(".emoji-list-wrapper");
                            if (wrapper) {
                                const btn = wrapper.querySelector('[id^="reaction-btn-"]');
                                const id = btn?.id.replace("reaction-btn-", "");
                                reactions.forEach((react) => {
                                    const div = document.createElement("div");
                                    div.className = "reaction-emoji-icon"; div.setAttribute("data-custom", "true");
                                    const span = document.createElement("span"); span.innerText = react.icon; div.appendChild(span);
                                    if (react.name === "send_custom") div.title = "Tùy chỉnh";
                                    div.onclick = (e) => {
                                        e.preventDefault(); e.stopPropagation();
                                        if (react.name === "send_custom") {
                                            const popup = createTextInputPopup();
                                            popup.show();
                                            popup.confirmButton.onclick = () => {
                                                const val = popup.input.value.trim();
                                                if (val) {
                                                    const newReact = { ...react, icon: val, type: simpleHash(val) };
                                                    RecentlyReaction.add(val); sendReaction(wrapper, id, newReact); popup.hide();
                                                }
                                            };
                                        } else { sendReaction(wrapper, id, react); }
                                    };
                                    list.appendChild(div);
                                });
                            }
                        }
                    });
                }, 50);
            }
        }
    }));

    // KHỞI CHẠY
    injectStyles();
    RecentlyReaction.load();
    observer.observe(document.body, { childList: true, subtree: true });

})();