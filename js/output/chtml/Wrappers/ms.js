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
import { CHTMLWrapper } from '../Wrapper.js';
import { CommonMsMixin } from '../../common/Wrappers/ms.js';
import { MmlMs } from '../../../core/MmlTree/MmlNodes/ms.js';
var CHTMLms = (function (_super) {
    __extends(CHTMLms, _super);
    function CHTMLms() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLms.kind = MmlMs.prototype.kind;
    return CHTMLms;
}(CommonMsMixin(CHTMLWrapper)));
export { CHTMLms };
//# sourceMappingURL=ms.js.map