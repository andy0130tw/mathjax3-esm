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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { Configuration, ConfigurationHandler } from '../Configuration.js';
import { CommandMap } from '../SymbolMap.js';
import TexError from '../TexError.js';
import { MathJax } from '../../../components/global.js';
import { Package } from '../../../components/package.js';
import { Loader, CONFIG as LOADERCONFIG } from '../../../components/loader.js';
import { mathjax } from '../../../mathjax.js';
import { expandable } from '../../../util/Options.js';
var MJCONFIG = MathJax.config;
function RegisterExtension(jax, name) {
    var _a;
    var require = jax.parseOptions.options.require;
    var extension = name.substr(require.prefix.length);
    if (require.required.indexOf(extension) < 0) {
        require.required.push(extension);
        RegisterDependencies(jax, LOADERCONFIG.dependencies[name]);
        var handler = ConfigurationHandler.get(extension);
        if (handler) {
            var options_1 = MJCONFIG[name] || {};
            if (handler.options && Object.keys(handler.options).length === 1 && handler.options[extension]) {
                options_1 = (_a = {}, _a[extension] = options_1, _a);
            }
            jax.configuration.register(handler, jax, options_1);
            if (handler.preprocessors.length && !handler.options.configured) {
                handler.options.configured = true;
                mathjax.retryAfter(Promise.resolve());
            }
        }
    }
}
function RegisterDependencies(jax, names) {
    var e_1, _a;
    if (names === void 0) { names = []; }
    var prefix = jax.parseOptions.options.require.prefix;
    try {
        for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
            var name_1 = names_1_1.value;
            if (name_1.substr(0, prefix.length) === prefix) {
                RegisterExtension(jax, name_1);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
export function RequireLoad(parser, name) {
    var options = parser.options.require;
    var allow = options.allow;
    var extension = (name.substr(0, 1) === '[' ? '' : options.prefix) + name;
    var allowed = (allow.hasOwnProperty(extension) ? allow[extension] :
        allow.hasOwnProperty(name) ? allow[name] : options.defaultAllow);
    if (!allowed) {
        throw new TexError('BadRequire', 'Extension "%1" is now allowed to be loaded', extension);
    }
    if (Package.packages.has(extension)) {
        RegisterExtension(options.jax, extension);
    }
    else {
        mathjax.retryAfter(Loader.load(extension));
    }
}
function config(config, jax) {
    var options = jax.parseOptions.options.require;
    options.jax = jax;
    options.required = __spread(jax.options.packages);
    var prefix = options.prefix;
    if (prefix.match(/[^_a-zA-Z0-9]/)) {
        throw Error('Illegal characters used in \\require prefix');
    }
    if (!LOADERCONFIG.paths[prefix]) {
        LOADERCONFIG.paths[prefix] = '[mathjax]/input/tex/extensions';
    }
    options.prefix = '[' + prefix + ']/';
}
export var RequireMethods = {
    Require: function (parser, name) {
        var required = parser.GetArgument(name);
        if (required.match(/[^_a-zA-Z0-9]/) || required === '') {
            throw new TexError('BadPackageName', 'Argument for %1 is not a valid package name', name);
        }
        RequireLoad(parser, required);
    }
};
export var options = {
    require: {
        allow: expandable({
            base: false,
            'all-packages': false
        }),
        defaultAllow: true,
        prefix: 'tex'
    }
};
new CommandMap('require', { require: 'Require' }, RequireMethods);
export var RequireConfiguration = Configuration.create('require', { handler: { macro: ['require'] }, config: config, options: options });
//# sourceMappingURL=RequireConfiguration.js.map