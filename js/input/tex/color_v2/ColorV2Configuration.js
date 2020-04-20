import { CommandMap } from '../SymbolMap.js';
import { Configuration } from '../Configuration.js';
export var ColorV2Methods = {
    Color: function (parser, name) {
        var color = parser.GetArgument(name);
        var old = parser.stack.env['color'];
        parser.stack.env['color'] = color;
        var math = parser.ParseArg(name);
        if (old) {
            parser.stack.env['color'] = old;
        }
        else {
            delete parser.stack.env['color'];
        }
        var node = parser.create('node', 'mstyle', [math], { mathcolor: color });
        parser.Push(node);
    }
};
new CommandMap('colorV2', { color: 'Color' }, ColorV2Methods);
export var ColorConfiguration = Configuration.create('colorV2', { handler: { macro: ['colorV2'] } });
//# sourceMappingURL=ColorV2Configuration.js.map