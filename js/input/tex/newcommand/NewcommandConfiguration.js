var _a;
import { Configuration } from '../Configuration.js';
import { BeginEnvItem } from './NewcommandItems.js';
import { ExtensionMaps } from '../MapHandler.js';
import './NewcommandMappings.js';
var init = function (config) {
    if (config.handler['macro'].indexOf(ExtensionMaps.NEW_COMMAND) < 0) {
        config.append(Configuration.extension());
    }
};
export var NewcommandConfiguration = Configuration.create('newcommand', {
    handler: {
        macro: ['Newcommand-macros']
    },
    items: (_a = {},
        _a[BeginEnvItem.prototype.kind] = BeginEnvItem,
        _a),
    options: { maxMacros: 1000 },
    init: init
});
//# sourceMappingURL=NewcommandConfiguration.js.map