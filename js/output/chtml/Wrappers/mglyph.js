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
import { CommonMglyphMixin } from '../../common/Wrappers/mglyph.js';
import { MmlMglyph } from '../../../core/MmlTree/MmlNodes/mglyph.js';
var CHTMLmglyph = (function (_super) {
    __extends(CHTMLmglyph, _super);
    function CHTMLmglyph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmglyph.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        var _a = this.node.attributes.getList('src', 'alt'), src = _a.src, alt = _a.alt;
        var styles = {
            width: this.em(this.width),
            height: this.em(this.height)
        };
        if (this.valign) {
            styles.verticalAlign = this.em(this.valign);
        }
        var img = this.html('img', { src: src, style: styles, alt: alt, title: alt });
        this.adaptor.append(chtml, img);
    };
    CHTMLmglyph.kind = MmlMglyph.prototype.kind;
    CHTMLmglyph.styles = {
        'mjx-mglyph > img': {
            display: 'inline-block',
            border: 0,
            padding: 0
        }
    };
    return CHTMLmglyph;
}(CommonMglyphMixin(CHTMLWrapper)));
export { CHTMLmglyph };
//# sourceMappingURL=mglyph.js.map