var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import { AbstractInputJax } from '../core/InputJax.js';
import { userOptions, separateOptions } from '../util/Options.js';
import { FindTeX } from './tex/FindTeX.js';
import FilterUtil from './tex/FilterUtil.js';
import NodeUtil from './tex/NodeUtil.js';
import TexParser from './tex/TexParser.js';
import TexError from './tex/TexError.js';
import ParseOptions from './tex/ParseOptions.js';
import { TagsFactory } from './tex/Tags.js';
import { Configuration, ConfigurationHandler } from './tex/Configuration.js';
import './tex/base/BaseConfiguration.js';
var TeX = (function (_super) {
    __extends(TeX, _super);
    function TeX(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var _a = __read(separateOptions(options, TeX.OPTIONS, FindTeX.OPTIONS), 3), rest = _a[0], tex = _a[1], find = _a[2];
        _this = _super.call(this, tex) || this;
        _this.findTeX = _this.options['FindTeX'] || new FindTeX(find);
        var packages = _this.options.packages;
        var configuration = _this.configuration = TeX.configure(packages);
        var parseOptions = _this._parseOptions = new ParseOptions(configuration, [_this.options, TagsFactory.OPTIONS]);
        userOptions(parseOptions.options, rest);
        configuration.config(configuration, _this);
        TeX.tags(parseOptions, configuration);
        _this.postFilters.add(FilterUtil.cleanSubSup, -6);
        _this.postFilters.add(FilterUtil.setInherited, -5);
        _this.postFilters.add(FilterUtil.moveLimits, -4);
        _this.postFilters.add(FilterUtil.cleanStretchy, -3);
        _this.postFilters.add(FilterUtil.cleanAttributes, -2);
        _this.postFilters.add(FilterUtil.combineRelations, -1);
        return _this;
    }
    TeX.configure = function (packages) {
        var e_1, _a;
        var configuration = Configuration.empty();
        try {
            for (var packages_1 = __values(packages), packages_1_1 = packages_1.next(); !packages_1_1.done; packages_1_1 = packages_1.next()) {
                var key = packages_1_1.value;
                var conf = ConfigurationHandler.get(key);
                if (conf) {
                    configuration.append(conf);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (packages_1_1 && !packages_1_1.done && (_a = packages_1.return)) _a.call(packages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        configuration.init(configuration);
        return configuration;
    };
    TeX.tags = function (options, configuration) {
        TagsFactory.addTags(configuration.tags);
        TagsFactory.setDefault(options.options.tags);
        options.tags = TagsFactory.getDefault();
        options.tags.configuration = options;
    };
    TeX.prototype.setMmlFactory = function (mmlFactory) {
        _super.prototype.setMmlFactory.call(this, mmlFactory);
        this._parseOptions.nodeFactory.setMmlFactory(mmlFactory);
    };
    Object.defineProperty(TeX.prototype, "parseOptions", {
        get: function () {
            return this._parseOptions;
        },
        enumerable: true,
        configurable: true
    });
    TeX.prototype.compile = function (math, document) {
        this.parseOptions.clear();
        this.executeFilters(this.preFilters, math, document, this.parseOptions);
        var display = math.display;
        this.latex = math.math;
        var node;
        this.parseOptions.tags.startEquation(math);
        try {
            var parser = new TexParser(this.latex, { display: display, isInner: false }, this.parseOptions);
            node = parser.mml();
        }
        catch (err) {
            if (!(err instanceof TexError)) {
                throw err;
            }
            this.parseOptions.error = true;
            node = this.formatError(err);
        }
        node = this.parseOptions.nodeFactory.create('node', 'math', [node]);
        if (display) {
            NodeUtil.setAttribute(node, 'display', 'block');
        }
        this.parseOptions.tags.finishEquation(math);
        this.parseOptions.root = node;
        this.executeFilters(this.postFilters, math, document, this.parseOptions);
        this.mathNode = this.parseOptions.root;
        return this.mathNode;
    };
    ;
    TeX.prototype.findMath = function (strings) {
        return this.findTeX.findMath(strings);
    };
    TeX.prototype.formatError = function (err) {
        var message = err.message.replace(/\n.*/, '');
        return this.parseOptions.nodeFactory.create('error', message, err.id, this.latex);
    };
    ;
    TeX.NAME = 'TeX';
    TeX.OPTIONS = __assign({}, AbstractInputJax.OPTIONS, { FindTeX: null, packages: ['base'], digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/, maxBuffer: 5 * 1024 });
    return TeX;
}(AbstractInputJax));
export { TeX };
//# sourceMappingURL=tex.js.map