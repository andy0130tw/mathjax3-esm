import { Configuration } from '../Configuration.js';
import { CommandMap } from '../SymbolMap.js';
import TexError from '../TexError.js';
import BaseMethods from '../base/BaseMethods.js';
import AmsMethods from '../ams/AmsMethods.js';
import { mhchemParser, texify } from './mhchem_parser.js';
var MhchemMethods = {};
MhchemMethods.Macro = BaseMethods.Macro;
MhchemMethods.xArrow = AmsMethods.xArrow;
MhchemMethods.Machine = function (parser, name, machine) {
    try {
        var arg = parser.GetArgument(name);
        var data = mhchemParser.go(arg, machine);
        var tex = texify.go(data);
        parser.string = tex + parser.string.substr(parser.i);
        parser.i = 0;
    }
    catch (err) {
        throw new TexError(err[0], err[1], err.slice(2));
    }
};
new CommandMap('mhchem', { ce: ['Machine', 'ce'],
    pu: ['Machine', 'pu'],
    longrightleftharpoons: ['Macro',
        '\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}'],
    longRightleftharpoons: ['Macro',
        '\\stackrel{\\textstyle{-}\\!\\!{\\rightharpoonup}}{\\smash{\\leftharpoondown}}'],
    longLeftrightharpoons: ['Macro',
        '\\stackrel{\\textstyle\\vphantom{{-}}{\\rightharpoonup}}{\\smash{{\\leftharpoondown}\\!\\!{-}}}'],
    longleftrightarrows: ['Macro',
        '\\stackrel{\\longrightarrow}{\\smash{\\longleftarrow}\\Rule{0px}{.25em}{0px}}'],
    tripledash: ['Macro',
        '\\vphantom{-}\\raise2mu{\\kern2mu\\tiny\\text{-}\\kern1mu\\text{-}\\kern1mu\\text{-}\\kern2mu}'],
    xrightarrow: ['xArrow', 0x2192, 5, 6],
    xleftarrow: ['xArrow', 0x2190, 7, 3],
    xleftrightarrow: ['xArrow', 0x2194, 6, 6],
    xrightleftharpoons: ['xArrow', 0x21CC, 5, 7],
    xRightleftharpoons: ['xArrow', 0x21CC, 5, 7],
    xLeftrightharpoons: ['xArrow', 0x21CC, 5, 7]
}, MhchemMethods);
export var MhchemConfiguration = Configuration.create('mhchem', { handler: { macro: ['mhchem'] } });
//# sourceMappingURL=MhchemConfiguration.js.map