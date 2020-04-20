var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Configuration } from '../Configuration.js';
import NodeUtil from '../NodeUtil.js';
import { TexConstant } from '../TexConstants.js';
import { CommandMap } from '../SymbolMap.js';
import { NodeFactory } from '../NodeFactory.js';
var BOLDVARIANT = {};
BOLDVARIANT[TexConstant.Variant.NORMAL] = TexConstant.Variant.BOLD;
BOLDVARIANT[TexConstant.Variant.ITALIC] = TexConstant.Variant.BOLDITALIC;
BOLDVARIANT[TexConstant.Variant.FRAKTUR] = TexConstant.Variant.BOLDFRAKTUR;
BOLDVARIANT[TexConstant.Variant.SCRIPT] = TexConstant.Variant.BOLDSCRIPT;
BOLDVARIANT[TexConstant.Variant.SANSSERIF] = TexConstant.Variant.BOLDSANSSERIF;
BOLDVARIANT['-tex-calligraphic'] = '-tex-bold-calligraphic';
BOLDVARIANT['-tex-oldstyle'] = '-tex-bold-oldstyle';
export var BoldsymbolMethods = {};
BoldsymbolMethods.Boldsymbol = function (parser, name) {
    var boldsymbol = parser.stack.env['boldsymbol'];
    parser.stack.env['boldsymbol'] = true;
    var mml = parser.ParseArg(name);
    parser.stack.env['boldsymbol'] = boldsymbol;
    parser.Push(mml);
};
new CommandMap('boldsymbol', { boldsymbol: 'Boldsymbol' }, BoldsymbolMethods);
export function createBoldToken(factory, kind, def, text) {
    var token = NodeFactory.createToken(factory, kind, def, text);
    if (kind !== 'mtext' &&
        factory.configuration.parser.stack.env['boldsymbol']) {
        NodeUtil.setProperty(token, 'fixBold', true);
        factory.configuration.addNode('fixBold', token);
    }
    return token;
}
export function rewriteBoldTokens(arg) {
    var e_1, _a;
    try {
        for (var _b = __values(arg.data.getList('fixBold')), _c = _b.next(); !_c.done; _c = _b.next()) {
            var node = _c.value;
            if (NodeUtil.getProperty(node, 'fixBold')) {
                var variant = NodeUtil.getAttribute(node, 'mathvariant');
                if (variant == null) {
                    NodeUtil.setAttribute(node, 'mathvariant', TexConstant.Variant.BOLD);
                }
                else {
                    NodeUtil.setAttribute(node, 'mathvariant', BOLDVARIANT[variant] || variant);
                }
                NodeUtil.removeProperties(node, 'fixBold');
            }
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
;
export var BoldsymbolConfiguration = Configuration.create('boldsymbol', { handler: { macro: ['boldsymbol'] },
    nodes: { 'token': createBoldToken },
    postprocessors: [rewriteBoldTokens] });
//# sourceMappingURL=BoldsymbolConfiguration.js.map