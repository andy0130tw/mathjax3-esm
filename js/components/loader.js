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
import { Package } from './package.js';
;
export var Loader;
(function (Loader) {
    function ready() {
        var e_1, _a;
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        if (names.length === 0) {
            names = Array.from(Package.packages.keys());
        }
        var promises = [];
        try {
            for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                var name_1 = names_1_1.value;
                var extension = Package.packages.get(name_1) || new Package(name_1, true);
                promises.push(extension.promise);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Promise.all(promises);
    }
    Loader.ready = ready;
    ;
    function load() {
        var e_2, _a;
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        if (names.length === 0) {
            return Promise.resolve();
        }
        var promises = [];
        try {
            for (var names_2 = __values(names), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                var name_2 = names_2_1.value;
                var extension = Package.packages.get(name_2);
                if (!extension) {
                    extension = new Package(name_2);
                    extension.provides(CONFIG.provides[name_2]);
                }
                extension.checkNoLoad();
                promises.push(extension.promise);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (names_2_1 && !names_2_1.done && (_a = names_2.return)) _a.call(names_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        Package.loadAll();
        return Promise.all(promises);
    }
    Loader.load = load;
    ;
    function preLoad() {
        var e_3, _a;
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        try {
            for (var names_3 = __values(names), names_3_1 = names_3.next(); !names_3_1.done; names_3_1 = names_3.next()) {
                var name_3 = names_3_1.value;
                var extension = Package.packages.get(name_3);
                if (!extension) {
                    extension = new Package(name_3, true);
                    extension.provides(CONFIG.provides[name_3]);
                }
                extension.loaded();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (names_3_1 && !names_3_1.done && (_a = names_3.return)) _a.call(names_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    Loader.preLoad = preLoad;
    ;
    function defaultReady() {
        if (typeof MathJax.startup !== 'undefined') {
            MathJax.config.startup.ready();
        }
    }
    Loader.defaultReady = defaultReady;
    ;
    function getRoot() {
        var root = __dirname + '/../../es5';
        if (typeof document !== 'undefined') {
            var script = document.currentScript || document.getElementById('MathJax-script');
            if (script) {
                root = script.src.replace(/\/[^\/]*$/, '');
            }
        }
        return root;
    }
    Loader.getRoot = getRoot;
})(Loader || (Loader = {}));
;
export var MathJax = MJGlobal;
if (typeof MathJax.loader === 'undefined') {
    combineDefaults(MathJax.config, 'loader', {
        paths: {
            mathjax: Loader.getRoot()
        },
        source: {},
        dependencies: {},
        provides: {},
        load: [],
        ready: Loader.defaultReady.bind(Loader),
        failed: function (error) { return console.log("MathJax(" + (error.package || '?') + "): " + error.message); },
        require: null
    });
    combineWithMathJax({
        loader: Loader
    });
}
export var CONFIG = MathJax.config.loader;
//# sourceMappingURL=loader.js.map