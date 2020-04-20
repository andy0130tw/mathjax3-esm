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
import { SVGWrapper } from '../Wrapper.js';
import { CommonMfencedMixin } from '../../common/Wrappers/mfenced.js';
import { MmlMfenced } from '../../../core/MmlTree/MmlNodes/mfenced.js';
var SVGmfenced = (function (_super) {
    __extends(SVGmfenced, _super);
    function SVGmfenced() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmfenced.prototype.toSVG = function (parent) {
        var svg = this.standardSVGnode(parent);
        this.setChildrenParent(this.mrow);
        this.mrow.toSVG(svg);
        this.setChildrenParent(this);
    };
    SVGmfenced.prototype.setChildrenParent = function (parent) {
        var e_1, _a;
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.parent = parent;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    SVGmfenced.kind = MmlMfenced.prototype.kind;
    return SVGmfenced;
}(CommonMfencedMixin(SVGWrapper)));
export { SVGmfenced };
//# sourceMappingURL=mfenced.js.map