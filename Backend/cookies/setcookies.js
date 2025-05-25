function setCookie(res, name, value, options = {}) {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.maxAge) {
        cookieStr += `; Max-Age=${options.maxAge}`;
    }
    if (options.domain) {
        cookieStr += `; Domain=${options.domain}`;
    }
    if (options.path) {
        cookieStr += `; Path=${options.path}`;
    }
    if (options.expires) {
        cookieStr += `; Expires=${options.expires.toUTCString()}`;
    }
    if (options.httpOnly) {
        cookieStr += `; HttpOnly`;
    }
    if (options.secure) {
        cookieStr += `; Secure`;
    }
    if (options.sameSite) {
        cookieStr += `; SameSite=${options.sameSite}`;
    }

    // Permite múltiples cookies
    let currentCookies = res.getHeader('Set-Cookie');
    if (!currentCookies) {
        res.setHeader('Set-Cookie', [cookieStr]);
    } else if (Array.isArray(currentCookies)) {
        res.setHeader('Set-Cookie', [...currentCookies, cookieStr]);
    } else {
        res.setHeader('Set-Cookie', [currentCookies, cookieStr]);
    }
}

module.exports = setCookie;