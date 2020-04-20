import NodeUtil from '../NodeUtil.js';
import ParseUtil from '../ParseUtil.js';
function padding(colorPadding) {
    var pad = "+" + colorPadding;
    var unit = colorPadding.replace(/^.*?([a-z]*)$/, '$1');
    var pad2 = 2 * parseFloat(pad);
    return {
        width: "+" + pad2 + unit,
        height: pad,
        depth: pad,
        lspace: colorPadding,
    };
}
;
export var ColorMethods = {};
ColorMethods.Color = function (parser, name) {
    var model = parser.GetBrackets(name, '');
    var colorDef = parser.GetArgument(name);
    var colorModel = parser.options.color.model;
    var color = colorModel.getColor(model, colorDef);
    var style = parser.itemFactory.create('style')
        .setProperties({ styles: { mathcolor: color } });
    parser.stack.env['color'] = color;
    parser.Push(style);
};
ColorMethods.TextColor = function (parser, name) {
    var model = parser.GetBrackets(name, '');
    var colorDef = parser.GetArgument(name);
    var colorModel = parser.options.color.model;
    var color = colorModel.getColor(model, colorDef);
    var old = parser.stack.env['color'];
    parser.stack.env['color'] = color;
    var math = parser.ParseArg(name);
    if (old) {
        parser.stack.env['color'] = old;
    }
    else {
        delete parser.stack.env['color'];
    }
    var node = parser.create('node', 'mstyle', [math], { mathcolor: color });
    parser.Push(node);
};
ColorMethods.DefineColor = function (parser, name) {
    var cname = parser.GetArgument(name);
    var model = parser.GetArgument(name);
    var def = parser.GetArgument(name);
    var colorModel = parser.options.color.model;
    colorModel.defineColor(model, cname, def);
};
ColorMethods.ColorBox = function (parser, name) {
    var cname = parser.GetArgument(name);
    var math = ParseUtil.internalMath(parser, parser.GetArgument(name));
    var options = parser.options.color;
    var colorModel = options.model;
    var node = parser.create('node', 'mpadded', math, {
        mathbackground: colorModel.getColor('named', cname)
    });
    NodeUtil.setProperties(node, padding(options.padding));
    parser.Push(node);
};
ColorMethods.FColorBox = function (parser, name) {
    var fname = parser.GetArgument(name);
    var cname = parser.GetArgument(name);
    var math = ParseUtil.internalMath(parser, parser.GetArgument(name));
    var options = parser.options.color;
    var colorModel = options.model;
    var node = parser.create('node', 'mpadded', math, {
        mathbackground: colorModel.getColor('named', cname),
        style: "border: " + options.borderWidth + " solid " + colorModel.getColor('named', fname)
    });
    NodeUtil.setProperties(node, padding(options.padding));
    parser.Push(node);
};
//# sourceMappingURL=ColorMethods.js.map