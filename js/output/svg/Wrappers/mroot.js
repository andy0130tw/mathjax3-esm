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
import { SVGmsqrt } from './msqrt.js';
import { CommonMrootMixin } from '../../common/Wrappers/mroot.js';
import { MmlMroot } from '../../../core/MmlTree/MmlNodes/mroot.js';
var SVGmroot = (function (_super) {
    __extends(SVGmroot, _super);
    function SVGmroot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmroot.prototype.addRoot = function (ROOT, root, sbox, H) {
        root.toSVG(ROOT);
        var _a = __read(this.getRootDimens(sbox, H), 3), x = _a[0], h = _a[1], dx = _a[2];
        var bbox = root.getBBox();
        root.place(dx * bbox.rscale, h);
        this.dx = x;
    };
    SVGmroot.kind = MmlMroot.prototype.kind;
    return SVGmroot;
}(CommonMrootMixin(SVGmsqrt)));
export { SVGmroot };
//# sourceMappingURL=mroot.js.map