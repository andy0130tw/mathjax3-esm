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
import { CommonMsMixin } from '../../common/Wrappers/ms.js';
import { MmlMs } from '../../../core/MmlTree/MmlNodes/ms.js';
var SVGms = (function (_super) {
    __extends(SVGms, _super);
    function SVGms() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGms.kind = MmlMs.prototype.kind;
    return SVGms;
}(CommonMsMixin(SVGWrapper)));
export { SVGms };
//# sourceMappingURL=ms.js.map