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
import { AbstractFindMath } from '../../core/FindMath.js';
import { quotePattern } from '../../util/string.js';
import { protoItem } from '../../core/MathItem.js';
var FindAsciiMath = (function (_super) {
    __extends(FindAsciiMath, _super);
    function FindAsciiMath(options) {
        var _this = _super.call(this, options) || this;
        _this.getPatterns();
        return _this;
    }
    FindAsciiMath.prototype.getPatterns = function () {
        var _this = this;
        var options = this.options;
        var starts = [];
        this.end = {};
        options['delimiters'].forEach(function (delims) { return _this.addPattern(starts, delims, false); });
        this.start = new RegExp(starts.join('|'), 'g');
        this.hasPatterns = (starts.length > 0);
    };
    FindAsciiMath.prototype.addPattern = function (starts, delims, display) {
        var _a = __read(delims, 2), open = _a[0], close = _a[1];
        starts.push(quotePattern(open));
        this.end[open] = [close, display, new RegExp(quotePattern(close), 'g')];
    };
    FindAsciiMath.prototype.findEnd = function (text, n, start, end) {
        var _a = __read(end, 3), close = _a[0], display = _a[1], pattern = _a[2];
        var i = pattern.lastIndex = start.index + start[0].length;
        var match = pattern.exec(text);
        return (!match ? null : protoItem(start[0], text.substr(i, match.index - i), match[0], n, start.index, match.index + match[0].length, display));
    };
    FindAsciiMath.prototype.findMathInString = function (math, n, text) {
        var start, match;
        this.start.lastIndex = 0;
        while ((start = this.start.exec(text))) {
            match = this.findEnd(text, n, start, this.end[start[0]]);
            if (match) {
                math.push(match);
                this.start.lastIndex = match.end.n;
            }
        }
    };
    FindAsciiMath.prototype.findMath = function (strings) {
        var math = [];
        if (this.hasPatterns) {
            for (var i = 0, m = strings.length; i < m; i++) {
                this.findMathInString(math, i, strings[i]);
            }
        }
        return math;
    };
    FindAsciiMath.OPTIONS = {
        delimiters: [['`', '`']],
    };
    return FindAsciiMath;
}(AbstractFindMath));
export { FindAsciiMath };
//# sourceMappingURL=FindAsciiMath.js.map