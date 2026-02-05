// --- FILE: modules/polyfill.js ---
function GM_addStyle(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

function GM_setValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function GM_getValue(key, defaultValue) {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    try {
        return JSON.parse(value);
    } catch (e) {
        return defaultValue;
    }
}

// SHA-256 hash function for password security
async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}