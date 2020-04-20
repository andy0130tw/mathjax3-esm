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
import { AbstractNodeFactory } from '../Tree/NodeFactory.js';
import { MML } from './MML.js';
var MmlFactory = (function (_super) {
    __extends(MmlFactory, _super);
    function MmlFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlFactory.prototype, "MML", {
        get: function () {
            return this.node;
        },
        enumerable: true,
        configurable: true
    });
    MmlFactory.defaultNodes = MML;
    return MmlFactory;
}(AbstractNodeFactory));
export { MmlFactory };
//# sourceMappingURL=MmlFactory.js.map