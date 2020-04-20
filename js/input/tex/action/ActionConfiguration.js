import { Configuration } from '../Configuration.js';
import TexParser from '../TexParser.js';
import { CommandMap } from '../SymbolMap.js';
import BaseMethods from '../base/BaseMethods.js';
export var ActionMethods = {};
ActionMethods.Macro = BaseMethods.Macro;
ActionMethods.Toggle = function (parser, name) {
    var children = [];
    var arg;
    while ((arg = parser.GetArgument(name)) !== '\\endtoggle') {
        children.push(new TexParser(arg, parser.stack.env, parser.configuration).mml());
    }
    parser.Push(parser.create('node', 'maction', children, { actiontype: 'toggle' }));
};
ActionMethods.Mathtip = function (parser, name) {
    var arg = parser.ParseArg(name);
    var tip = parser.ParseArg(name);
    parser.Push(parser.create('node', 'maction', [arg, tip], { actiontype: 'tooltip' }));
};
new CommandMap('action-macros', {
    toggle: 'Toggle',
    mathtip: 'Mathtip',
    texttip: ['Macro', '\\mathtip{#1}{\\text{#2}}', 2]
}, ActionMethods);
export var ActionConfiguration = Configuration.create('action', { handler: { macro: ['action-macros'] } });
//# sourceMappingURL=ActionConfiguration.js.map