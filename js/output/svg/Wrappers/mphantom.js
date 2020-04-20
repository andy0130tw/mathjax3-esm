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
import { MmlMphantom } from '../../../core/MmlTree/MmlNodes/mphantom.js';
var SVGmphantom = (function (_super) {
    __extends(SVGmphantom, _super);
    function SVGmphantom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmphantom.prototype.toSVG = function (parent) {
        this.standardSVGnode(parent);
    };
    SVGmphantom.kind = MmlMphantom.prototype.kind;
    return SVGmphantom;
}(SVGWrapper));
export { SVGmphantom };
//# sourceMappingURL=mphantom.js.map