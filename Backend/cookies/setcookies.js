function setCookie(res, name, value, options = {}) {
    const encode = encodeURIComponent;
    const cookieParts = [`${encode(name)}=${encode(value)}`];

    if (options.maxAge) cookieParts.push(`Max-Age=${options.maxAge}`);
    if (options.domain) cookieParts.push(`Domain=${options.domain}`);
    if (options.path) cookieParts.push(`Path=${options.path}`);
    if (options.expires && options.expires instanceof Date) {
        cookieParts.push(`Expires=${options.expires.toUTCString()}`);
    }
    if (options.httpOnly) cookieParts.push('HttpOnly');
    if (options.secure) cookieParts.push('Secure');
    if (options.sameSite) cookieParts.push(`SameSite=${options.sameSite}`);

    const cookieStr = cookieParts.join('; ');

    const currentCookies = res.getHeader('Set-Cookie');
    if (!currentCookies) {
        res.setHeader('Set-Cookie', [cookieStr]);
    } else if (Array.isArray(currentCookies)) {
        res.setHeader('Set-Cookie', [...currentCookies, cookieStr]);
    } else {
        res.setHeader('Set-Cookie', [currentCookies, cookieStr]);
    }
}

module.exports = setCookie;
