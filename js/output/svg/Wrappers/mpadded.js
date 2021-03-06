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
import { CommonMpaddedMixin } from '../../common/Wrappers/mpadded.js';
import { MmlMpadded } from '../../../core/MmlTree/MmlNodes/mpadded.js';
var SVGmpadded = (function (_super) {
    __extends(SVGmpadded, _super);
    function SVGmpadded() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmpadded.prototype.toSVG = function (parent) {
        var svg = this.standardSVGnode(parent);
        var _a = __read(this.getDimens(), 9), H = _a[0], D = _a[1], W = _a[2], dh = _a[3], dd = _a[4], dw = _a[5], x = _a[6], y = _a[7], dx = _a[8];
        var align = this.node.attributes.get('data-align') || 'left';
        var X = x + dx - (dw < 0 && align !== 'left' ? align === 'center' ? dw / 2 : dw : 0);
        if (X || y) {
            svg = this.adaptor.append(svg, this.svg('g'));
            this.place(X, y, svg);
        }
        this.addChildren(svg);
    };
    SVGmpadded.kind = MmlMpadded.prototype.kind;
    return SVGmpadded;
}(CommonMpaddedMixin(SVGWrapper)));
export { SVGmpadded };
//# sourceMappingURL=mpadded.js.map