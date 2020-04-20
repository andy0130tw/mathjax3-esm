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
import { CHTMLWrappers } from './Wrappers.js';
var CHTMLWrapperFactory = (function (_super) {
    __extends(CHTMLWrapperFactory, _super);
    function CHTMLWrapperFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLWrapperFactory.defaultNodes = CHTMLWrappers;
    return CHTMLWrapperFactory;
}(CommonWrapperFactory));
export { CHTMLWrapperFactory };
//# sourceMappingURL=WrapperFactory.js.map