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
import { CommonTeXAtomMixin } from '../../common/Wrappers/TeXAtom.js';
import { TeXAtom } from '../../../core/MmlTree/MmlNodes/TeXAtom.js';
import { TEXCLASS, TEXCLASSNAMES } from '../../../core/MmlTree/MmlNode.js';
var SVGTeXAtom = (function (_super) {
    __extends(SVGTeXAtom, _super);
    function SVGTeXAtom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGTeXAtom.prototype.toSVG = function (parent) {
        _super.prototype.toSVG.call(this, parent);
        this.adaptor.setAttribute(this.element, 'data-mjx-texclass', TEXCLASSNAMES[this.node.texClass]);
        if (this.node.texClass === TEXCLASS.VCENTER) {
            var bbox = this.childNodes[0].getBBox();
            var h = bbox.h, d = bbox.d;
            var a = this.font.params.axis_height;
            var dh = ((h + d) / 2 + a) - h;
            var translate = 'translate(0 ' + this.fixed(dh) + ')';
            this.adaptor.setAttribute(this.element, 'transform', translate);
        }
    };
    SVGTeXAtom.kind = TeXAtom.prototype.kind;
    return SVGTeXAtom;
}(CommonTeXAtomMixin(SVGWrapper)));
export { SVGTeXAtom };
//# sourceMappingURL=TeXAtom.js.map