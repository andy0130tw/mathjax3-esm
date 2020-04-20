import { liteAdaptor } from './liteAdaptor.js';
import { browserAdaptor } from './browserAdaptor.js';
var choose;
try {
    document;
    choose = browserAdaptor;
}
catch (e) {
    choose = liteAdaptor;
}
export var chooseAdaptor = choose;
//# sourceMappingURL=chooseAdaptor.js.map