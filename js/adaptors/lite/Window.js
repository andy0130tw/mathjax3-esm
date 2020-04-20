import { LiteElement } from './Element.js';
import { LiteDocument } from './Document.js';
import { LiteList } from './List.js';
import { LiteParser } from './Parser.js';
var LiteWindow = (function () {
    function LiteWindow() {
        this.DOMParser = LiteParser;
        this.NodeList = LiteList;
        this.HTMLCollection = LiteList;
        this.HTMLElement = LiteElement;
        this.DocumentFragment = LiteList;
        this.Document = LiteDocument;
        this.document = new LiteDocument();
    }
    return LiteWindow;
}());
export { LiteWindow };
//# sourceMappingURL=Window.js.map