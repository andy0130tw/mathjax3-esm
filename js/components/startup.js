var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { MathJax as MJGlobal, combineWithMathJax, combineDefaults } from './global.js';
import { PrioritizedList } from '../util/PrioritizedList.js';
;
export var Startup;
(function (Startup) {
    var extensions = new PrioritizedList();
    var visitor;
    var mathjax;
    Startup.constructors = {};
    Startup.input = [];
    Startup.output = null;
    Startup.handler = null;
    Startup.adaptor = null;
    Startup.elements = null;
    Startup.document = null;
    Startup.promise = new Promise(function (resolve, reject) {
        var doc = global.document;
        if (!doc || !doc.readyState || doc.readyState === 'complete' || doc.readyState === 'interactive') {
            resolve();
        }
        else {
            var listener = function () { return resolve(); };
            doc.defaultView.addEventListener('load', listener, true);
            doc.defaultView.addEventListener('DOMContentLoaded', listener, true);
        }
    });
    function toMML(node) {
        return visitor.visitTree(node, Startup.document);
    }
    Startup.toMML = toMML;
    ;
    function registerConstructor(name, constructor) {
        Startup.constructors[name] = constructor;
    }
    Startup.registerConstructor = registerConstructor;
    ;
    function useHandler(name, force) {
        if (force === void 0) { force = false; }
        if (!CONFIG.handler || force) {
            CONFIG.handler = name;
        }
    }
    Startup.useHandler = useHandler;
    ;
    function useAdaptor(name, force) {
        if (force === void 0) { force = false; }
        if (!CONFIG.adaptor || force) {
            CONFIG.adaptor = name;
        }
    }
    Startup.useAdaptor = useAdaptor;
    ;
    function useInput(name, force) {
        if (force === void 0) { force = false; }
        if (!inputSpecified || force) {
            CONFIG.input.push(name);
        }
    }
    Startup.useInput = useInput;
    ;
    function useOutput(name, force) {
        if (force === void 0) { force = false; }
        if (!CONFIG.output || force) {
            CONFIG.output = name;
        }
    }
    Startup.useOutput = useOutput;
    ;
    function extendHandler(extend, priority) {
        if (priority === void 0) { priority = 10; }
        extensions.add(extend, priority);
    }
    Startup.extendHandler = extendHandler;
    ;
    function defaultReady() {
        getComponents();
        makeMethods();
        Startup.promise = Startup.promise.then(function () { return CONFIG.pageReady(); });
    }
    Startup.defaultReady = defaultReady;
    ;
    function defaultPageReady() {
        return (CONFIG.typeset && MathJax.typesetPromise ? MathJax.typesetPromise(CONFIG.elements) : null);
    }
    Startup.defaultPageReady = defaultPageReady;
    ;
    function getComponents() {
        visitor = new MathJax._.core.MmlTree.SerializedMmlVisitor.SerializedMmlVisitor();
        mathjax = MathJax._.mathjax.mathjax;
        Startup.input = getInputJax();
        Startup.output = getOutputJax();
        Startup.adaptor = getAdaptor();
        if (Startup.handler) {
            mathjax.handlers.unregister(Startup.handler);
        }
        Startup.handler = getHandler();
        if (Startup.handler) {
            mathjax.handlers.register(Startup.handler);
            Startup.document = getDocument();
        }
    }
    Startup.getComponents = getComponents;
    ;
    function makeMethods() {
        var e_1, _a;
        if (Startup.input && Startup.output) {
            makeTypesetMethods();
        }
        var oname = (Startup.output ? Startup.output.name.toLowerCase() : '');
        try {
            for (var input_1 = __values(Startup.input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                var jax = input_1_1.value;
                var iname = jax.name.toLowerCase();
                makeMmlMethods(iname, jax);
                makeResetMethod(iname, jax);
                if (Startup.output) {
                    makeOutputMethods(iname, oname, jax);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Startup.makeMethods = makeMethods;
    ;
    function makeTypesetMethods() {
        MathJax.typeset = function (elements) {
            if (elements === void 0) { elements = null; }
            Startup.document.options.elements = elements;
            Startup.document.reset();
            Startup.document.render();
        };
        MathJax.typesetPromise = function (elements) {
            if (elements === void 0) { elements = null; }
            Startup.document.options.elements = elements;
            Startup.document.reset();
            return mathjax.handleRetriesFor(function () {
                Startup.document.render();
            });
        };
        MathJax.typesetClear = function () { return Startup.document.clear(); };
    }
    Startup.makeTypesetMethods = makeTypesetMethods;
    ;
    function makeOutputMethods(iname, oname, input) {
        var name = iname + '2' + oname;
        MathJax[name] =
            function (math, options) {
                if (options === void 0) { options = {}; }
                options.format = input.name;
                return Startup.document.convert(math, options);
            };
        MathJax[name + 'Promise'] =
            function (math, options) {
                if (options === void 0) { options = {}; }
                options.format = input.name;
                return mathjax.handleRetriesFor(function () { return Startup.document.convert(math, options); });
            };
        MathJax[oname + 'Stylesheet'] = function () { return Startup.output.styleSheet(Startup.document); };
        if ('getMetricsFor' in Startup.output) {
            MathJax.getMetricsFor = function (node, display) {
                return Startup.output.getMetricsFor(node, display);
            };
        }
    }
    Startup.makeOutputMethods = makeOutputMethods;
    ;
    function makeMmlMethods(name, input) {
        var STATE = MathJax._.core.MathItem.STATE;
        MathJax[name + '2mml'] =
            function (math, options) {
                if (options === void 0) { options = {}; }
                options.end = STATE.CONVERT;
                options.format = input.name;
                return toMML(Startup.document.convert(math, options));
            };
        MathJax[name + '2mmlPromise'] =
            function (math, options) {
                if (options === void 0) { options = {}; }
                options.end = STATE.CONVERT;
                options.format = input.name;
                return mathjax.handleRetriesFor(function () { return toMML(Startup.document.convert(math, options)); });
            };
    }
    Startup.makeMmlMethods = makeMmlMethods;
    ;
    function makeResetMethod(name, input) {
        if (name === 'tex') {
            MathJax.texReset = function (start) {
                if (start === void 0) { start = 0; }
                return input.parseOptions.tags.reset(start);
            };
        }
    }
    Startup.makeResetMethod = makeResetMethod;
    ;
    function getInputJax() {
        var e_2, _a;
        var jax = [];
        try {
            for (var _b = __values(CONFIG.input), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                var inputClass = Startup.constructors[name_1];
                if (inputClass) {
                    jax.push(new inputClass(MathJax.config[name_1]));
                }
                else {
                    throw Error('Input Jax "' + name_1 + '" is not defined (has it been loaded?)');
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return jax;
    }
    Startup.getInputJax = getInputJax;
    ;
    function getOutputJax() {
        var name = CONFIG.output;
        if (!name)
            return null;
        var outputClass = Startup.constructors[name];
        if (!outputClass) {
            throw Error('Output Jax "' + name + '" is not defined (has it been loaded?)');
        }
        return new outputClass(MathJax.config[name]);
    }
    Startup.getOutputJax = getOutputJax;
    ;
    function getAdaptor() {
        var name = CONFIG.adaptor;
        if (!name || name === 'none')
            return null;
        var adaptor = Startup.constructors[name];
        if (!adaptor) {
            throw Error('DOMAdaptor "' + name + '" is not defined (has it been loaded?)');
        }
        return adaptor(MathJax.config[name]);
    }
    Startup.getAdaptor = getAdaptor;
    ;
    function getHandler() {
        var e_3, _a;
        var name = CONFIG.handler;
        if (!name || name === 'none' || !Startup.adaptor)
            return null;
        var handlerClass = Startup.constructors[name];
        if (!handlerClass) {
            throw Error('Handler "' + name + '" is not defined (has it been loaded?)');
        }
        var handler = new handlerClass(Startup.adaptor, 5);
        try {
            for (var extensions_1 = __values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                var extend = extensions_1_1.value;
                handler = extend.item(handler);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (extensions_1_1 && !extensions_1_1.done && (_a = extensions_1.return)) _a.call(extensions_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return handler;
    }
    Startup.getHandler = getHandler;
    ;
    function getDocument(root) {
        if (root === void 0) { root = null; }
        return mathjax.document(root || CONFIG.document, __assign(__assign({}, MathJax.config.options), { InputJax: Startup.input, OutputJax: Startup.output }));
    }
    Startup.getDocument = getDocument;
})(Startup || (Startup = {}));
;
export var MathJax = MJGlobal;
if (typeof MathJax._.startup === 'undefined') {
    combineDefaults(MathJax.config, 'startup', {
        input: [],
        output: '',
        handler: null,
        adaptor: null,
        document: (typeof document === 'undefined' ? '' : document),
        elements: null,
        typeset: true,
        ready: Startup.defaultReady.bind(Startup),
        pageReady: Startup.defaultPageReady.bind(Startup)
    });
    combineWithMathJax({
        startup: Startup,
        options: {}
    });
}
export var CONFIG = MathJax.config.startup;
var inputSpecified = CONFIG.input.length !== 0;
//# sourceMappingURL=startup.js.map