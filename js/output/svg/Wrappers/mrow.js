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
import { CommonMrowMixin } from '../../common/Wrappers/mrow.js';
import { CommonInferredMrowMixin } from '../../common/Wrappers/mrow.js';
import { MmlMrow, MmlInferredMrow } from '../../../core/MmlTree/MmlNodes/mrow.js';
var SVGmrow = (function (_super) {
    __extends(SVGmrow, _super);
    function SVGmrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmrow.prototype.toSVG = function (parent) {
        var svg = (this.node.isInferred ? (this.element = parent) : this.standardSVGnode(parent));
        this.addChildren(svg);
    };
    SVGmrow.kind = MmlMrow.prototype.kind;
    return SVGmrow;
}(CommonMrowMixin(SVGWrapper)));
export { SVGmrow };
var SVGinferredMrow = (function (_super) {
    __extends(SVGinferredMrow, _super);
    function SVGinferredMrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGinferredMrow.kind = MmlInferredMrow.prototype.kind;
    return SVGinferredMrow;
}(CommonInferredMrowMixin(SVGmrow)));
export { SVGinferredMrow };
//# sourceMappingURL=mrow.js.map