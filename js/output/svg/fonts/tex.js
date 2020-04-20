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
import { SVGFontData } from '../FontData.js';
import { CommonTeXFontMixin } from '../../common/fonts/tex.js';
import { boldItalic } from './tex/bold-italic.js';
import { bold } from './tex/bold.js';
import { doubleStruck } from './tex/double-struck.js';
import { frakturBold } from './tex/fraktur-bold.js';
import { fraktur } from './tex/fraktur.js';
import { italic } from './tex/italic.js';
import { largeop } from './tex/largeop.js';
import { monospace } from './tex/monospace.js';
import { normal } from './tex/normal.js';
import { sansSerifBoldItalic } from './tex/sans-serif-bold-italic.js';
import { sansSerifBold } from './tex/sans-serif-bold.js';
import { sansSerifItalic } from './tex/sans-serif-italic.js';
import { sansSerif } from './tex/sans-serif.js';
import { scriptBold } from './tex/script-bold.js';
import { script } from './tex/script.js';
import { smallop } from './tex/smallop.js';
import { texCalligraphicBold } from './tex/tex-calligraphic-bold.js';
import { texCalligraphic } from './tex/tex-calligraphic.js';
import { texMathit } from './tex/tex-mathit.js';
import { texOldstyleBold } from './tex/tex-oldstyle-bold.js';
import { texOldstyle } from './tex/tex-oldstyle.js';
import { texSize3 } from './tex/tex-size3.js';
import { texSize4 } from './tex/tex-size4.js';
import { texVariant } from './tex/tex-variant.js';
import { delimiters } from '../../common/fonts/tex/delimiters.js';
var TeXFont = (function (_super) {
    __extends(TeXFont, _super);
    function TeXFont() {
        var e_1, _a;
        var _this = _super.call(this) || this;
        var CLASS = _this.constructor;
        try {
            for (var _b = __values(Object.keys(CLASS.variantCacheIds)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var variant = _c.value;
                _this.variant[variant].cacheID = 'TEX-' + CLASS.variantCacheIds[variant];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _this;
    }
    TeXFont.defaultDelimiters = delimiters;
    TeXFont.defaultChars = {
        'normal': normal,
        'bold': bold,
        'italic': italic,
        'bold-italic': boldItalic,
        'double-struck': doubleStruck,
        'fraktur': fraktur,
        'bold-fraktur': frakturBold,
        'script': script,
        'bold-script': scriptBold,
        'sans-serif': sansSerif,
        'bold-sans-serif': sansSerifBold,
        'sans-serif-italic': sansSerifItalic,
        'sans-serif-bold-italic': sansSerifBoldItalic,
        'monospace': monospace,
        '-smallop': smallop,
        '-largeop': largeop,
        '-size3': texSize3,
        '-size4': texSize4,
        '-tex-calligraphic': texCalligraphic,
        '-tex-bold-calligraphic': texCalligraphicBold,
        '-tex-mathit': texMathit,
        '-tex-oldstyle': texOldstyle,
        '-tex-bold-oldstyle': texOldstyleBold,
        '-tex-variant': texVariant
    };
    TeXFont.variantCacheIds = {
        'normal': 'N',
        'bold': 'B',
        'italic': 'I',
        'bold-italic': 'BI',
        'double-struck': 'D',
        'fraktur': 'F',
        'bold-fraktur': 'BF',
        'script': 'S',
        'bold-script': 'BS',
        'sans-serif': 'SS',
        'bold-sans-serif': 'BSS',
        'sans-serif-italic': 'SSI',
        'sans-serif-bold-italic': 'SSBI',
        'monospace': 'M',
        '-smallop': 'SO',
        '-largeop': 'LO',
        '-size3': 'S3',
        '-size4': 'S4',
        '-tex-calligraphic': 'C',
        '-tex-bold-calligraphic': 'BC',
        '-tex-mathit': 'MI',
        '-tex-oldstyle': 'OS',
        '-tex-bold-oldstyle': 'BOS',
        '-tex-variant': 'V'
    };
    return TeXFont;
}(CommonTeXFontMixin(SVGFontData)));
export { TeXFont };
//# sourceMappingURL=tex.js.map