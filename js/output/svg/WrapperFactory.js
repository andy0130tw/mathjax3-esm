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
import { CommonWrapperFactory } from '../common/WrapperFactory.js';
import { SVGWrappers } from './Wrappers.js';
var SVGWrapperFactory = (function (_super) {
    __extends(SVGWrapperFactory, _super);
    function SVGWrapperFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jax = null;
        return _this;
    }
    SVGWrapperFactory.defaultNodes = SVGWrappers;
    return SVGWrapperFactory;
}(CommonWrapperFactory));
export { SVGWrapperFactory };
//# sourceMappingURL=WrapperFactory.js.map