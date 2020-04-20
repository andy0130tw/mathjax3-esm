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
import { AbstractMmlBaseNode } from '../MmlNode.js';
import { INHERIT } from '../Attributes.js';
var MmlMtd = (function (_super) {
    __extends(MmlMtd, _super);
    function MmlMtd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlMtd.prototype, "kind", {
        get: function () {
            return 'mtd';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmlMtd.prototype, "arity", {
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmlMtd.prototype, "linebreakContainer", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    MmlMtd.prototype.verifyChildren = function (options) {
        if (this.parent && !this.parent.isKind('mtr')) {
            this.mError(this.kind + ' can only be a child of an mtr or mlabeledtr', options, true);
            return;
        }
        _super.prototype.verifyChildren.call(this, options);
    };
    MmlMtd.prototype.setTeXclass = function (prev) {
        this.getPrevClass(prev);
        this.childNodes[0].setTeXclass(null);
        return this;
    };
    MmlMtd.defaults = __assign({}, AbstractMmlBaseNode.defaults, { rowspan: 1, columnspan: 1, rowalign: INHERIT, columnalign: INHERIT, groupalign: INHERIT });
    return MmlMtd;
}(AbstractMmlBaseNode));
export { MmlMtd };
//# sourceMappingURL=mtd.js.map