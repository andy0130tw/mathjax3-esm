import { userOptions, defaultOptions } from '../util/Options.js';
var AbstractFindMath = (function () {
    function AbstractFindMath(options) {
        var CLASS = this.constructor;
        this.options = userOptions(defaultOptions({}, CLASS.OPTIONS), options);
    }
    AbstractFindMath.OPTIONS = {};
    return AbstractFindMath;
}());
export { AbstractFindMath };
//# sourceMappingURL=FindMath.js.map