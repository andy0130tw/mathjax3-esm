export function sortLength(a, b) {
    return a.length !== b.length ? b.length - a.length : a === b ? 0 : a < b ? -1 : 1;
}
export function quotePattern(text) {
    return text.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, '\\$1');
}
export function unicodeChars(text) {
    var unicode = [];
    for (var i = 0, m = text.length; i < m; i++) {
        var n = text.charCodeAt(i);
        if (n >= 0xD800 && n < 0xDBFF) {
            n = (((n - 0xD800) << 10) + (text.charCodeAt(++i) - 0xDC00)) + 0x10000;
        }
        unicode.push(n);
    }
    return unicode;
}
export function isPercent(x) {
    return !!x.match(/%\s*$/);
}
export function split(x) {
    return x.trim().split(/\s+/);
}
//# sourceMappingURL=string.js.map