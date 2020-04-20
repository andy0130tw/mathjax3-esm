export function protoItem(open, math, close, n, start, end, display) {
    if (display === void 0) { display = null; }
    var item = { open: open, math: math, close: close,
        n: n, start: { n: start }, end: { n: end }, display: display };
    return item;
}
var AbstractMathItem = (function () {
    function AbstractMathItem(math, jax, display, start, end) {
        if (display === void 0) { display = true; }
        if (start === void 0) { start = { i: 0, n: 0, delim: '' }; }
        if (end === void 0) { end = { i: 0, n: 0, delim: '' }; }
        this.root = null;
        this.typesetRoot = null;
        this._state = STATE.UNPROCESSED;
        this.metrics = {};
        this.bbox = {};
        this.inputData = {};
        this.outputData = {};
        this.math = math;
        this.inputJax = jax;
        this.display = display;
        this.start = start;
        this.end = end;
        this.root = null;
        this.typesetRoot = null;
        this.metrics = {};
        this.bbox = {};
        this.inputData = {};
        this.outputData = {};
    }
    Object.defineProperty(AbstractMathItem.prototype, "isEscaped", {
        get: function () {
            return this.display === null;
        },
        enumerable: true,
        configurable: true
    });
    AbstractMathItem.prototype.render = function (document) {
        document.renderActions.renderMath(this, document);
    };
    AbstractMathItem.prototype.rerender = function (document, start) {
        if (start === void 0) { start = STATE.RERENDER; }
        if (this.state() >= start) {
            this.state(start - 1);
        }
        document.renderActions.renderMath(this, document, start);
    };
    AbstractMathItem.prototype.convert = function (document, end) {
        if (end === void 0) { end = STATE.LAST; }
        document.renderActions.renderConvert(this, document, end);
    };
    AbstractMathItem.prototype.compile = function (document) {
        if (this.state() < STATE.COMPILED) {
            this.root = this.inputJax.compile(this, document);
            this.state(STATE.COMPILED);
        }
    };
    AbstractMathItem.prototype.typeset = function (document) {
        if (this.state() < STATE.TYPESET) {
            this.typesetRoot = document.outputJax[this.isEscaped ? 'escaped' : 'typeset'](this, document);
            this.state(STATE.TYPESET);
        }
    };
    AbstractMathItem.prototype.updateDocument = function (document) { };
    AbstractMathItem.prototype.removeFromDocument = function (restore) {
        if (restore === void 0) { restore = false; }
    };
    AbstractMathItem.prototype.setMetrics = function (em, ex, cwidth, lwidth, scale) {
        this.metrics = {
            em: em, ex: ex,
            containerWidth: cwidth,
            lineWidth: lwidth,
            scale: scale
        };
    };
    AbstractMathItem.prototype.state = function (state, restore) {
        if (state === void 0) { state = null; }
        if (restore === void 0) { restore = false; }
        if (state != null) {
            if (state < STATE.INSERTED && this._state >= STATE.INSERTED) {
                this.removeFromDocument(restore);
            }
            if (state < STATE.TYPESET && this._state >= STATE.TYPESET) {
                this.bbox = {};
                this.outputData = {};
            }
            if (state < STATE.COMPILED && this._state >= STATE.COMPILED) {
                this.inputData = {};
            }
            this._state = state;
        }
        return this._state;
    };
    AbstractMathItem.prototype.reset = function (restore) {
        if (restore === void 0) { restore = false; }
        this.state(STATE.UNPROCESSED);
    };
    return AbstractMathItem;
}());
export { AbstractMathItem };
export var STATE = {
    UNPROCESSED: 0,
    FINDMATH: 10,
    COMPILED: 20,
    CONVERT: 100,
    METRICS: 110,
    RERENDER: 125,
    TYPESET: 150,
    INSERTED: 200,
    LAST: 10000
};
export function newState(name, state) {
    if (name in STATE) {
        throw Error('State ' + name + ' already exists');
    }
    STATE[name] = state;
}
//# sourceMappingURL=MathItem.js.map