import { Configuration } from '../Configuration.js';
function noUndefined(parser, name) {
    var textNode = parser.create('text', '\\' + name);
    parser.Push(parser.create('node', 'mtext', [], { mathcolor: 'red' }, textNode));
}
;
export var NoUndefinedConfiguration = Configuration.create('noundefined', { fallback: { macro: noUndefined } });
//# sourceMappingURL=NoUndefinedConfiguration.js.map