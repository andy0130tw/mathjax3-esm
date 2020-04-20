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
import { BaseItem } from '../StackItem.js';
import { TEXCLASS } from '../../../core/MmlTree/MmlNode.js';
import ParseUtil from '../ParseUtil.js';
var BraketItem = (function (_super) {
    __extends(BraketItem, _super);
    function BraketItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BraketItem.prototype, "kind", {
        get: function () {
            return 'braket';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BraketItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    BraketItem.prototype.checkItem = function (item) {
        if (item.isKind('close')) {
            return [[this.factory.create('mml', this.toMml())], true];
        }
        if (item.isKind('mml')) {
            this.Push(item.toMml());
            if (this.getProperty('single')) {
                return [[this.toMml()], true];
            }
            return BaseItem.fail;
        }
        return _super.prototype.checkItem.call(this, item);
    };
    BraketItem.prototype.toMml = function () {
        var inner = _super.prototype.toMml.call(this);
        var open = this.getProperty('open');
        var close = this.getProperty('close');
        if (this.getProperty('stretchy')) {
            return ParseUtil.fenced(this.factory.configuration, open, inner, close);
        }
        var attrs = { fence: true, stretchy: false, symmetric: true, texClass: TEXCLASS.OPEN };
        var openNode = this.create('token', 'mo', attrs, open);
        attrs.texClass = TEXCLASS.CLOSE;
        var closeNode = this.create('token', 'mo', attrs, close);
        var mrow = this.create('node', 'mrow', [openNode, inner, closeNode], { open: open, close: close, texClass: TEXCLASS.INNER });
        return mrow;
    };
    return BraketItem;
}(BaseItem));
export { BraketItem };
//# sourceMappingURL=BraketItems.js.map