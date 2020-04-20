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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import { SVGWrapper } from '../Wrapper.js';
import { CommonMathMixin } from '../../common/Wrappers/math.js';
import { MmlMath } from '../../../core/MmlTree/MmlNodes/math.js';
import { BBox } from '../BBox.js';
var SVGmath = (function (_super) {
    __extends(SVGmath, _super);
    function SVGmath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGmath.prototype.toSVG = function (parent) {
        _super.prototype.toSVG.call(this, parent);
        var adaptor = this.adaptor;
        var display = (this.node.attributes.get('display') === 'block');
        if (display) {
            adaptor.setAttribute(this.jax.container, 'display', 'true');
            this.handleDisplay();
        }
        if (this.jax.document.options.internalSpeechTitles) {
            this.handleSpeech();
        }
    };
    SVGmath.prototype.handleDisplay = function () {
        var _a = __read(this.getAlignShift(), 2), align = _a[0], shift = _a[1];
        if (align !== 'center') {
            this.adaptor.setAttribute(this.jax.container, 'justify', align);
        }
        if (this.bbox.pwidth === BBox.fullWidth) {
            this.adaptor.setAttribute(this.jax.container, 'width', 'full');
            if (this.jax.table) {
                var _b = this.jax.table.getBBox(), L = _b.L, w = _b.w, R = _b.R;
                if (align === 'right') {
                    R = Math.max(R || -shift, -shift);
                }
                else if (align === 'left') {
                    L = Math.max(L || shift, shift);
                }
                else if (align === 'center') {
                    w += 2 * Math.abs(shift);
                }
                this.jax.minwidth = Math.max(0, L + w + R);
            }
        }
        else {
            this.jax.shift = shift;
        }
    };
    SVGmath.prototype.handleSpeech = function () {
        var e_1, _a;
        var adaptor = this.adaptor;
        var attributes = this.node.attributes;
        var speech = (attributes.get('aria-label') || attributes.get('data-semantic-speech'));
        if (speech) {
            var id = this.getTitleID();
            var label = this.svg('title', { id: id }, [this.text(speech)]);
            adaptor.insert(label, adaptor.firstChild(this.element));
            adaptor.setAttribute(this.element, 'aria-labeledby', id);
            adaptor.removeAttribute(this.element, 'aria-label');
            try {
                for (var _b = __values(this.childNodes[0].childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    adaptor.setAttribute(child.element, 'aria-hidden', 'true');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    SVGmath.prototype.getTitleID = function () {
        return 'mjx-svg-title-' + String(this.jax.options.titleID++);
    };
    SVGmath.prototype.setChildPWidths = function (recompute, w, clear) {
        if (w === void 0) { w = null; }
        if (clear === void 0) { clear = true; }
        return _super.prototype.setChildPWidths.call(this, recompute, this.parent ? w : this.metrics.containerWidth / this.jax.pxPerEm, false);
    };
    SVGmath.kind = MmlMath.prototype.kind;
    SVGmath.styles = {
        'mjx-container[jax="SVG"][display="true"]': {
            display: 'block',
            'text-align': 'center',
            margin: '1em 0'
        },
        'mjx-container[jax="SVG"][display="true"][width="full"]': {
            display: 'flex'
        },
        'mjx-container[jax="SVG"][justify="left"]': {
            'text-align': 'left'
        },
        'mjx-container[jax="SVG"][justify="right"]': {
            'text-align': 'right'
        }
    };
    return SVGmath;
}(CommonMathMixin(SVGWrapper)));
export { SVGmath };
//# sourceMappingURL=math.js.map