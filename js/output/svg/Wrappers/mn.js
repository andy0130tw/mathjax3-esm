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
import { CommonMnMixin } from '../../common/Wrappers/mn.js';
import { MmlMn } from '../../../core/MmlTree/MmlNodes/mn.js';
var SVGmn = (function (_super) {
    __extends(SVGmn, _super);
    function SVGmn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmn.kind = MmlMn.prototype.kind;
    return SVGmn;
}(CommonMnMixin(SVGWrapper)));
export { SVGmn };
//# sourceMappingURL=mn.js.map