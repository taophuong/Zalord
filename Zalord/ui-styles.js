// --- FILE: modules/ui-styles.js ---
(function () {
    'use strict';

    window.ZalordStyles = {
        inject: function () {
            if (document.getElementById('zalord-ui-styles')) return;

            const styleSheet = document.createElement('style');
            styleSheet.id = 'zalord-ui-styles';
            styleSheet.textContent = `
                /* Import Play font from Google Fonts */
                @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');
                
                :root {
                    --zalord-primary-base: #0e70ff;
                    --zalord-primary-dark: #035bdc;
                    --zalord-border-base: var(--zalord-grey-300);
                    --zalord-border-light: var(--zalord-grey-600);
                    --zalord-border-radius-base: 8px;
                    --zalord-popup-font-family: "Play", sans-serif;
                    --zalord-font-regular: 400;
                    --zalord-font-semibold: 600;
                }
                
                html[data-zalord-theme=light] {
                    --zalord-white-700: hsla(0, 0%, 100%, 0.1);
                    --zalord-white-600: hsla(0, 0%, 100%, 0.25);
                    --zalord-white-500: hsla(0, 0%, 100%, 0.5);
                    --zalord-white-400: hsla(0, 0%, 100%, 0.75);
                    --zalord-white-300: #fff;
                    --zalord-white-base: #fff;
                    --zalord-neutral-700: #e5e7eb;
                    --zalord-neutral-600: #abb4bc;
                    --zalord-neutral-500: #72808e;
                    --zalord-neutral-400: #394e60;
                    --zalord-neutral-300: #001a33;
                    --zalord-neutral-200: #081020;
                    --zalord-neutral-100: #050a19;
                    --zalord-neutral-base: #001a33;
                    --zalord-grey-700: #fbfbfd;
                    --zalord-grey-600: #f4f5f7;
                    --zalord-grey-500: #eeeff2;
                    --zalord-grey-400: #e8eaef;
                    --zalord-grey-300: #e1e4ea;
                    --zalord-grey-base: #e1e4ea;
                    --zalord-blue-700: #e5efff;
                    --zalord-blue-650: #c8deff;
                    --zalord-blue-600: #abcdff;
                    --zalord-blue-500: #72abff;
                    --zalord-blue-400: #3989ff;
                    --zalord-blue-300: #0068ff;
                    --zalord-blue-base: #0068ff;
                    --zalord-switch-slider: #fff;
                    --zalord-input-bg: #f4f5f7;
                    --zalord-btn-floating: #fff;
                    --zalord-btn-floating-text: #abb4bc;
                    --zalord-btn-floating-shadow: rgba(0, 0, 0, 0.16);
                    --zalord-by-quaric: black;
                }
                
                html[data-zalord-theme=dark] {
                    --zalord-white-700: hsla(0, 0%, 27%, 0.1);
                    --zalord-white-600: hsla(0, 0%, 27%, 0.25);
                    --zalord-white-500: hsla(0, 0%, 27%, 0.5);
                    --zalord-white-400: hsla(0, 0%, 27%, 0.75);
                    --zalord-white-300: #232526;
                    --zalord-white-base: #232526;
                    --zalord-neutral-700: #58595a;
                    --zalord-neutral-600: #7b7c7d;
                    --zalord-neutral-500: #9e9f9f;
                    --zalord-neutral-400: #c1c2c2;
                    --zalord-neutral-300: #e5e5e5;
                    --zalord-neutral-200: #f6f6f6;
                    --zalord-neutral-100: #ffffff;
                    --zalord-neutral-base: #e5e5e5;
                    --zalord-grey-700: #2d3031;
                    --zalord-grey-600: #343637;
                    --zalord-grey-500: #3a3d3e;
                    --zalord-grey-400: #424444;
                    --zalord-grey-300: #464849;
                    --zalord-grey-base: #464849;
                    --zalord-blue-700: #0f2345;
                    --zalord-blue-650: #0e2d5b;
                    --zalord-blue-600: #0b3a7e;
                    --zalord-blue-500: #074bad;
                    --zalord-blue-400: #035bdc;
                    --zalord-blue-300: #3989ff;
                    --zalord-blue-base: #3989ff;
                    --zalord-switch-slider: var(--zalord-neutral-300);
                    --zalord-input-bg: var(--zalord-grey-700);
                    --zalord-btn-floating: var(--zalord-grey-300);
                    --zalord-btn-floating-text: var(--zalord-neutral-500);
                    --zalord-btn-floating-shadow: rgba(0, 0, 0, 0.25);
                    --zalord-by-quaric: #9e9f9f;
                }
                
                /* Detect theme */
                html:not([data-zalord-theme]) {
                    --zalord-white-300: #fff;
                    --zalord-white-base: #fff;
                    --zalord-neutral-700: #e5e7eb;
                    --zalord-neutral-600: #abb4bc;
                    --zalord-neutral-500: #72808e;
                    --zalord-neutral-400: #394e60;
                    --zalord-neutral-300: #001a33;
                    --zalord-neutral-base: #001a33;
                    --zalord-grey-700: #fbfbfd;
                    --zalord-grey-600: #f4f5f7;
                    --zalord-grey-500: #eeeff2;
                    --zalord-grey-400: #e8eaef;
                    --zalord-grey-300: #e1e4ea;
                    --zalord-grey-base: #e1e4ea;
                    --zalord-blue-base: #0068ff;
                    --zalord-blue-400: #3989ff;
                    --zalord-switch-slider: #fff;
                    --zalord-input-bg: #f4f5f7;
                    --zalord-btn-floating: #fff;
                    --zalord-btn-floating-text: #abb4bc;
                    --zalord-btn-floating-shadow: rgba(0, 0, 0, 0.16);
                    --zalord-by-quaric: black;
                }
                
                .zalord-popper {
                    position: fixed;
                    z-index: 99999;
                    font-family: "Play", sans-serif !important;
                }
                
                #zalord-popup {
                    font-family: "Play", sans-serif !important;
                    font-size: 14px;
                    width: min(420px, 100vw); /* Full width on small screens */
                    max-height: 98vh; /* ✅ Nearly full height for maximum content */
                    height: auto; /* ✅ Auto-fit content height */
                    background: var(--zalord-white-300);
                    background-color: var(--zalord-white-300);
                    color: var(--zalord-neutral-base);
                    border-radius: 12px; /* ✅ Add rounded corners */
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                #zalord-popup * {
                    box-sizing: border-box;
                }
                
                #zalord-popup a {
                    color: var(--zalord-primary-base);
                    text-decoration: none;
                }
                
                #zalord-popup a:hover {
                    color: var(--zalord-primary-dark);
                    text-decoration: none;
                }
                
                #zalord-popup p {
                    margin: 0;
                }
                
                #zalord-popup code {
                    padding: 2px 4px;
                    border-radius: 4px;
                    background: var(--zalord-grey-500);
                }
                
                #zalord-popup strong {
                    font-weight: var(--zalord-font-semibold);
                }
                
                #zalord-popup .zalord-popup__scrollable {
                    position: relative;
                    overflow: hidden; /* Hide overflow but allow children to scroll */
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background-color: var(--zalord-white-300);
                }
                
                #zalord-popup .zalord-popup__scrollable::-webkit-scrollbar {
                    width: 8px;
                }
                
                #zalord-popup .zalord-popup__scrollable::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                #zalord-popup .zalord-popup__scrollable::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 4px;
                    transition: background 0.2s ease;
                }
                
                #zalord-popup .zalord-popup__scrollable::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.5);
                }
                
                /* Firefox scrollbar */
                #zalord-popup .zalord-popup__scrollable {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
                }
                
                #zalord-popup .zalord-popup__header {
                    position: sticky;
                    top: 0;
                    z-index: 9999;
                    padding: 16px;
                    min-height: 50px; /* Fixed height to prevent jumping */
                    display: flex;
                    align-items: center;
                    background-color: var(--zalord-white-300);
                    flex-shrink: 0; /* Prevent header from shrinking */
                }
                
                #zalord-popup .zalord-popup__header__logo {
                    flex: 1;
                    margin-right: 8px;
                    display: inline-flex;
                    align-items: center;
                }
                
                #zalord-popup .zalord-popup__header__logo-img {
                    width: auto;
                    height: 18px;
                }
                
                #zalord-popup .zalord-popup__header__menu-list {
                    display: flex;
                    align-items: center;
                }
                
                #zalord-popup .zalord-popup__header__menu-item a {
                    color: var(--zalord-neutral-500);
                    transition: all .25s ease-in-out;
                }
                
                #zalord-popup .zalord-popup__header__menu-item a:hover {
                    color: var(--zalord-neutral-base);
                }
                
                #zalord-popup .zalord-popup__header__menu-divider::after {
                    content: "";
                    display: inline-block;
                    width: 12px;
                }
                
                #zalord-popup .zalord-popup__main {
                    padding: 0 16px;
                    overflow-y: auto; /* Only scroll here */
                    overflow-x: hidden;
                    flex: 1;
                    /* Height will be calculated by flex parent */
                }
                
                #zalord-popup .zalord-popup__main::-webkit-scrollbar {
                    width: 8px;
                }
                
                #zalord-popup .zalord-popup__main::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                #zalord-popup .zalord-popup__main::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 4px;
                    transition: background 0.2s ease;
                }
                
                #zalord-popup .zalord-popup__main::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.5);
                }
                
                /* Firefox scrollbar */
                #zalord-popup .zalord-popup__main {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
                }
                
                /* Dark mode scrollbar - white color */
                html[data-zalord-theme=dark] #zalord-popup .zalord-popup__scrollable::-webkit-scrollbar-thumb,
                html[data-zalord-theme=dark] #zalord-popup .zalord-popup__main::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                html[data-zalord-theme=dark] #zalord-popup .zalord-popup__scrollable::-webkit-scrollbar-thumb:hover,
                html[data-zalord-theme=dark] #zalord-popup .zalord-popup__main::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
                
                html[data-zalord-theme=dark] #zalord-popup .zalord-popup__scrollable,
                html[data-zalord-theme=dark] #zalord-popup .zalord-popup__main {
                    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
                }
                
                #zalord-popup .zalord-popup__footer {
                    display: flex;
                    justify-content: center;
                    padding: 12px 16px;
                    background: var(--zalord-bg-primary);
                    border-top: 1px solid var(--zalord-border-light);
                    flex-shrink: 0; /* Don't shrink footer */
                    z-index: 10; /* Ensure footer is on top */
                }
                
                #zalord-popup .zalord-publisher {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    user-select: none;
                    transition: all .25s ease-in-out;
                    color: var(--zalord-by-quaric);
                }
                
                #zalord-popup .zalord-publisher:hover {
                    color: var(--zalord-neutral-base);
                }
                
                #zalord-popup .zalord-publisher__by {
                    line-height: 20px;
                }
                
                #zalord-popup .zalord-publisher__lockup {
                    width: auto;
                    height: 12px;
                    margin-left: 8px;
                }
                
                #zalord-popup .zalord-panel {
                    position: relative;
                    overflow: hidden;
                    border: 1px solid var(--zalord-border-base);
                    border-radius: var(--zalord-border-radius-base);
                    margin-bottom: 16px;
                }
                
                #zalord-popup .zalord-panel__body {
                    padding: 8px 12px;
                }
                
                #zalord-popup .zalord-switch {
                    display: flex;
                    flex-direction: column;
                    padding: 8px 0;
                    border-bottom: 1px solid var(--zalord-border-light);
                }
                
                #zalord-popup .zalord-switch__header {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }
                
                #zalord-popup .zalord-switch--border-default {
                    border-color: var(--zalord-border-base);
                }
                
                #zalord-popup .zalord-switch__list {
                    margin-top: -8px;
                    margin-bottom: -8px;
                }
                
                #zalord-popup .zalord-switch__label {
                    flex: 1;
                    cursor: pointer;
                    user-select: none;
                }
                
                #zalord-popup .zalord-switch__label--helper {
                    display: flex;
                    align-items: center;
                }
                
                #zalord-popup .zalord-switch__checkbox {
                    position: relative;
                    display: inline-block;
                    width: 28px;
                    height: 16px;
                }
                
                #zalord-popup .zalord-switch__input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                
                #zalord-popup .zalord-switch__slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--zalord-grey-base);
                    transition: all .25s ease-in-out;
                    border-radius: 50rem;
                }
                
                #zalord-popup .zalord-switch__slider:before {
                    position: absolute;
                    content: "";
                    height: 12px;
                    width: 12px;
                    left: 2px;
                    bottom: 2px;
                    background-color: var(--zalord-switch-slider);
                    transition: .25s;
                    border-radius: 50rem;
                }
                
                #zalord-popup .zalord-switch__input:checked + .zalord-switch__slider {
                    background-color: var(--zalord-primary-base);
                }
                
                #zalord-popup .zalord-switch__input:checked + .zalord-switch__slider:before {
                    transform: translateX(12px);
                }
                
                #zalord-popup .zalord-switch:last-child {
                    border-bottom: 0;
                }
                
                #zalord-popup .zalord-switch__hotkeys {
                    margin-right: 12px;
                }
                
                #zalord-popup .zalord-hotkeys {
                    font-family: "Play", sans-serif !important;
                    font-weight: 400;
                    color: var(--zalord-neutral-500);
                    font-size: 12px;
                }
                
                #zalord-popup .zalord-input {
                    min-width: 168px;
                    height: 32px;
                    padding: 0 12px;
                    border: 1px solid var(--zalord-grey-700);
                    border-radius: var(--zalord-border-radius-base);
                    background-color: var(--zalord-input-bg);
                    color: var(--zalord-neutral-base);
                    font-family: "Play", sans-serif !important;
                    font-size: 14px;
                }
                
                #zalord-popup .zalord-extra__desc {
                    font-family: "Play", sans-serif !important;
                    font-size: 12px;
                    line-height: 1.5;
                    color: var(--zalord-neutral-500);
                    margin: 0;
                }
                
                #zalord-popup .zalord-input:focus {
                    outline: none;
                    border-color: var(--zalord-blue-400);
                }
                
                #zalord-popup .zalord-select {
                    display: block;
                    max-width: 100%;
                    background-color: rgba(0,0,0,0);
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iIzU4NjA2OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNC40MjcgOS40MjdsMy4zOTYgMy4zOTZhLjI1MS4yNTEgMCAw0yLjM1NCAwbDMuMzk2LTMuMzk2QS4yNS4yNSAwIDAwMTEuMzk2IDlINC42MDRhLjI1LjI1IDAgMDAtLjE3Ny40Mjd6TQuNDIzIDYuNDdMNy44MiAzLjA3MmEuMjUuMjUgMCAwMS4zNTQgMEwxMS41NyA2LjQ3YS4yNS4yNSAwIDAxLS4xNzcuNDI3SDRhLjI1LjI1IDAgMDEtLjE3Ny0uNDI3eiIgLz48L3N2Zz4=);
                    background-repeat: no-repeat;
                    background-position: right center;
                    background-size: 16px;
                    border: 0;
                    border-radius: var(--zalord-border-radius-base);
                    font-family: "Play", sans-serif !important;
                    font-size: 14px;
                    line-height: 20px;
                    outline: none;
                    cursor: pointer;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    min-width: 168px;
                    height: 32px;
                    padding: 0 28px 0 12px;
                    color: var(--zalord-neutral-base);
                    background-color: var(--zalord-input-bg);
                    background-position: right 6px center;
                }
                
                #zalord-popup .zalord-select option {
                    background-color: var(--zalord-white-300);
                }
                
                #zalord-popup .font-settings {
                    display: flex;
                    align-items: center;
                    margin-top: 8px;
                    padding-top: 8px;
                    border-top: 1px solid var(--zalord-border-light);
                }
                
                #zalord-popup .font-settings--border-default {
                    border-color: var(--zalord-border-base);
                }
                
                #zalord-popup .font-settings .font-settings__label {
                    flex: 1;
                    font-weight: var(--zalord-font-regular);
                }
                
                #zalord-popup .font-settings .font-settings__label a {
                    color: var(--zalord-neutral-base);
                    font-weight: var(--zalord-font-semibold);
                }
                
                #zalord-popup .font-settings .font-settings__label a:hover {
                    color: var(--zalord-neutral-400);
                }
                
                #zalord-popup .font-settings .zalord-input,
                #zalord-popup .font-settings .zalord-select {
                    width: 168px;
                }
                
                /* Expandable details */
                .zalord-details {
                    display: none;
                    flex-direction: column;
                    gap: 12px;
                    padding: 12px 0 0 0;
                    margin-top: 8px;
                    border-top: 1px solid var(--zalord-border-light);
                }
                
                #zalord-popup .zalord-button {
                    font-family: "Play", sans-serif !important;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px 16px;
                    font-weight: 500;
                    font-size: 13px;
                    color: var(--zalord-primary-base);
                    background: var(--zalord-white-700);
                    border: 1px solid var(--zalord-primary-base);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    user-select: none;
                }
                
                .zalord-details--expanded {
                    display: flex;
                }
                
                .zalord-expand-btn {
                    width: 24px;
                    height: 24px;
                    border-radius: 6px;
                    border: 1px solid var(--zalord-border-base);
                    background: var(--zalord-white-300);
                    color: var(--zalord-primary-base);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.2s;
                    margin-right: 8px;
                }
                
                .zalord-expand-btn:hover {
                    background: var(--zalord-grey-600);
                }
                
                .zalord-expand-btn--expanded {
                    background: var(--zalord-primary-base);
                    color: var(--zalord-switch-slider);
                }
                
                /* Slider */
                .zalord-slider-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .zalord-slider-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 13px;
                    color: var(--zalord-neutral-500);
                }
                
                .zalord-slider-header span:first-child {
                    font-weight: var(--zalord-font-regular);
                    color: var(--zalord-neutral-base);
                }
                
                .zalord-slider-header span:last-child {
                    font-weight: var(--zalord-font-semibold);
                    color: var(--zalord-primary-base);
                }
                
                .zalord-slider {
                    width: 100%;
                    height: 4px;
                    border-radius: 2px;
                    background: var(--zalord-grey-base);
                    outline: none;
                    -webkit-appearance: none;
                    cursor: pointer;
                }
                
                .zalord-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--zalord-primary-base);
                    cursor: pointer;
                }
                
                .zalord-slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--zalord-primary-base);
                    cursor: pointer;
                    border: none;
                }
                
                /* Color picker */
                .zalord-color-picker-group {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 0;
                }
                
                .zalord-color-picker-label {
                    font-size: 13px;
                    color: var(--zalord-neutral-base);
                    font-weight: var(--zalord-font-regular);
                }
                
                .zalord-color-picker {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    border: 1px solid var(--zalord-border-base);
                    cursor: pointer;
                    background: none;
                    padding: 0;
                }
                
                /* Font box */
                .zalord-font-box {
                    margin-top: 12px;
                    padding: 12px;
                    background: var(--zalord-grey-600);
                    border-radius: var(--zalord-border-radius-base);
                    border: 1px solid var(--zalord-border-base);
                }
                
                .zalord-font-status {
                    font-size: 11px;
                    padding: 6px 10px;
                    border-radius: 6px;
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                
                .zalord-font-status--success {
                    background: #d1fae5;
                    color: #065f46;
                }
                
                .zalord-font-status--warning {
                    background: #fef3c7;
                    color: #92400e;
                }
                
                .zalord-font-status--error {
                    background: #fee2e2;
                    color: #991b1b;
                }
                
                .zalord-font-guide {
                    font-size: 12px;
                    color: var(--zalord-neutral-500);
                    margin-bottom: 8px;
                }
                
                .zalord-font-status-msg {
                    font-size: 12px;
                    margin-top: 8px;
                    min-height: 16px;
                    font-weight: 500;
                }
                
                .zalord-font-status-msg--success {
                    color: #059669;
                }
                
                .zalord-font-status-msg--error {
                    color: #dc2626;
                }
                
                .zalord-font-status-msg--loading {
                    color: #f59e0b;
                }
                
                /* Control rows */
                .zalord-control-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid var(--zalord-border-light);
                }
                
                .zalord-control-row:last-child {
                    border-bottom: none;
                }
                
                .zalord-control-label {
                    font-size: 13px;
                    color: var(--zalord-neutral-base);
                    font-weight: var(--zalord-font-regular);
                }
                
                .zalord-control-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .zalord-number-input {
                    width: 50px;
                    height: 32px;
                    padding: 0 8px;
                    border: 1px solid var(--zalord-grey-700);
                    border-radius: var(--zalord-border-radius-base);
                    background-color: var(--zalord-input-bg);
                    color: var(--zalord-neutral-base);
                    font-family: "Play", sans-serif !important;
                    font-size: 14px;
                    text-align: center;
                }
                
                .zalord-number-input:focus {
                    outline: none;
                    border-color: var(--zalord-blue-400);
                }
                
                .zalord-toggle-btn {
                    padding: 6px 12px;
                    border: 1px solid var(--zalord-border-base);
                    border-radius: var(--zalord-border-radius-base);
                    background: var(--zalord-white-300);
                    color: var(--zalord-neutral-base);
                    font-weight: var(--zalord-font-semibold);
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                #zalord-popup .zalord-extra__title {
                    font-family: "Play", sans-serif !important;
                    font-weight: var(--zalord-font-semibold);
                    font-size: 13px;
                    margin-bottom: 8px;
                    color: var(--zalord-neutral-base);
                }
                
                .zalord-toggle-btn:hover {
                    background: var(--zalord-grey-600);
                }
                
                .zalord-toggle-btn--active {
                    background: var(--zalord-primary-base);
                    color: var(--zalord-switch-slider);
                }
                
                .zalord-btn-group {
                    display: flex;
                    gap: 6px;
                }
                
                .zalord-section-title {
                    font-size: 11px;
                    font-weight: var(--zalord-font-semibold);
                    color: var(--zalord-primary-base);
                    margin: 16px 0 8px 0;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .zalord-chat-section {
                    margin-bottom: 12px;
                    padding: 12px;
                    background: var(--zalord-grey-600);
                    border-radius: var(--zalord-border-radius-base);
                    border: 1px solid var(--zalord-border-base);
                }
                
                .zalord-chat-section__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }
                
                .zalord-chat-section__title {
                    font-size: 13px;
                    font-weight: var(--zalord-font-semibold);
                    color: var(--zalord-neutral-base);
                }
                
                .zalord-error-details {
                    font-size: 11px;
                    color: #dc2626;
                    margin-top: 8px;
                    padding-left: 12px;
                    border-left: 2px solid #dc2626;
                    line-height: 1.5;
                }
                
                /* Floating button */
                .zalord-floating-btn {
                    position: fixed;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: var(--zalord-btn-floating);
                    border: 1px solid var(--zalord-border-base);
                    cursor: pointer;
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px 0 var(--zalord-btn-floating-shadow);
                    transition: all 0.25s ease-in-out;
                    user-select: none;
                    touch-action: none;
                }
                
                .zalord-floating-btn:hover {
                    transform: scale(1.05);
                }
                
                .zalord-floating-btn img {
                    width: 40px;
                    height: 34px;
                    display: block;
                    object-fit: contain;
                    -webkit-user-drag: none;
                    pointer-events: none;
                }
                
                /* Expand button and spacer - fixed width to prevent text jumping */
                .zalord-expand-btn,
                .zalord-expand-spacer {
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .zalord-expand-spacer {
                    visibility: hidden;
                    pointer-events: none;
                }
                
                /* Sidebar Menu */
                .zalord-sidebar-menu {
                    display: flex;
                    align-items: center;
                    padding: 10px 12px;
                    cursor: pointer;
                    transition: background-color 0.2s ease, color 0.2s ease;
                    border-radius: 8px;
                    margin: 4px 8px;
                    color: var(--zalord-neutral-500);
                    user-select: none;
                    font-family: "Play", sans-serif !important;
                }
                
                .zalord-sidebar-menu:hover {
                    background-color: var(--zalord-grey-600);
                    color: var(--zalord-neutral-base);
                }
                
                .zalord-sidebar-menu__icon {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                    flex-shrink: 0;
                    font-size: 18px;
                }
                
                .zalord-sidebar-menu__icon svg {
                    width: 20px;
                    height: 20px;
                }
                
                .zalord-sidebar-menu__text {
                    font-size: 14px;
                    font-weight: 500;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                /* Active state */
                .zalord-sidebar-menu--active {
                    background-color: var(--zalord-blue-700);
                    color: var(--zalord-primary-base);
                }
                
                /* Dark mode */
                html[data-zalord-theme=dark] .zalord-sidebar-menu:hover {
                    background-color: var(--zalord-grey-600);
                }
                
                /* Ẩn tab Zalord trong sidebar */
                #div_Main_TabZalord {
                    display: none !important;
                }
                
                /* Premium badge animation only - no border or padding */
                .zalord-premium-badge {
                    animation: premiumShine 2s ease-in-out infinite;
                }
                
                @keyframes premiumShine {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                /* Activation Modal */
                .zalord-activation-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 999999;
                    backdrop-filter: blur(5px);
                }

                .zalord-modal-content {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 24px;
                    border-radius: 12px;
                    min-width: 400px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                }

                .zalord-modal-content h3 {
                    margin: 0 0 16px 0;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                }

                .zalord-modal-content input[type="text"],
                .zalord-modal-content input[type="number"] {
                    background: rgba(255, 255, 255, 0.9) !important;
                    border: 2px solid rgba(255, 255, 255, 0.3) !important;
                    color: #1f2937 !important;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .zalord-modal-content input:focus {
                    background: rgba(255, 255, 255, 1) !important;
                    border-color: #ffd700 !important;
                }

                .zalord-duration-selector {
                    margin: 12px 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .zalord-duration-selector label {
                    color: #fff;
                    font-weight: 600;
                    font-size: 14px;
                }

                .zalord-modal-buttons {
                    display: flex;
                    gap: 12px;
                    margin-top: 16px;
                }

                .zalord-btn-primary,
                .zalord-btn-secondary {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                }

                .zalord-btn-primary {
                    background: linear-gradient(135deg, #ffd700, #ffed4e);
                    color: #000;
                }

                .zalord-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
                }

                .zalord-btn-secondary {
                    background: rgba(255, 255, 255, 0.2);
                    color: #fff;
                }

                .zalord-btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .zalord-btn-danger {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                    color: #fff;
                }

                .zalord-btn-danger:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
                }

                .zalord-modal-status {
                    margin-top: 12px;
                    text-align: center;
                    min-height: 20px;
                    font-size: 13px;
                }
                
                /* Premium Locked State */
                .zalord-premium-locked {
                    position: relative;
                }
                
                .zalord-premium-locked::after {
                    content: '🔒';
                    position: absolute;
                    right: 45px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 14px;
                    opacity: 0.7;
                    pointer-events: none;
                }
                
                /* ============================================
                   PREMIUM TITLE STYLING
                   ============================================ */
                .zalord-premium-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 18px;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                }
                
                .zalord-premium-icon {
                    font-size: 20px;
                    animation: sparkle 2s ease-in-out infinite;
                }
                
                @keyframes sparkle {
                    0%, 100% { 
                        opacity: 1; 
                        transform: scale(1) rotate(0deg);
                    }
                    50% { 
                        opacity: 0.7; 
                        transform: scale(1.1) rotate(10deg);
                    }
                }
                
                .zalord-premium-text {
                    color: #d4af37;
                    text-shadow: 
                        0 0 8px rgba(212, 175, 55, 0.2),
                        0 0 12px rgba(212, 175, 55, 0.1);
                    animation: premiumGlow 2s ease-in-out infinite;
                }
                
                @keyframes premiumGlow {
                    0%, 100% { 
                        text-shadow: 
                            0 0 8px rgba(212, 175, 55, 0.2),
                            0 0 12px rgba(212, 175, 55, 0.1);
                    }
                    50% { 
                        text-shadow: 
                            0 0 10px rgba(212, 175, 55, 0.3),
                            0 0 16px rgba(212, 175, 55, 0.15);
                    }
                }
                
                /* Dark mode adjustments */
                html[data-zalord-theme=dark] .zalord-premium-text {
                    color: #e6d89f;
                    text-shadow: 
                        0 0 10px rgba(230, 216, 159, 0.25),
                        0 0 14px rgba(230, 216, 159, 0.12);
                }
                
                /* Donate Modal Animations */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    }
                }
                
                /* ========================================== */
                /* MENU ZALỎ - CỐ ĐỊNH DÙNG NOTO SANS */
                /* KHÔNG bị ảnh hưởng bởi Google Font customizer */
                /* ========================================== */
                #zalord-popup,
                #zalord-popup *,
                #zalord-popup input,
                #zalord-popup button,
                #zalord-popup span,
                #zalord-popup div,
                #zalord-popup p,
                #zalord-popup label,
                #zalord-popup select,
                #zalord-popup textarea,
                .zalord-popper,
                .zalord-popper *,
                .zalord-floating-btn,
                .zalord-floating-btn *,
                .zalord-menu,
                .zalord-menu * {
                    font-family: 'Play', sans-serif !important;
                }

                /* Restart notification animations */
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -45%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }

                @keyframes slideOut {
                    from {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                    to {
                        opacity: 0;
                        transform: translate(-50%, -45%);
                    }
            `;
            document.head.appendChild(styleSheet);
        }
    };
})();