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
import { SVGWrapper } from '../Wrapper.js';
import { CommonScriptbaseMixin } from '../../common/Wrappers/scriptbase.js';
var SVGscriptbase = (function (_super) {
    __extends(SVGscriptbase, _super);
    function SVGscriptbase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGscriptbase.prototype.toSVG = function (parent) {
        var svg = this.standardSVGnode(parent);
        var bbox = this.baseChild.getBBox();
        var sbox = this.script.getBBox();
        var _a = __read(this.getOffset(bbox, sbox), 2), x = _a[0], v = _a[1];
        this.baseChild.toSVG(svg);
        this.script.toSVG(svg);
        this.script.place(bbox.w * bbox.rscale + x, v);
    };
    SVGscriptbase.kind = 'scriptbase';
    SVGscriptbase.useIC = false;
    return SVGscriptbase;
}(CommonScriptbaseMixin(SVGWrapper)));
export { SVGscriptbase };
//# sourceMappingURL=scriptbase.js.map