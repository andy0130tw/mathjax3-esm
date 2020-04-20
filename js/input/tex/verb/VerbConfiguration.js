import { Configuration } from '../Configuration.js';
import { TexConstant } from '../TexConstants.js';
import { CommandMap } from '../SymbolMap.js';
import TexError from '../TexError.js';
export var VerbMethods = {};
VerbMethods.Verb = function (parser, name) {
    var c = parser.GetNext();
    var start = ++parser.i;
    if (c === '') {
        throw new TexError('MissingArgFor', 'Missing argument for %1', name);
    }
    while (parser.i < parser.string.length &&
        parser.string.charAt(parser.i) !== c) {
        parser.i++;
    }
    if (parser.i === parser.string.length) {
        throw new TexError('NoClosingDelim', 'Can\'t find closing delimiter for %1', parser.currentCS);
    }
    var text = parser.string.slice(start, parser.i).replace(/ /g, '\u00A0');
    parser.i++;
    parser.Push(parser.create('token', 'mtext', { mathvariant: TexConstant.Variant.MONOSPACE }, text));
};
new CommandMap('verb', { verb: 'Verb' }, VerbMethods);
export var VerbConfiguration = Configuration.create('verb', { handler: { macro: ['verb'] } });
//# sourceMappingURL=VerbConfiguration.js.map