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
import { SVGWrapper } from '../Wrapper.js';
import { CommonMtdMixin } from '../../common/Wrappers/mtd.js';
import { MmlMtd } from '../../../core/MmlTree/MmlNodes/mtd.js';
var SVGmtd = (function (_super) {
    __extends(SVGmtd, _super);
    function SVGmtd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmtd.prototype.placeCell = function (x, y, W, H, D) {
        var bbox = this.getBBox();
        var h = Math.max(bbox.h, .75);
        var d = Math.max(bbox.d, .25);
        var calign = this.node.attributes.get('columnalign');
        var ralign = this.node.attributes.get('rowalign');
        var alignX = this.getAlignX(W, bbox, calign);
        var alignY = this.getAlignY(H, D, h, d, ralign);
        this.place(x + alignX, y + alignY);
        return [alignX, alignY];
    };
    SVGmtd.prototype.placeColor = function (x, y, W, H) {
        var adaptor = this.adaptor;
        var child = adaptor.firstChild(this.element);
        if (child && adaptor.kind(child) === 'rect' && adaptor.getAttribute(child, 'data-bgcolor')) {
            adaptor.setAttribute(child, 'x', this.fixed(x));
            adaptor.setAttribute(child, 'y', this.fixed(y));
            adaptor.setAttribute(child, 'width', this.fixed(W));
            adaptor.setAttribute(child, 'height', this.fixed(H));
        }
    };
    SVGmtd.kind = MmlMtd.prototype.kind;
    return SVGmtd;
}(CommonMtdMixin(SVGWrapper)));
export { SVGmtd };
//# sourceMappingURL=mtd.js.map