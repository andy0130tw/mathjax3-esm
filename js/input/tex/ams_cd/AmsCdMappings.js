import * as sm from '../SymbolMap.js';
import ParseMethods from '../ParseMethods.js';
import AmsCdMethods from './AmsCdMethods.js';
new sm.EnvironmentMap('amsCd_environment', ParseMethods.environment, { CD: 'CD' }, AmsCdMethods);
new sm.CommandMap('amsCd_macros', {
    minCDarrowwidth: 'minCDarrowwidth',
    minCDarrowheight: 'minCDarrowheight',
}, AmsCdMethods);
new sm.MacroMap('amsCd_special', { '@': 'arrow' }, AmsCdMethods);
//# sourceMappingURL=AmsCdMappings.js.map