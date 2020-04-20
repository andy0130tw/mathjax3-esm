import './base/BaseConfiguration.js';
import './action/ActionConfiguration.js';
import './ams/AmsConfiguration.js';
import './ams_cd/AmsCdConfiguration.js';
import './bbox/BboxConfiguration.js';
import './boldsymbol/BoldsymbolConfiguration.js';
import './braket/BraketConfiguration.js';
import './bussproofs/BussproofsConfiguration.js';
import './cancel/CancelConfiguration.js';
import './color/ColorConfiguration.js';
import './color_v2/ColorV2Configuration.js';
import './config_macros/ConfigMacrosConfiguration.js';
import './enclose/EncloseConfiguration.js';
import './extpfeil/ExtpfeilConfiguration.js';
import './html/HtmlConfiguration.js';
import './mhchem/MhchemConfiguration.js';
import './newcommand/NewcommandConfiguration.js';
import './noerrors/NoErrorsConfiguration.js';
import './noundefined/NoUndefinedConfiguration.js';
import './physics/PhysicsConfiguration.js';
import './tag_format/TagFormatConfiguration.js';
import './unicode/UnicodeConfiguration.js';
import './verb/VerbConfiguration.js';
if (typeof MathJax !== 'undefined' && MathJax.loader) {
    MathJax.loader.preLoad('[tex]/action', '[tex]/ams', '[tex]/amsCd', '[tex]/bbox', '[tex]/boldsymbol', '[tex]/braket', '[tex]/bussproofs', '[tex]/cancel', '[tex]/color', '[tex]/color_v2', '[tex]/enclose', '[tex]/extpfeil', '[tex]/html', '[tex]/mhchem', '[tex]/newcommand', '[tex]/noerrors', '[tex]/noundefined', '[tex]/physics', '[tex]/unicode', '[tex]/verb', '[tex]/configMacros', '[tex]/tagFormat');
}
export var AllPackages = [
    'base',
    'action',
    'ams',
    'amsCd',
    'bbox',
    'boldsymbol',
    'braket',
    'bussproofs',
    'cancel',
    'color',
    'enclose',
    'extpfeil',
    'html',
    'mhchem',
    'newcommand',
    'noerrors',
    'noundefined',
    'unicode',
    'verb',
    'configMacros',
    'tagFormat'
];
//# sourceMappingURL=AllPackages.js.map