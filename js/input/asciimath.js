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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { AbstractInputJax } from '../core/InputJax.js';
import { LegacyAsciiMath } from './asciimath/mathjax2/input/AsciiMath.js';
import { separateOptions } from '../util/Options.js';
import { FindAsciiMath } from './asciimath/FindAsciiMath.js';
var AsciiMath = (function (_super) {
    __extends(AsciiMath, _super);
    function AsciiMath(options) {
        var _this = this;
        var _a = __read(separateOptions(options, FindAsciiMath.OPTIONS), 2), am = _a[0], find = _a[1];
        _this = _super.call(this, am) || this;
        _this.findAsciiMath = _this.options['FindAsciiMath'] || new FindAsciiMath(find);
        return _this;
    }
    AsciiMath.prototype.compile = function (math, document) {
        return LegacyAsciiMath.Compile(math.math, math.display);
    };
    AsciiMath.prototype.findMath = function (strings) {
        return this.findAsciiMath.findMath(strings);
    };
    AsciiMath.NAME = 'AsciiMath';
    AsciiMath.OPTIONS = __assign({}, AbstractInputJax.OPTIONS, { FindAsciiMath: null });
    return AsciiMath;
}(AbstractInputJax));
export { AsciiMath };
//# sourceMappingURL=asciimath.js.map