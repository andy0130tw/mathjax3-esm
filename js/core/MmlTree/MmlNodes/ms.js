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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AbstractMmlTokenNode, TEXCLASS } from '../MmlNode.js';
var MmlMs = (function (_super) {
    __extends(MmlMs, _super);
    function MmlMs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.texClass = TEXCLASS.ORD;
        return _this;
    }
    Object.defineProperty(MmlMs.prototype, "kind", {
        get: function () {
            return 'ms';
        },
        enumerable: true,
        configurable: true
    });
    MmlMs.defaults = __assign(__assign({}, AbstractMmlTokenNode.defaults), { lquote: '"', rquote: '"' });
    return MmlMs;
}(AbstractMmlTokenNode));
export { MmlMs };
//# sourceMappingURL=ms.js.map