// --- FILE: modules/bootstrap.js ---
// [BOOTSTRAP.JS - FINAL FIXED]
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

const handleEntryCompactApp = () => {
    return require('./main-dist/compact-app');
};

function bootstrap() {
    require('./libs/perf-tracing/runtime');
    perf.record(perf.STARTUP);
    require('./main-dist/migration');
    perf.record(perf.MIGRATION_DONE);

    const isCompactApp = process.argv.some(e => e.startsWith('--launch-compact-app'));

    if (isCompactApp) {
        if (require('electron').app.requestSingleInstanceLock()) {
            return handleEntryCompactApp();
        } else {
            require('./main-dist/second-instance');
        }
    }

    if (require('electron').app.requestSingleInstanceLock()) {
        perf.record(perf.MAIN_SCRIPT);

        // ============================================================
        // [HỆ THỐNG LẮP RÁP MODULE TỰ ĐỘNG]
        // ============================================================
        app.on('browser-window-created', (event, win) => {
            if (win.title !== 'Zalo') { }

            win.webContents.on('did-finish-load', () => {
                try {
                    let modulesPath = null;
                    const possiblePaths = [
                        path.join(__dirname, 'Zalord'),                // ✅ FIRST: Inside asar (embedded)
                        path.join(process.resourcesPath, 'Zalord'),    // Fallback: resources folder
                        path.join(process.cwd(), 'Zalord'),           // Fallback: current working dir
                        path.join(__dirname, '..', 'Zalord')          // Fallback: parent directory
                    ];

                    for (const testPath of possiblePaths) {
                        if (fs.existsSync(testPath) && fs.statSync(testPath).isDirectory()) {
                            modulesPath = testPath;
                            break;
                        }
                    }

                    if (!modulesPath) return;

                    const buildOrder = [
                        'polyfill.js',
                        'data.js',
                        'logic.js',
                        'chat-customizer.js',
                        'font-customizer.js', // Module Font
                        'ui-styles.js',      // ← CSS styles (phải load TRƯỚC ui.js)
                        'ui-helpers.js',     // ← Helper functions (phải load TRƯỚC ui.js)
                        'ui-components.js',  // ← UI components (phải load TRƯỚC ui.js)
                        'ui.js',             // ← Main UI (sử dụng 3 modules trên)
                        'custom-reaction.js', // ← Load TRƯỚC init.js để react listeners hoạt động
                        'init.js',
                        'ghost-mode.js',
                        'auto-open.js'

                    ];

                    let finalAssemblyCode = "";
                    let loadedCount = 0;

                    buildOrder.forEach(fileName => {
                        const filePath = path.join(modulesPath, fileName);
                        if (fs.existsSync(filePath)) {
                            try {
                                const fileContent = fs.readFileSync(filePath, 'utf-8');
                                finalAssemblyCode += `\n/* --- MODULE: ${fileName} --- */\n`;
                                finalAssemblyCode += fileContent + "\n";
                                loadedCount++;
                            } catch (err) { }
                        }
                    });

                    if (loadedCount > 0 && finalAssemblyCode.length > 0) {
                        const safeCode = `
                        (function() { 
                            'use strict';
                            console.log('%c ZALO ULTIMATE: LOADED', 'color: #00ff41; background: #000; padding: 4px;');
                            try {
                                ${finalAssemblyCode}
                                setTimeout(() => {
                                    if (window.ZalordFont) console.log('%c [CHECK] ✓ ZalordFont OK', 'color: #00ff41;');
                                    else console.error('%c [CHECK] ❌ ZalordFont FAILED', 'color: red;');
                                }, 1000);
                            } catch (err) {
                                console.error('Zalo Ultimate Crashed:', err);
                            }
                        })();
                    `;
                        win.webContents.executeJavaScript(safeCode).catch(e => { });
                    }

                } catch (e) { console.error(e); }
            });
        });
        // ============================================================

        // --- [FIX QUAN TRỌNG] ---
        // 1. Nạp file phá CSP trước
        try {
            require('./main-process');
            console.log('[BOOTSTRAP] Đã kích hoạt Main Process (CSP Bypass)');
        } catch (e) {
            console.error('[BOOTSTRAP] ❌ Không tìm thấy main-process.js', e);
        }

        // 2. Sau đó mới nạp file gốc Zalo để chạy app
        require('./main-dist/main');

    } else {
        require('./main-dist/second-instance');
    }
}

bootstrap();