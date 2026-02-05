// --- FILE: modules/ui-components.js ---
(function() {
    'use strict';

    window.ZalordUI = {
        // 1. Tạo Switch Bật/Tắt cơ bản
        createSwitch: (item, onChangeCallback) => {
            const switchDiv = document.createElement('div');
            switchDiv.className = 'zalord-switch';
            
            // Label
            const label = document.createElement('label');
            label.className = 'zalord-switch__label';
            label.setAttribute('for', `sw-${item.id}`);
            label.innerHTML = item.name;
            
            const controls = document.createElement('div');
            controls.style.display = 'flex';
            controls.style.alignItems = 'center';

            // Nút mở rộng (+)
            let expandBtn = null;
            if (item.hasExtra) {
                expandBtn = document.createElement('button');
                expandBtn.className = 'zalord-expand-btn';
                expandBtn.innerHTML = '+';
                controls.appendChild(expandBtn);
            }

            // Input Checkbox
            const labelWrapper = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'zalord-switch__input';
            checkbox.id = `sw-${item.id}`;
            checkbox.checked = GM_getValue(item.id, item.default);
            
            const slider = document.createElement('span');
            slider.className = 'zalord-switch__slider';
            
            labelWrapper.appendChild(checkbox);
            labelWrapper.appendChild(slider);
            controls.appendChild(labelWrapper);
            
            switchDiv.appendChild(label);
            switchDiv.appendChild(controls);

            // Sự kiện Change
            checkbox.addEventListener('change', (e) => {
                const checked = e.target.checked;
                GM_setValue(item.id, checked);
                onChangeCallback(checked);
            });

            return { element: switchDiv, expandBtn, checkbox };
        },

        // 2. Component Font Input (Đã tách logic polling)
        renderFontSection: (container, item, isChecked) => {
            const fontBox = document.createElement('div');
            fontBox.className = 'zalord-font-box';
            fontBox.style.display = isChecked ? 'block' : 'none';
            fontBox.style.padding = '10px';
            fontBox.style.background = 'rgba(0,0,0,0.05)';
            fontBox.style.borderRadius = '8px';
            fontBox.style.marginTop = '10px';

            const inp = document.createElement('input');
            inp.type = 'text';
            inp.className = 'zalord-input';
            inp.placeholder = item.placeholder || 'Nhập tên font (VD: Roboto)...';

            // Logic lấy font đã lưu
            setTimeout(() => {
                if (window.ZalordFont) {
                    const saved = window.ZalordFont.getSavedFont();
                    if (saved && saved !== 'Open Sans') inp.value = saved;
                }
            }, 500);

            inp.addEventListener('keydown', async (e) => {
                if (e.key === 'Enter') {
                    const val = inp.value.trim();
                    inp.style.borderColor = 'orange';
                    if (window.ZalordFont) {
                        try {
                            await window.ZalordFont.loadAndApply(val);
                            inp.style.borderColor = 'green';
                        } catch {
                            inp.style.borderColor = 'red';
                            alert('Không tìm thấy font!');
                        }
                    }
                }
            });

            fontBox.appendChild(inp);
            container.appendChild(fontBox);
            return fontBox; // Trả về để toggle ẩn/hiện
        },

        // 3. Component Details (Chứa Slider, Color Picker...)
        renderDetailsSection: (container, item) => {
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'zalord-details';

            // Background Input
            if (item.hasBgInput) {
                const i = document.createElement('input');
                i.className = 'zalord-input';
                i.placeholder = 'Link ảnh nền...';
                i.value = GM_getValue('bg_custom_url', '');
                i.onchange = (e) => updateBgUrl(e.target.value);
                detailsDiv.appendChild(i);
            }

            // Helper tạo Slider
            const addSlider = (label, key, defaultVal, updateFn) => {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>${label}</span><span id="val-${key}">${GM_getValue(key, defaultVal)}%</span></div>`;
                const rng = document.createElement('input');
                rng.type = 'range'; rng.className = 'zalord-slider';
                rng.min = 0; rng.max = 100;
                rng.value = GM_getValue(key, defaultVal);
                rng.oninput = (e) => {
                    document.getElementById(`val-${key}`).innerText = e.target.value + '%';
                    updateFn(e.target.value);
                };
                wrapper.appendChild(rng);
                detailsDiv.appendChild(wrapper);
            };

            if (item.hasBlurSlider) addSlider('Độ mờ', 'inactive_blur_val', 25, updateInactiveBlur);
            if (item.hasSlider) addSlider('Trong suốt', 'liquid_opacity_val', 25, updateOpacityVariable);
            if (item.hasRadiusSlider) addSlider('Bo góc', 'liquid_radius_val', 36, updateLiquidRadius);

            // Neon Color Picker
            if (item.hasColorPicker) {
                const div = document.createElement('div');
                div.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-top:8px';
                div.innerHTML = '<span>Màu Neon</span>';
                const cp = document.createElement('input');
                cp.type = 'color'; cp.className = 'zalord-color-picker';
                cp.value = GM_getValue('neon_color_val', '#ff0000');
                cp.oninput = (e) => updateNeonColor(e.target.value);
                div.appendChild(cp);
                detailsDiv.appendChild(div);
            }

            // Input Customizer (Tách ra từ file cũ)
            if (item.isInputCustomizer) window.ZalordUI.renderInputCustomizer(detailsDiv);
            
            // Chat Customizer (Tách ra từ file cũ)
            if (window.ChatCustomizer && item.isInputCustomizer) window.ZalordUI.renderChatCustomizer(detailsDiv);
            
            // Recent Msg Customizer
            if (item.isRecentMsgCustomizer) window.ZalordUI.renderRecentMsgCustomizer(detailsDiv);

            container.appendChild(detailsDiv);
            return detailsDiv;
        },

        // 4. Các renderer phụ (Input, Chat, Recent)
        renderInputCustomizer: (parent) => {
            // ... (Copy logic tạo Input Customizer từ file cũ vào đây) ...
            // Ví dụ:
            const title = document.createElement('div');
            title.innerHTML = '<b>Khung Nhập Liệu</b>';
            title.style.marginTop = '10px';
            parent.appendChild(title);
            // ... Copy tiếp các phần input color, size ...
        },

        renderChatCustomizer: (parent) => {
             // ... (Copy logic Chat Customizer) ...
             const title = document.createElement('div');
             title.innerHTML = '<b>Bong bóng & Header</b>';
             title.style.marginTop = '10px';
             parent.appendChild(title);
             // ... Logic tạo Chat Customizer sections ...
        },

        renderRecentMsgCustomizer: (parent) => {
            // ... (Copy logic Recent Msg) ...
        }
    };
})();