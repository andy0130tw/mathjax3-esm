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
import { STATE, newState } from '../core/MathItem.js';
import { EnrichHandler } from './semantic-enrich.js';
import { ComplexityVisitor } from './complexity/visitor.js';
import { selectOptionsFromKeys, expandable } from '../util/Options.js';
newState('COMPLEXITY', 40);
export function ComplexityMathItemMixin(BaseMathItem, computeComplexity) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.complexity = function (document) {
            if (this.state() < STATE.COMPLEXITY && !this.isEscaped) {
                this.enrich(document);
                computeComplexity(this.root);
                this.state(STATE.COMPLEXITY);
            }
        };
        return class_1;
    }(BaseMathItem));
}
export function ComplexityMathDocumentMixin(BaseDocument) {
    var _a;
    return _a = (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spread(args)) || this;
                var ProcessBits = _this.constructor.ProcessBits;
                if (!ProcessBits.has('complexity')) {
                    ProcessBits.allocate('complexity');
                }
                var visitorOptions = selectOptionsFromKeys(_this.options, _this.options.ComplexityVisitor.OPTIONS);
                _this.complexityVisitor = new _this.options.ComplexityVisitor(_this.mmlFactory, visitorOptions);
                var computeComplexity = (function (node) { return _this.complexityVisitor.visitTree(node); });
                _this.options.MathItem =
                    ComplexityMathItemMixin(_this.options.MathItem, computeComplexity);
                return _this;
            }
            class_2.prototype.complexity = function () {
                var e_1, _a;
                if (!this.processed.isSet('complexity')) {
                    try {
                        for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var math = _c.value;
                            math.complexity(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    this.processed.set('complexity');
                }
                return this;
            };
            class_2.prototype.state = function (state, restore) {
                if (restore === void 0) { restore = false; }
                _super.prototype.state.call(this, state, restore);
                if (state < STATE.COMPLEXITY) {
                    this.processed.clear('complexity');
                }
                return this;
            };
            return class_2;
        }(BaseDocument)),
        _a.OPTIONS = __assign({}, BaseDocument.OPTIONS, ComplexityVisitor.OPTIONS, { ComplexityVisitor: ComplexityVisitor, renderActions: expandable(__assign({}, BaseDocument.OPTIONS.renderActions, { complexity: [STATE.COMPLEXITY] })) }),
        _a;
}
export function ComplexityHandler(handler, MmlJax) {
    if (MmlJax === void 0) { MmlJax = null; }
    if (!handler.documentClass.prototype.enrich && MmlJax) {
        handler = EnrichHandler(handler, MmlJax);
    }
    handler.documentClass =
        ComplexityMathDocumentMixin(handler.documentClass);
    return handler;
}
//# sourceMappingURL=complexity.js.map