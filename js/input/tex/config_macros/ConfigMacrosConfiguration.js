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
import { expandable } from '../../../util/Options.js';
import { CommandMap } from '../SymbolMap.js';
import { Macro } from '../Symbol.js';
import NewcommandMethods from '../newcommand/NewcommandMethods.js';
var MACROSMAP = 'configMacrosMap';
function configMacrosInit(config) {
    var macrosMap = new CommandMap(MACROSMAP, {}, {});
    config.append(Configuration.create('configMacroDefinitions', { handler: { macro: [MACROSMAP] } }));
}
function configMacrosConfig(config, jax) {
    var e_1, _a;
    var macrosMap = jax.parseOptions.handlers.retrieve(MACROSMAP);
    var macros = jax.parseOptions.options.macros;
    try {
        for (var _b = __values(Object.keys(macros)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var cs = _c.value;
            var def = (typeof macros[cs] === 'string' ? [macros[cs]] : macros[cs]);
            var macro = Array.isArray(def[2]) ?
                new Macro(cs, NewcommandMethods.MacroWithTemplate, def.slice(0, 2).concat(def[2])) :
                new Macro(cs, NewcommandMethods.Macro, def);
            macrosMap.add(cs, macro);
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
export var ConfigMacrosConfiguration = Configuration.create('configMacros', {
    init: configMacrosInit,
    config: configMacrosConfig,
    options: { macros: expandable({}) }
});
//# sourceMappingURL=ConfigMacrosConfiguration.js.map