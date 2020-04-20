import { mathjax } from '../mathjax.js';
import { HTMLHandler } from './html/HTMLHandler.js';
export function RegisterHTMLHandler(adaptor) {
    var handler = new HTMLHandler(adaptor);
    mathjax.handlers.register(handler);
    return handler;
}
//# sourceMappingURL=html.js.map