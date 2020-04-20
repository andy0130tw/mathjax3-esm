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
import { CommonMtextMixin } from '../../common/Wrappers/mtext.js';
import { MmlMtext } from '../../../core/MmlTree/MmlNodes/mtext.js';
var CHTMLmtext = (function (_super) {
    __extends(CHTMLmtext, _super);
    function CHTMLmtext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmtext.kind = MmlMtext.prototype.kind;
    return CHTMLmtext;
}(CommonMtextMixin(CHTMLWrapper)));
export { CHTMLmtext };
//# sourceMappingURL=mtext.js.map