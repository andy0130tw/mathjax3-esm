import { mathjax } from '../../mathjax.js';
var path = require('path');
var root = path.dirname(path.dirname(__dirname));
if (!mathjax.asyncLoad && typeof require !== 'undefined') {
    mathjax.asyncLoad = function (name) {
        return require(name.charAt(0) === '.' ? path.resolve(root, name) : name);
    };
}
//# sourceMappingURL=node.js.map