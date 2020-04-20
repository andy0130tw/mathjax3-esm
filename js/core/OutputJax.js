import { userOptions, defaultOptions } from '../util/Options.js';
import { FunctionList } from '../util/FunctionList.js';
var AbstractOutputJax = (function () {
    function AbstractOutputJax(options) {
        if (options === void 0) { options = {}; }
        this.adaptor = null;
        var CLASS = this.constructor;
        this.options = userOptions(defaultOptions({}, CLASS.OPTIONS), options);
        this.postFilters = new FunctionList();
    }
    Object.defineProperty(AbstractOutputJax.prototype, "name", {
        get: function () {
            return this.constructor.NAME;
        },
        enumerable: true,
        configurable: true
    });
    AbstractOutputJax.prototype.setAdaptor = function (adaptor) {
        this.adaptor = adaptor;
    };
    AbstractOutputJax.prototype.initialize = function () {
    };
    AbstractOutputJax.prototype.getMetrics = function (document) {
    };
    AbstractOutputJax.prototype.styleSheet = function (document) {
        return null;
    };
    AbstractOutputJax.prototype.pageElements = function (document) {
        return null;
    };
    AbstractOutputJax.prototype.executeFilters = function (filters, math, document, data) {
        var args = { math: math, document: document, data: data };
        filters.execute(args);
        return args.data;
    };
    AbstractOutputJax.NAME = 'generic';
    AbstractOutputJax.OPTIONS = {};
    return AbstractOutputJax;
}());
export { AbstractOutputJax };
//# sourceMappingURL=OutputJax.js.map