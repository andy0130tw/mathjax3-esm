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
import { CommonMspaceMixin } from '../../common/Wrappers/mspace.js';
import { MmlMspace } from '../../../core/MmlTree/MmlNodes/mspace.js';
var CHTMLmspace = (function (_super) {
    __extends(CHTMLmspace, _super);
    function CHTMLmspace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmspace.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        var _a = this.getBBox(), w = _a.w, h = _a.h, d = _a.d;
        if (w < 0) {
            this.adaptor.setStyle(chtml, 'marginRight', this.em(w));
            w = 0;
        }
        if (w) {
            this.adaptor.setStyle(chtml, 'width', this.em(w));
        }
        h = Math.max(0, h + d);
        if (h) {
            this.adaptor.setStyle(chtml, 'height', this.em(Math.max(0, h)));
        }
        if (d) {
            this.adaptor.setStyle(chtml, 'verticalAlign', this.em(-d));
        }
    };
    CHTMLmspace.kind = MmlMspace.prototype.kind;
    return CHTMLmspace;
}(CommonMspaceMixin(CHTMLWrapper)));
export { CHTMLmspace };
//# sourceMappingURL=mspace.js.map