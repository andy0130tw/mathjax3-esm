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
import { AbstractMmlBaseNode, TEXCLASS } from '../MmlNode.js';
import { MmlMo } from './mo.js';
var TeXAtom = (function (_super) {
    __extends(TeXAtom, _super);
    function TeXAtom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texClass = TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(TeXAtom.prototype, "kind", {
        get: function () {
            return 'TeXAtom';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeXAtom.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeXAtom.prototype, "notParent", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TeXAtom.prototype.setTeXclass = function (prev) {
        this.childNodes[0].setTeXclass(null);
        return this.adjustTeXclass(prev);
    };
    TeXAtom.prototype.adjustTeXclass = function (prev) {
        return prev;
    };
    TeXAtom.defaults = __assign({}, AbstractMmlBaseNode.defaults);
    return TeXAtom;
}(AbstractMmlBaseNode));
export { TeXAtom };
TeXAtom.prototype.adjustTeXclass = MmlMo.prototype.adjustTeXclass;
//# sourceMappingURL=TeXAtom.js.map