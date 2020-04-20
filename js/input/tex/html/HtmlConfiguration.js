import { Configuration } from '../Configuration.js';
import { CommandMap } from '../SymbolMap.js';
import HtmlMethods from './HtmlMethods.js';
new CommandMap('html_macros', {
    href: 'Href',
    'class': 'Class',
    style: 'Style',
    cssId: 'Id'
}, HtmlMethods);
export var HtmlConfiguration = Configuration.create('html', { handler: { macro: ['html_macros'] } });
//# sourceMappingURL=HtmlConfiguration.js.map