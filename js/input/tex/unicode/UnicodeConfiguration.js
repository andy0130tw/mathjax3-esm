import { Configuration } from '../Configuration.js';
import TexError from '../TexError.js';
import { CommandMap } from '../SymbolMap.js';
import ParseUtil from '../ParseUtil.js';
import NodeUtil from '../NodeUtil.js';
import { numeric } from '../../../util/Entities.js';
export var UnicodeMethods = {};
var UnicodeCache = {};
UnicodeMethods.Unicode = function (parser, name) {
    var HD = parser.GetBrackets(name);
    var HDsplit = null;
    var font = null;
    if (HD) {
        if (HD.replace(/ /g, '').
            match(/^(\d+(\.\d*)?|\.\d+),(\d+(\.\d*)?|\.\d+)$/)) {
            HDsplit = HD.replace(/ /g, '').split(/,/);
            font = parser.GetBrackets(name);
        }
        else {
            font = HD;
        }
    }
    var n = ParseUtil.trimSpaces(parser.GetArgument(name)).replace(/^0x/, 'x');
    if (!n.match(/^(x[0-9A-Fa-f]+|[0-9]+)$/)) {
        throw new TexError('BadUnicode', 'Argument to \\unicode must be a number');
    }
    var N = parseInt(n.match(/^x/) ? '0' + n : n);
    if (!UnicodeCache[N]) {
        UnicodeCache[N] = [800, 200, font, N];
    }
    else if (!font) {
        font = UnicodeCache[N][2];
    }
    if (HDsplit) {
        UnicodeCache[N][0] = Math.floor(parseFloat(HDsplit[0]) * 1000);
        UnicodeCache[N][1] = Math.floor(parseFloat(HDsplit[1]) * 1000);
    }
    var variant = parser.stack.env.font;
    var def = {};
    if (font) {
        UnicodeCache[N][2] = def.fontfamily = font.replace(/'/g, '\'');
        if (variant) {
            if (variant.match(/bold/)) {
                def.fontweight = 'bold';
            }
            if (variant.match(/italic|-mathit/)) {
                def.fontstyle = 'italic';
            }
        }
    }
    else if (variant) {
        def.mathvariant = variant;
    }
    var node = parser.create('token', 'mtext', def, numeric(n));
    NodeUtil.setProperty(node, 'unicode', true);
    parser.Push(node);
};
new CommandMap('unicode', { unicode: 'Unicode' }, UnicodeMethods);
export var UnicodeConfiguration = Configuration.create('unicode', { handler: { macro: ['unicode'] } });
//# sourceMappingURL=UnicodeConfiguration.js.map