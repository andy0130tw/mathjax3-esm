import { Configuration } from '../Configuration.js';
import { TexConstant } from '../TexConstants.js';
import { CommandMap } from '../SymbolMap.js';
import ParseUtil from '../ParseUtil.js';
import { ENCLOSE_OPTIONS } from '../enclose/EncloseConfiguration.js';
export var CancelMethods = {};
CancelMethods.Cancel = function (parser, name, notation) {
    var attr = parser.GetBrackets(name, '');
    var math = parser.ParseArg(name);
    var def = ParseUtil.keyvalOptions(attr, ENCLOSE_OPTIONS);
    def['notation'] = notation;
    parser.Push(parser.create('node', 'menclose', [math], def));
};
CancelMethods.CancelTo = function (parser, name) {
    var attr = parser.GetBrackets(name, '');
    var value = parser.ParseArg(name);
    var math = parser.ParseArg(name);
    var def = ParseUtil.keyvalOptions(attr, ENCLOSE_OPTIONS);
    def['notation'] = [TexConstant.Notation.UPDIAGONALSTRIKE,
        TexConstant.Notation.UPDIAGONALARROW,
        TexConstant.Notation.NORTHEASTARROW].join(' ');
    value = parser.create('node', 'mpadded', [value], { depth: '-.1em', height: '+.1em', voffset: '.1em' });
    parser.Push(parser.create('node', 'msup', [parser.create('node', 'menclose', [math], def), value]));
};
new CommandMap('cancel', {
    cancel: ['Cancel', TexConstant.Notation.UPDIAGONALSTRIKE],
    bcancel: ['Cancel', TexConstant.Notation.DOWNDIAGONALSTRIKE],
    xcancel: ['Cancel', TexConstant.Notation.UPDIAGONALSTRIKE + ' ' +
            TexConstant.Notation.DOWNDIAGONALSTRIKE],
    cancelto: 'CancelTo'
}, CancelMethods);
export var CancelConfiguration = Configuration.create('cancel', { handler: { macro: ['cancel'] } });
//# sourceMappingURL=CancelConfiguration.js.map