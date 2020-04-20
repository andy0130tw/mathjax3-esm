import { HTMLAdaptor } from './HTMLAdaptor.js';
export function jsdomAdaptor(JSDOM) {
    return new HTMLAdaptor(new JSDOM().window);
}
//# sourceMappingURL=jsdomAdaptor.js.map