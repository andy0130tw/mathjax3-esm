var _a;
import { Configuration } from '../Configuration.js';
import { ProofTreeItem } from './BussproofsItems.js';
import { saveDocument, clearDocument, balanceRules, makeBsprAttributes } from './BussproofsUtil.js';
import './BussproofsMappings.js';
export var BussproofsConfiguration = Configuration.create('bussproofs', { handler: {
        macro: ['Bussproofs-macros'],
        environment: ['Bussproofs-environments']
    },
    items: (_a = {},
        _a[ProofTreeItem.prototype.kind] = ProofTreeItem,
        _a),
    preprocessors: [
        [saveDocument, 1]
    ],
    postprocessors: [
        [clearDocument, 3],
        [makeBsprAttributes, 2],
        [balanceRules, 1]
    ]
});
//# sourceMappingURL=BussproofsConfiguration.js.map