import { CommandMap } from '../SymbolMap.js';
import { Configuration } from '../Configuration.js';
import { ColorMethods } from './ColorMethods.js';
import { ColorModel } from './ColorUtil.js';
new CommandMap('color', {
    color: 'Color',
    textcolor: 'TextColor',
    definecolor: 'DefineColor',
    colorbox: 'ColorBox',
    fcolorbox: 'FColorBox'
}, ColorMethods);
var config = function (config, jax) {
    jax.parseOptions.options.color.model = new ColorModel();
};
export var ColorConfiguration = Configuration.create('color', {
    handler: {
        macro: ['color'],
    },
    options: {
        color: {
            padding: '5px',
            borderWidth: '2px'
        }
    },
    config: config
});
//# sourceMappingURL=ColorConfiguration.js.map