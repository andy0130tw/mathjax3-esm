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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { mathjax } from '../../mathjax.js';
import { STATE, newState } from '../../core/MathItem.js';
import { expandable } from '../../util/Options.js';
import { Menu } from './Menu.js';
newState('CONTEXT_MENU', 170);
export function MenuMathItemMixin(BaseMathItem) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.addMenu = function (document) {
            if (this.state() < STATE.CONTEXT_MENU && !this.isEscaped) {
                document.menu.addMenu(this);
                this.state(STATE.CONTEXT_MENU);
            }
        };
        class_1.prototype.checkLoading = function (document) {
            if (document.menu.isLoading) {
                mathjax.retryAfter(document.menu.loadingPromise.catch(function (err) { return console.log(err); }));
            }
        };
        class_1.prototype.enrich = function (document, force) {
            if (force === void 0) { force = false; }
            var settings = document.menu.settings;
            if (settings.collapsible || settings.explorer || force) {
                settings.collapsible && document.menu.checkComponent('a11y/complexity');
                settings.explorer && document.menu.checkComponent('a11y/explorer');
                _super.prototype.enrich.call(this, document);
            }
        };
        class_1.prototype.complexity = function (document, force) {
            if (force === void 0) { force = false; }
            if (document.menu.settings.collapsible || force) {
                document.menu.checkComponent('a11y/complexity');
                _super.prototype.complexity.call(this, document);
            }
        };
        class_1.prototype.explorable = function (document, force) {
            if (force === void 0) { force = false; }
            if (document.menu.settings.explorer || force) {
                document.menu.checkComponent('a11y/explorer');
                _super.prototype.explorable.call(this, document);
            }
        };
        class_1.prototype.assistiveMml = function (document, force) {
            if (force === void 0) { force = false; }
            if (document.menu.settings.assistiveMml || force) {
                document.menu.checkComponent('a11y/assistive-mml');
                _super.prototype.assistiveMml.call(this, document);
            }
        };
        return class_1;
    }(BaseMathItem));
}
export function MenuMathDocumentMixin(BaseDocument) {
    var _a;
    return _a = (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spread(args)) || this;
                _this.menu = new _this.options.MenuClass(_this, _this.options.menuOptions);
                var ProcessBits = _this.constructor.ProcessBits;
                if (!ProcessBits.has('context-menu')) {
                    ProcessBits.allocate('context-menu');
                }
                _this.options.MathItem = MenuMathItemMixin(_this.options.MathItem);
                return _this;
            }
            class_2.prototype.addMenu = function () {
                var e_1, _a;
                if (!this.processed.isSet('context-menu')) {
                    try {
                        for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var math = _c.value;
                            math.addMenu(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    this.processed.set('context-menu');
                }
                return this;
            };
            class_2.prototype.checkLoading = function () {
                if (this.menu.isLoading) {
                    mathjax.retryAfter(this.menu.loadingPromise.catch(function (err) { return console.log(err); }));
                }
                return this;
            };
            class_2.prototype.state = function (state, restore) {
                if (restore === void 0) { restore = false; }
                _super.prototype.state.call(this, state, restore);
                if (state < STATE.CONTEXT_MENU) {
                    this.processed.clear('context-menu');
                }
                return this;
            };
            class_2.prototype.updateDocument = function () {
                _super.prototype.updateDocument.call(this);
                this.menu.menu.getStore().sort();
                return this;
            };
            class_2.prototype.enrich = function (force) {
                var e_2, _a;
                if (force === void 0) { force = false; }
                var settings = this.menu.settings;
                if (!this.processed.isSet('enriched') && (settings.collapsible || settings.explorer || force)) {
                    settings.collapsible && this.menu.checkComponent('a11y/complexity');
                    settings.explorer && this.menu.checkComponent('a11y/explorer');
                    try {
                        for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var math = _c.value;
                            math.enrich(this, force);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    this.processed.set('enriched');
                }
                return this;
            };
            class_2.prototype.complexity = function (force) {
                var e_3, _a;
                if (force === void 0) { force = false; }
                if (!this.processed.isSet('complexity') && (this.menu.settings.collapsible || force)) {
                    this.menu.checkComponent('a11y/complexity');
                    try {
                        for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var math = _c.value;
                            math.complexity(this, force);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    this.processed.set('complexity');
                }
                return this;
            };
            class_2.prototype.explorable = function (force) {
                var e_4, _a;
                if (force === void 0) { force = false; }
                if (!this.processed.isSet('explorer') && (this.menu.settings.explorer || force)) {
                    this.menu.checkComponent('a11y/explorer');
                    try {
                        for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var math = _c.value;
                            math.explorable(this, force);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    this.processed.set('explorer');
                }
                return this;
            };
            return class_2;
        }(BaseDocument)),
        _a.OPTIONS = __assign(__assign({}, BaseDocument.OPTIONS), { MenuClass: Menu, menuOptions: Menu.OPTIONS, a11y: (BaseDocument.OPTIONS.a11y || expandable({})), renderActions: expandable(__assign(__assign({}, BaseDocument.OPTIONS.renderActions), { addMenu: [STATE.CONTEXT_MENU], checkLoading: [STATE.UNPROCESSED + 1] })) }),
        _a;
}
export function MenuHandler(handler) {
    handler.documentClass = MenuMathDocumentMixin(handler.documentClass);
    return handler;
}
//# sourceMappingURL=MenuHandler.js.map