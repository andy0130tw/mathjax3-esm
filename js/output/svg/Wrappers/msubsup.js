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
import { SVGscriptbase } from './scriptbase.js';
import { CommonMsubMixin } from '../../common/Wrappers/msubsup.js';
import { CommonMsupMixin } from '../../common/Wrappers/msubsup.js';
import { CommonMsubsupMixin } from '../../common/Wrappers/msubsup.js';
import { MmlMsubsup, MmlMsub, MmlMsup } from '../../../core/MmlTree/MmlNodes/msubsup.js';
var SVGmsub = (function (_super) {
    __extends(SVGmsub, _super);
    function SVGmsub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmsub.kind = MmlMsub.prototype.kind;
    SVGmsub.useIC = false;
    return SVGmsub;
}(CommonMsubMixin(SVGscriptbase)));
export { SVGmsub };
var SVGmsup = (function (_super) {
    __extends(SVGmsup, _super);
    function SVGmsup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmsup.kind = MmlMsup.prototype.kind;
    SVGmsup.useIC = true;
    return SVGmsup;
}(CommonMsupMixin(SVGscriptbase)));
export { SVGmsup };
var SVGmsubsup = (function (_super) {
    __extends(SVGmsubsup, _super);
    function SVGmsubsup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmsubsup.prototype.toSVG = function (parent) {
        var svg = this.standardSVGnode(parent);
        var _a = __read([this.baseChild, this.supChild, this.subChild], 3), base = _a[0], sup = _a[1], sub = _a[2];
        var bbox = base.getBBox();
        var _b = __read(this.getUVQ(bbox, sub.getBBox(), sup.getBBox()), 2), u = _b[0], v = _b[1];
        var x = this.baseCore.bbox.ic ? this.coreIC() * this.coreScale() : 0;
        base.toSVG(svg);
        sup.toSVG(svg);
        sub.toSVG(svg);
        sub.place(bbox.w * bbox.rscale, v);
        sup.place(bbox.w * bbox.rscale + x, u);
    };
    SVGmsubsup.kind = MmlMsubsup.prototype.kind;
    SVGmsubsup.useIC = false;
    return SVGmsubsup;
}(CommonMsubsupMixin(SVGscriptbase)));
export { SVGmsubsup };
//# sourceMappingURL=msubsup.js.map