import ParseUtil from '../ParseUtil.js';
import NodeUtil from '../NodeUtil.js';
import { TexConstant } from '../TexConstants.js';
import TexParser from '../TexParser.js';
import TexError from '../TexError.js';
import { Macro } from '../Symbol.js';
import { ExtensionMaps } from '../MapHandler.js';
import BaseMethods from '../base/BaseMethods.js';
import { TEXCLASS } from '../../../core/MmlTree/MmlNode.js';
var AmsMethods = {};
AmsMethods.AmsEqnArray = function (parser, begin, numbered, taggable, align, spacing, style) {
    var args = parser.GetBrackets('\\begin{' + begin.getName() + '}');
    var array = BaseMethods.EqnArray(parser, begin, numbered, taggable, align, spacing, style);
    return ParseUtil.setArrayAlign(array, args);
};
AmsMethods.AlignAt = function (parser, begin, numbered, taggable) {
    var name = begin.getName();
    var n, valign, align = '', spacing = [];
    if (!taggable) {
        valign = parser.GetBrackets('\\begin{' + name + '}');
    }
    n = parser.GetArgument('\\begin{' + name + '}');
    if (n.match(/[^0-9]/)) {
        throw new TexError('PositiveIntegerArg', 'Argument to %1 must me a positive integer', '\\begin{' + name + '}');
    }
    var count = parseInt(n, 10);
    while (count > 0) {
        align += 'rl';
        spacing.push('0em 0em');
        count--;
    }
    var spaceStr = spacing.join(' ');
    if (taggable) {
        return AmsMethods.EqnArray(parser, begin, numbered, taggable, align, spaceStr);
    }
    var array = AmsMethods.EqnArray(parser, begin, numbered, taggable, align, spaceStr);
    return ParseUtil.setArrayAlign(array, valign);
};
AmsMethods.Multline = function (parser, begin, numbered) {
    parser.Push(begin);
    ParseUtil.checkEqnEnv(parser);
    var item = parser.itemFactory.create('multline', numbered, parser.stack);
    item.arraydef = {
        displaystyle: true,
        rowspacing: '.5em',
        columnwidth: '100%',
        width: parser.options['multlineWidth'],
        side: parser.options['tagSide'],
        minlabelspacing: parser.options['tagIndent']
    };
    return item;
};
AmsMethods.HandleDeclareOp = function (parser, name) {
    var limits = (parser.GetStar() ? '' : '\\nolimits\\SkipLimits');
    var cs = ParseUtil.trimSpaces(parser.GetArgument(name));
    if (cs.charAt(0) === '\\') {
        cs = cs.substr(1);
    }
    var op = parser.GetArgument(name);
    if (!op.match(/\\text/)) {
        op = op.replace(/\*/g, '\\text{*}').replace(/-/g, '\\text{-}');
    }
    parser.configuration.handlers.retrieve(ExtensionMaps.NEW_COMMAND).
        add(cs, new Macro(cs, AmsMethods.Macro, ['\\mathop{\\rm ' + op + '}' + limits]));
};
AmsMethods.HandleOperatorName = function (parser, name) {
    var limits = (parser.GetStar() ? '' : '\\nolimits\\SkipLimits');
    var op = ParseUtil.trimSpaces(parser.GetArgument(name));
    if (!op.match(/\\text/)) {
        op = op.replace(/\*/g, '\\text{*}').replace(/-/g, '\\text{-}');
    }
    parser.string = '\\mathop{\\rm ' + op + '}' + limits + ' ' +
        parser.string.slice(parser.i);
    parser.i = 0;
};
AmsMethods.SkipLimits = function (parser, name) {
    var c = parser.GetNext(), i = parser.i;
    if (c === '\\' && ++parser.i && parser.GetCS() !== 'limits') {
        parser.i = i;
    }
};
AmsMethods.MultiIntegral = function (parser, name, integral) {
    var next = parser.GetNext();
    if (next === '\\') {
        var i = parser.i;
        next = parser.GetArgument(name);
        parser.i = i;
        if (next === '\\limits') {
            if (name === '\\idotsint') {
                integral = '\\!\\!\\mathop{\\,\\,' + integral + '}';
            }
            else {
                integral = '\\!\\!\\!\\mathop{\\,\\,\\,' + integral + '}';
            }
        }
    }
    parser.string = integral + ' ' + parser.string.slice(parser.i);
    parser.i = 0;
};
AmsMethods.xArrow = function (parser, name, chr, l, r) {
    var def = { width: '+' + ParseUtil.Em((l + r) / 18), lspace: ParseUtil.Em(l / 18) };
    var bot = parser.GetBrackets(name);
    var first = parser.ParseArg(name);
    var arrow = parser.create('token', 'mo', { stretchy: true, texClass: TEXCLASS.REL }, String.fromCharCode(chr));
    var mml = parser.create('node', 'munderover', [arrow]);
    var mpadded = parser.create('node', 'mpadded', [first], def);
    NodeUtil.setAttribute(mpadded, 'voffset', '.15em');
    NodeUtil.setChild(mml, mml.over, mpadded);
    if (bot) {
        var bottom = new TexParser(bot, parser.stack.env, parser.configuration).mml();
        mpadded = parser.create('node', 'mpadded', [bottom], def);
        NodeUtil.setAttribute(mpadded, 'voffset', '-.24em');
        NodeUtil.setChild(mml, mml.under, mpadded);
    }
    NodeUtil.setProperty(mml, 'subsupOK', true);
    parser.Push(mml);
};
AmsMethods.HandleShove = function (parser, name, shove) {
    var top = parser.stack.Top();
    if (top.kind !== 'multline') {
        throw new TexError('CommandOnlyAllowedInEnv', '%1 only allowed in %2 environment', parser.currentCS, 'multline');
    }
    if (top.Size()) {
        throw new TexError('CommandAtTheBeginingOfLine', '%1 must come at the beginning of the line', parser.currentCS);
    }
    top.setProperty('shove', shove);
};
AmsMethods.CFrac = function (parser, name) {
    var lr = ParseUtil.trimSpaces(parser.GetBrackets(name, ''));
    var num = parser.GetArgument(name);
    var den = parser.GetArgument(name);
    var lrMap = {
        l: TexConstant.Align.LEFT, r: TexConstant.Align.RIGHT, '': ''
    };
    var numNode = new TexParser('\\strut\\textstyle{' + num + '}', parser.stack.env, parser.configuration).mml();
    var denNode = new TexParser('\\strut\\textstyle{' + den + '}', parser.stack.env, parser.configuration).mml();
    var frac = parser.create('node', 'mfrac', [numNode, denNode]);
    lr = lrMap[lr];
    if (lr == null) {
        throw new TexError('IllegalAlign', 'Illegal alignment specified in %1', parser.currentCS);
    }
    if (lr) {
        NodeUtil.setProperties(frac, { numalign: lr, denomalign: lr });
    }
    parser.Push(frac);
};
AmsMethods.Genfrac = function (parser, name, left, right, thick, style) {
    if (left == null) {
        left = parser.GetDelimiterArg(name);
    }
    if (right == null) {
        right = parser.GetDelimiterArg(name);
    }
    if (thick == null) {
        thick = parser.GetArgument(name);
    }
    if (style == null) {
        style = ParseUtil.trimSpaces(parser.GetArgument(name));
    }
    var num = parser.ParseArg(name);
    var den = parser.ParseArg(name);
    var frac = parser.create('node', 'mfrac', [num, den]);
    if (thick !== '') {
        NodeUtil.setAttribute(frac, 'linethickness', thick);
    }
    if (left || right) {
        NodeUtil.setProperty(frac, 'withDelims', true);
        frac = ParseUtil.fixedFence(parser.configuration, left, frac, right);
    }
    if (style !== '') {
        var styleDigit = parseInt(style, 10);
        var styleAlpha = ['D', 'T', 'S', 'SS'][styleDigit];
        if (styleAlpha == null) {
            throw new TexError('BadMathStyleFor', 'Bad math style for %1', parser.currentCS);
        }
        frac = parser.create('node', 'mstyle', [frac]);
        if (styleAlpha === 'D') {
            NodeUtil.setProperties(frac, { displaystyle: true, scriptlevel: 0 });
        }
        else {
            NodeUtil.setProperties(frac, { displaystyle: false,
                scriptlevel: styleDigit - 1 });
        }
    }
    parser.Push(frac);
};
AmsMethods.HandleTag = function (parser, name) {
    if (!parser.tags.currentTag.taggable && parser.tags.env) {
        throw new TexError('CommandNotAllowedInEnv', '%1 not allowed in %2 environment', parser.currentCS, parser.tags.env);
    }
    if (parser.tags.currentTag.tag) {
        throw new TexError('MultipleCommand', 'Multiple %1', parser.currentCS);
    }
    var star = parser.GetStar();
    var tagId = ParseUtil.trimSpaces(parser.GetArgument(name));
    parser.tags.tag(tagId, star);
};
AmsMethods.HandleNoTag = BaseMethods.HandleNoTag;
AmsMethods.HandleRef = BaseMethods.HandleRef;
AmsMethods.Macro = BaseMethods.Macro;
AmsMethods.Accent = BaseMethods.Accent;
AmsMethods.Tilde = BaseMethods.Tilde;
AmsMethods.Array = BaseMethods.Array;
AmsMethods.Spacer = BaseMethods.Spacer;
AmsMethods.NamedOp = BaseMethods.NamedOp;
AmsMethods.EqnArray = BaseMethods.EqnArray;
export default AmsMethods;
//# sourceMappingURL=AmsMethods.js.map