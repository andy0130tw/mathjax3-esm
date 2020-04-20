import NodeUtil from '../NodeUtil.js';
var HtmlMethods = {};
HtmlMethods.Href = function (parser, name) {
    var url = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    NodeUtil.setAttribute(arg, 'href', url);
    parser.Push(arg);
};
HtmlMethods.Class = function (parser, name) {
    var CLASS = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    var oldClass = NodeUtil.getAttribute(arg, 'class');
    if (oldClass) {
        CLASS = oldClass + ' ' + CLASS;
    }
    NodeUtil.setAttribute(arg, 'class', CLASS);
    parser.Push(arg);
};
HtmlMethods.Style = function (parser, name) {
    var style = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    var oldStyle = NodeUtil.getAttribute(arg, 'style');
    if (oldStyle) {
        if (style.charAt(style.length - 1) !== ';') {
            style += ';';
        }
        style = oldStyle + ' ' + style;
    }
    NodeUtil.setAttribute(arg, 'style', style);
    parser.Push(arg);
};
HtmlMethods.Id = function (parser, name) {
    var ID = parser.GetArgument(name);
    var arg = GetArgumentMML(parser, name);
    NodeUtil.setAttribute(arg, 'id', ID);
    parser.Push(arg);
};
var GetArgumentMML = function (parser, name) {
    var arg = parser.ParseArg(name);
    if (!NodeUtil.isInferred(arg)) {
        return arg;
    }
    var children = NodeUtil.getChildren(arg);
    if (children.length === 1) {
        return children[0];
    }
    var mrow = parser.create('node', 'mrow');
    NodeUtil.copyChildren(arg, mrow);
    NodeUtil.copyAttributes(arg, mrow);
    return mrow;
};
export default HtmlMethods;
//# sourceMappingURL=HtmlMethods.js.map