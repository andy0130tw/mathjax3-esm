import { HandlerList } from './core/HandlerList.js';
import { handleRetriesFor, retryAfter } from './util/Retries.js';
export var mathjax = {
    version: '3.0.5',
    handlers: new HandlerList(),
    document: function (document, options) {
        return mathjax.handlers.document(document, options);
    },
    handleRetriesFor: handleRetriesFor,
    retryAfter: retryAfter,
    asyncLoad: null,
};
//# sourceMappingURL=mathjax.js.map