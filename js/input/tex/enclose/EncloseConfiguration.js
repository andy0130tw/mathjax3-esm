import { Configuration } from '../Configuration.js';
import { CommandMap } from '../SymbolMap.js';
import ParseUtil from '../ParseUtil.js';
export var ENCLOSE_OPTIONS = {
    'data-arrowhead': 1,
    color: 1,
    mathcolor: 1,
    background: 1,
    mathbackground: 1,
    'data-padding': 1,
    'data-thickness': 1
};
export var EncloseMethods = {};
EncloseMethods.Enclose = function (parser, name) {
    var notation = parser.GetArgument(name).replace(/,/g, ' ');
    var attr = parser.GetBrackets(name, '');
    var math = parser.ParseArg(name);
    var def = ParseUtil.keyvalOptions(attr, ENCLOSE_OPTIONS);
    def.notation = notation;
    parser.Push(parser.create('node', 'menclose', [math], def));
};
new CommandMap('enclose', { enclose: 'Enclose' }, EncloseMethods);
export var EncloseConfiguration = Configuration.create('enclose', { handler: { macro: ['enclose'] } });
//# sourceMappingURL=EncloseConfiguration.js.map