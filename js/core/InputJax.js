import { userOptions, defaultOptions } from '../util/Options.js';
import { FunctionList } from '../util/FunctionList.js';
var AbstractInputJax = (function () {
    function AbstractInputJax(options) {
        if (options === void 0) { options = {}; }
        this.adaptor = null;
        this.mmlFactory = null;
        var CLASS = this.constructor;
        this.options = userOptions(defaultOptions({}, CLASS.OPTIONS), options);
        this.preFilters = new FunctionList();
        this.postFilters = new FunctionList();
    }
    Object.defineProperty(AbstractInputJax.prototype, "name", {
        get: function () {
            return this.constructor.NAME;
        },
        enumerable: true,
        configurable: true
    });
    AbstractInputJax.prototype.setAdaptor = function (adaptor) {
        this.adaptor = adaptor;
    };
    AbstractInputJax.prototype.setMmlFactory = function (mmlFactory) {
        this.mmlFactory = mmlFactory;
    };
    AbstractInputJax.prototype.initialize = function () {
    };
    Object.defineProperty(AbstractInputJax.prototype, "processStrings", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AbstractInputJax.prototype.findMath = function (node, options) {
        return [];
    };
    AbstractInputJax.prototype.executeFilters = function (filters, math, document, data) {
        var args = { math: math, document: document, data: data };
        filters.execute(args);
        return args.data;
    };
    AbstractInputJax.NAME = 'generic';
    AbstractInputJax.OPTIONS = {};
    return AbstractInputJax;
}());
export { AbstractInputJax };
//# sourceMappingURL=InputJax.js.map