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
import { CommonMnMixin } from '../../common/Wrappers/mn.js';
import { MmlMn } from '../../../core/MmlTree/MmlNodes/mn.js';
var CHTMLmn = (function (_super) {
    __extends(CHTMLmn, _super);
    function CHTMLmn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmn.kind = MmlMn.prototype.kind;
    return CHTMLmn;
}(CommonMnMixin(CHTMLWrapper)));
export { CHTMLmn };
//# sourceMappingURL=mn.js.map