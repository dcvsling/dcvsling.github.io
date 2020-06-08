window.rewriteUrl = (url) => {
    window.history.replaceState(null, null, url);
}