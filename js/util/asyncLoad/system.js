import { mathjax } from '../../mathjax.js';
var root = 'file://' + __dirname.replace(/\/\/[^\/]*$/, '/');
if (!mathjax.asyncLoad && typeof System !== 'undefined' && System.import) {
    mathjax.asyncLoad = function (name) {
        return System.import(name, root);
    };
}
export function setBaseURL(URL) {
    root = URL;
    if (!root.match(/\/$/)) {
        root += '/';
    }
}
//# sourceMappingURL=system.js.map