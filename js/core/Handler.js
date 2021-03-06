var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AbstractMathDocument } from './MathDocument.js';
var DefaultMathDocument = (function (_super) {
    __extends(DefaultMathDocument, _super);
    function DefaultMathDocument() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DefaultMathDocument;
}(AbstractMathDocument));
var AbstractHandler = (function () {
    function AbstractHandler(adaptor, priority) {
        if (priority === void 0) { priority = 5; }
        this.documentClass = DefaultMathDocument;
        this.adaptor = adaptor;
        this.priority = priority;
    }
    Object.defineProperty(AbstractHandler.prototype, "name", {
        get: function () {
            return this.constructor.NAME;
        },
        enumerable: true,
        configurable: true
    });
    AbstractHandler.prototype.handlesDocument = function (document) {
        return false;
    };
    AbstractHandler.prototype.create = function (document, options) {
        return new this.documentClass(document, this.adaptor, options);
    };
    AbstractHandler.NAME = 'generic';
    return AbstractHandler;
}());
export { AbstractHandler };
//# sourceMappingURL=Handler.js.map