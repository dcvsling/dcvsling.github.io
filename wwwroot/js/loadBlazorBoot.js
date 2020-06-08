Blazor.start({
    loadBootResource: function (_, _, defaultUri, integrity) {
        return fetch(defaultUri)
            //,{
            //cache: 'no-cache',
            //integrity: integrity,
            //headers: {
            //    "User-Agent": "Blazor Github Page",
            //    "Access-Control-Allow-Origin": "*",
            //    "Access-Control-Allow-Headers": ["Authorization", "Content-Type", "If-Match", "If-Modified-Since", "If-None-Match", "If-Unmodified-Since", "X-GitHub-OTP", "X-Requested-With"],
            //    "Access-Control-Allow-Methods": ["GET", "POST", "PATCH", "PUT", "DELETE"],
            //    "Access-Control-Expose-Headers": ["ETag", "Link", "X-GitHub-OTP", "X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset", "X-OAuth-Scopes", "X-Accepted-OAuth-Scopes", "X-Poll-Interval"],
            //    "Access-Control-Max-Age": 86400
            //}
        }
});