import TexParser from '../TexParser.js';
import { Other } from '../base/BaseConfiguration.js';
import { TEXCLASS } from '../../../core/MmlTree/MmlNode.js';
import NodeUtil from '../NodeUtil.js';
var AmsCdMethods = {};
AmsCdMethods.CD = function (parser, begin) {
    parser.Push(begin);
    var item = parser.itemFactory.create('array');
    var options = parser.configuration.options.amsCd;
    item.setProperties({
        minw: parser.stack.env.CD_minw || options.harrowsize,
        minh: parser.stack.env.CD_minh || options.varrowsize
    });
    item.arraydef = {
        columnalign: 'center',
        columnspacing: options.colspace,
        rowspacing: options.rowspace,
        displaystyle: true
    };
    return item;
};
AmsCdMethods.arrow = function (parser, name) {
    var c = parser.string.charAt(parser.i);
    if (!c.match(/[><VA.|=]/)) {
        return Other(parser, name);
    }
    else {
        parser.i++;
    }
    var first = parser.stack.Top();
    if (!first.isKind('array') || first.Size()) {
        AmsCdMethods.cell(parser, name);
        first = parser.stack.Top();
    }
    var top = first;
    var arrowRow = ((top.table.length % 2) === 1);
    var n = (top.row.length + (arrowRow ? 0 : 1)) % 2;
    while (n) {
        AmsCdMethods.cell(parser, name);
        n--;
    }
    var mml;
    var hdef = { minsize: top.getProperty('minw'), stretchy: true }, vdef = { minsize: top.getProperty('minh'),
        stretchy: true, symmetric: true, lspace: 0, rspace: 0 };
    if (c === '.') {
    }
    else if (c === '|') {
        mml = parser.create('token', 'mo', vdef, '\u2225');
    }
    else if (c === '=') {
        mml = parser.create('token', 'mo', hdef, '=');
    }
    else {
        var arrow = {
            '>': '\u2192', '<': '\u2190', 'V': '\u2193', 'A': '\u2191'
        }[c];
        var a = parser.GetUpTo(name + c, c);
        var b = parser.GetUpTo(name + c, c);
        if (c === '>' || c === '<') {
            mml = parser.create('token', 'mo', hdef, arrow);
            if (!a) {
                a = '\\kern ' + top.getProperty('minw');
            }
            if (a || b) {
                var pad = { width: '+11mu', lspace: '6mu' };
                mml = parser.create('node', 'munderover', [mml]);
                if (a) {
                    var nodeA = new TexParser(a, parser.stack.env, parser.configuration).mml();
                    var mpadded = parser.create('node', 'mpadded', [nodeA], pad);
                    NodeUtil.setAttribute(mpadded, 'voffset', '.1em');
                    NodeUtil.setChild(mml, mml.over, mpadded);
                }
                if (b) {
                    var nodeB = new TexParser(b, parser.stack.env, parser.configuration).mml();
                    NodeUtil.setChild(mml, mml.under, parser.create('node', 'mpadded', [nodeB], pad));
                }
                if (parser.configuration.options.amsCd.hideHorizontalLabels) {
                    mml = parser.create('node', 'mpadded', mml, { depth: 0, height: '.67em' });
                }
            }
        }
        else {
            var arrowNode = parser.create('token', 'mo', vdef, arrow);
            mml = arrowNode;
            if (a || b) {
                mml = parser.create('node', 'mrow');
                if (a) {
                    NodeUtil.appendChildren(mml, [new TexParser('\\scriptstyle\\llap{' + a + '}', parser.stack.env, parser.configuration).mml()]);
                }
                arrowNode.texClass = TEXCLASS.ORD;
                NodeUtil.appendChildren(mml, [arrowNode]);
                if (b) {
                    NodeUtil.appendChildren(mml, [new TexParser('\\scriptstyle\\rlap{' + b + '}', parser.stack.env, parser.configuration).mml()]);
                }
            }
        }
    }
    if (mml) {
        parser.Push(mml);
    }
    AmsCdMethods.cell(parser, name);
};
AmsCdMethods.cell = function (parser, name) {
    var top = parser.stack.Top();
    if ((top.table || []).length % 2 === 0 && (top.row || []).length === 0) {
        parser.Push(parser.create('node', 'mpadded', [], { height: '8.5pt', depth: '2pt' }));
    }
    parser.Push(parser.itemFactory.create('cell').setProperties({ isEntry: true, name: name }));
};
AmsCdMethods.minCDarrowwidth = function (parser, name) {
    parser.stack.env.CD_minw = parser.GetDimen(name);
};
AmsCdMethods.minCDarrowheight = function (parser, name) {
    parser.stack.env.CD_minh = parser.GetDimen(name);
};
export default AmsCdMethods;
//# sourceMappingURL=AmsCdMethods.js.map