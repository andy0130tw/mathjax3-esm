var _a;
import { Configuration } from '../Configuration.js';
import { BraketItem } from './BraketItems.js';
import './BraketMappings.js';
export var BraketConfiguration = Configuration.create('braket', {
    handler: {
        character: ['Braket-characters'],
        macro: ['Braket-macros']
    },
    items: (_a = {},
        _a[BraketItem.prototype.kind] = BraketItem,
        _a)
});
//# sourceMappingURL=BraketConfiguration.js.map