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
import { CommonMiMixin } from '../../common/Wrappers/mi.js';
import { MmlMi } from '../../../core/MmlTree/MmlNodes/mi.js';
var SVGmi = (function (_super) {
    __extends(SVGmi, _super);
    function SVGmi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmi.kind = MmlMi.prototype.kind;
    return SVGmi;
}(CommonMiMixin(SVGWrapper)));
export { SVGmi };
//# sourceMappingURL=mi.js.map