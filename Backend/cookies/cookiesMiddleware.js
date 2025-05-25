function cookiesMiddleware(req, res, next) {
    const cookies = {};
    const cookieHeader = req.headers.cookie;
    
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            const key = parts.shift().trim();
            const value = parts.join('=').trim();
            if (key && value) {
                cookies[key] = decodeURIComponent(value);
            }
        });
    }
    
    req.cookies = cookies;
    next();
}

module.exports = cookiesMiddleware;