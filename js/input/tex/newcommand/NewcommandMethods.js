import TexError from '../TexError.js';
import * as sm from '../SymbolMap.js';
import BaseMethods from '../base/BaseMethods.js';
import ParseUtil from '../ParseUtil.js';
import NewcommandUtil from './NewcommandUtil.js';
var NewcommandMethods = {};
NewcommandMethods.NewCommand = function (parser, name) {
    var cs = ParseUtil.trimSpaces(parser.GetArgument(name));
    var n = parser.GetBrackets(name);
    var opt = parser.GetBrackets(name);
    var def = parser.GetArgument(name);
    if (cs.charAt(0) === '\\') {
        cs = cs.substr(1);
    }
    if (!cs.match(/^(.|[a-z]+)$/i)) {
        throw new TexError('IllegalControlSequenceName', 'Illegal control sequence name for %1', name);
    }
    if (n) {
        n = ParseUtil.trimSpaces(n);
        if (!n.match(/^[0-9]+$/)) {
            throw new TexError('IllegalParamNumber', 'Illegal number of parameters specified in %1', name);
        }
    }
    NewcommandUtil.addMacro(parser, cs, NewcommandMethods.Macro, [def, n, opt]);
};
NewcommandMethods.NewEnvironment = function (parser, name) {
    var env = ParseUtil.trimSpaces(parser.GetArgument(name));
    var n = parser.GetBrackets(name);
    var opt = parser.GetBrackets(name);
    var bdef = parser.GetArgument(name);
    var edef = parser.GetArgument(name);
    if (n) {
        n = ParseUtil.trimSpaces(n);
        if (!n.match(/^[0-9]+$/)) {
            throw new TexError('IllegalParamNumber', 'Illegal number of parameters specified in %1', name);
        }
    }
    NewcommandUtil.addEnvironment(parser, env, NewcommandMethods.BeginEnv, [true, bdef, edef, n, opt]);
};
NewcommandMethods.MacroDef = function (parser, name) {
    var cs = NewcommandUtil.GetCSname(parser, name);
    var params = NewcommandUtil.GetTemplate(parser, name, '\\' + cs);
    var def = parser.GetArgument(name);
    !(params instanceof Array) ?
        NewcommandUtil.addMacro(parser, cs, NewcommandMethods.Macro, [def, params]) :
        NewcommandUtil.addMacro(parser, cs, NewcommandMethods.MacroWithTemplate, [def].concat(params));
};
NewcommandMethods.Let = function (parser, name) {
    var cs = NewcommandUtil.GetCSname(parser, name);
    var c = parser.GetNext();
    if (c === '=') {
        parser.i++;
        c = parser.GetNext();
    }
    var handlers = parser.configuration.handlers;
    if (c === '\\') {
        name = NewcommandUtil.GetCSname(parser, name);
        var macro_1 = handlers.get('delimiter').lookup('\\' + name);
        if (macro_1) {
            NewcommandUtil.addDelimiter(parser, '\\' + cs, macro_1.char, macro_1.attributes);
            return;
        }
        var map_1 = handlers.get('macro').applicable(name);
        if (!map_1) {
            return;
        }
        if (map_1 instanceof sm.MacroMap) {
            var macro_2 = map_1.lookup(name);
            NewcommandUtil.addMacro(parser, cs, macro_2.func, macro_2.args, macro_2.symbol);
            return;
        }
        macro_1 = map_1.lookup(name);
        var newArgs = NewcommandUtil.disassembleSymbol(cs, macro_1);
        var method = function (p, cs) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            var symb = NewcommandUtil.assembleSymbol(rest);
            return map_1.parser(p, symb);
        };
        NewcommandUtil.addMacro(parser, cs, method, newArgs);
        return;
    }
    parser.i++;
    var macro = handlers.get('delimiter').lookup(c);
    if (macro) {
        NewcommandUtil.addDelimiter(parser, '\\' + cs, macro.char, macro.attributes);
        return;
    }
    NewcommandUtil.addMacro(parser, cs, NewcommandMethods.Macro, [c]);
};
NewcommandMethods.MacroWithTemplate = function (parser, name, text, n) {
    var params = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        params[_i - 4] = arguments[_i];
    }
    var argCount = parseInt(n, 10);
    if (argCount) {
        var args = [];
        parser.GetNext();
        if (params[0] && !NewcommandUtil.MatchParam(parser, params[0])) {
            throw new TexError('MismatchUseDef', 'Use of %1 doesn\'t match its definition', name);
        }
        for (var i = 0; i < argCount; i++) {
            args.push(NewcommandUtil.GetParameter(parser, name, params[i + 1]));
        }
        text = ParseUtil.substituteArgs(parser, args, text);
    }
    parser.string = ParseUtil.addArgs(parser, text, parser.string.slice(parser.i));
    parser.i = 0;
    if (++parser.macroCount > parser.configuration.options['maxMacros']) {
        throw new TexError('MaxMacroSub1', 'MathJax maximum macro substitution count exceeded; ' +
            'is here a recursive macro call?');
    }
};
NewcommandMethods.BeginEnv = function (parser, begin, bdef, edef, n, def) {
    if (begin.getProperty('end') && parser.stack.env['closing'] === begin.getName()) {
        delete parser.stack.env['closing'];
        var rest = parser.string.slice(parser.i);
        parser.string = edef;
        parser.i = 0;
        parser.Parse();
        parser.string = rest;
        parser.i = 0;
        return parser.itemFactory.create('end').setProperty('name', begin.getName());
    }
    if (n) {
        var args = [];
        if (def != null) {
            var optional = parser.GetBrackets('\\begin{' + begin.getName() + '}');
            args.push(optional == null ? def : optional);
        }
        for (var i = args.length; i < n; i++) {
            args.push(parser.GetArgument('\\begin{' + begin.getName() + '}'));
        }
        bdef = ParseUtil.substituteArgs(parser, args, bdef);
        edef = ParseUtil.substituteArgs(parser, [], edef);
    }
    parser.string = ParseUtil.addArgs(parser, bdef, parser.string.slice(parser.i));
    parser.i = 0;
    return parser.itemFactory.create('beginEnv').setProperty('name', begin.getName());
};
NewcommandMethods.Macro = BaseMethods.Macro;
export default NewcommandMethods;
//# sourceMappingURL=NewcommandMethods.js.map