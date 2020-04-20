import { LiteElement } from './Element.js';
var LiteDocument = (function () {
    function LiteDocument() {
        this.root = new LiteElement('html', {}, [
            this.head = new LiteElement('head'),
            this.body = new LiteElement('body')
        ]);
    }
    Object.defineProperty(LiteDocument.prototype, "kind", {
        get: function () {
            return '#document';
        },
        enumerable: true,
        configurable: true
    });
    return LiteDocument;
}());
export { LiteDocument };
//# sourceMappingURL=Document.js.map