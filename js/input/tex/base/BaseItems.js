var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { MapHandler } from '../MapHandler.js';
import { entities } from '../../../util/Entities.js';
import { TEXCLASS } from '../../../core/MmlTree/MmlNode.js';
import TexError from '../TexError.js';
import ParseUtil from '../ParseUtil.js';
import NodeUtil from '../NodeUtil.js';
import { BaseItem } from '../StackItem.js';
var StartItem = (function (_super) {
    __extends(StartItem, _super);
    function StartItem(factory, global) {
        var _this = _super.call(this, factory) || this;
        _this.global = global;
        return _this;
    }
    Object.defineProperty(StartItem.prototype, "kind", {
        get: function () {
            return 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StartItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    StartItem.prototype.checkItem = function (item) {
        if (item.isKind('stop')) {
            var node = this.toMml();
            if (!this.global.isInner) {
                node = this.factory.configuration.tags.finalize(node, this.env);
            }
            return [[this.factory.create('mml', node)], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return StartItem;
}(BaseItem));
export { StartItem };
var StopItem = (function (_super) {
    __extends(StopItem, _super);
    function StopItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StopItem.prototype, "kind", {
        get: function () {
            return 'stop';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StopItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return StopItem;
}(BaseItem));
export { StopItem };
var OpenItem = (function (_super) {
    __extends(OpenItem, _super);
    function OpenItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OpenItem.prototype, "kind", {
        get: function () {
            return 'open';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpenItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    OpenItem.prototype.checkItem = function (item) {
        if (item.isKind('close')) {
            var mml = this.toMml();
            var node = this.create('node', 'TeXAtom', [mml]);
            return [[this.factory.create('mml', node)], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    OpenItem.errors = Object.assign(Object.create(BaseItem.errors), {
        'stop': ['ExtraOpenMissingClose',
            'Extra open brace or missing close brace']
    });
    return OpenItem;
}(BaseItem));
export { OpenItem };
var CloseItem = (function (_super) {
    __extends(CloseItem, _super);
    function CloseItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CloseItem.prototype, "kind", {
        get: function () {
            return 'close';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CloseItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return CloseItem;
}(BaseItem));
export { CloseItem };
var PrimeItem = (function (_super) {
    __extends(PrimeItem, _super);
    function PrimeItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PrimeItem.prototype, "kind", {
        get: function () {
            return 'prime';
        },
        enumerable: true,
        configurable: true
    });
    PrimeItem.prototype.checkItem = function (item) {
        var _a = __read(this.Peek(2), 2), top0 = _a[0], top1 = _a[1];
        if (!NodeUtil.isType(top0, 'msubsup') || NodeUtil.isType(top0, 'msup')) {
            var node = this.create('node', 'msup', [top0, top1]);
            return [[node, item], true];
        }
        NodeUtil.setChild(top0, top0.sup, top1);
        return [[top0, item], true];
    };
    return PrimeItem;
}(BaseItem));
export { PrimeItem };
var SubsupItem = (function (_super) {
    __extends(SubsupItem, _super);
    function SubsupItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SubsupItem.prototype, "kind", {
        get: function () {
            return 'subsup';
        },
        enumerable: true,
        configurable: true
    });
    SubsupItem.prototype.checkItem = function (item) {
        if (item.isKind('open') || item.isKind('left')) {
            return BaseItem.success;
        }
        var top = this.First;
        var position = this.getProperty('position');
        if (item.isKind('mml')) {
            if (this.getProperty('primes')) {
                if (position !== 2) {
                    NodeUtil.setChild(top, 2, this.getProperty('primes'));
                }
                else {
                    NodeUtil.setProperty(this.getProperty('primes'), 'variantForm', true);
                    var node = this.create('node', 'mrow', [this.getProperty('primes'), item.First]);
                    item.First = node;
                }
            }
            NodeUtil.setChild(top, position, item.First);
            if (this.getProperty('movesupsub') != null) {
                NodeUtil.setProperty(top, 'movesupsub', this.getProperty('movesupsub'));
            }
            var result = this.factory.create('mml', top);
            return [[result], true];
        }
        if (_super.prototype.checkItem.call(this, item)[1]) {
            var error = this.getErrors(['', 'sub', 'sup'][position]);
            throw new (TexError.bind.apply(TexError, __spread([void 0, error[0], error[1]], error.splice(2))))();
        }
    };
    SubsupItem.errors = Object.assign(Object.create(BaseItem.errors), {
        'stop': ['MissingScript',
            'Missing superscript or subscript argument'],
        'sup': ['MissingOpenForSup',
            'Missing open brace for superscript'],
        'sub': ['MissingOpenForSub',
            'Missing open brace for subscript']
    });
    return SubsupItem;
}(BaseItem));
export { SubsupItem };
var OverItem = (function (_super) {
    __extends(OverItem, _super);
    function OverItem(factory) {
        var _this = _super.call(this, factory) || this;
        _this.setProperty('name', '\\over');
        return _this;
    }
    Object.defineProperty(OverItem.prototype, "kind", {
        get: function () {
            return 'over';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OverItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    OverItem.prototype.checkItem = function (item) {
        if (item.isKind('over')) {
            throw new TexError('AmbiguousUseOf', 'Ambiguous use of %1', item.getName());
        }
        if (item.isClose) {
            var mml = this.create('node', 'mfrac', [this.getProperty('num'), this.toMml(false)]);
            if (this.getProperty('thickness') != null) {
                NodeUtil.setAttribute(mml, 'linethickness', this.getProperty('thickness'));
            }
            if (this.getProperty('open') || this.getProperty('close')) {
                NodeUtil.setProperty(mml, 'withDelims', true);
                mml = ParseUtil.fixedFence(this.factory.configuration, this.getProperty('open'), mml, this.getProperty('close'));
            }
            return [[this.factory.create('mml', mml), item], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    OverItem.prototype.toString = function () {
        return 'over[' + this.getProperty('num') +
            ' / ' + this.nodes.join('; ') + ']';
    };
    return OverItem;
}(BaseItem));
export { OverItem };
var LeftItem = (function (_super) {
    __extends(LeftItem, _super);
    function LeftItem(factory) {
        var _this = _super.call(this, factory) || this;
        _this.setProperty('delim', '(');
        return _this;
    }
    Object.defineProperty(LeftItem.prototype, "kind", {
        get: function () {
            return 'left';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeftItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    LeftItem.prototype.checkItem = function (item) {
        if (item.isKind('right')) {
            return [[this.factory.create('mml', ParseUtil.fenced(this.factory.configuration, this.getProperty('delim'), this.toMml(), item.getProperty('delim')))], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    LeftItem.errors = Object.assign(Object.create(BaseItem.errors), {
        'stop': ['ExtraLeftMissingRight',
            'Extra \\left or missing \\right']
    });
    return LeftItem;
}(BaseItem));
export { LeftItem };
var RightItem = (function (_super) {
    __extends(RightItem, _super);
    function RightItem(factory) {
        var _this = _super.call(this, factory) || this;
        _this.setProperty('delim', ')');
        return _this;
    }
    Object.defineProperty(RightItem.prototype, "kind", {
        get: function () {
            return 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RightItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return RightItem;
}(BaseItem));
export { RightItem };
var BeginItem = (function (_super) {
    __extends(BeginItem, _super);
    function BeginItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BeginItem.prototype, "kind", {
        get: function () {
            return 'begin';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeginItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    BeginItem.prototype.checkItem = function (item) {
        if (item.isKind('end')) {
            if (item.getName() !== this.getName()) {
                throw new TexError('EnvBadEnd', '\\begin{%1} ended with \\end{%2}', this.getName(), item.getName());
            }
            if (!this.getProperty('end')) {
                return [[this.factory.create('mml', this.toMml())], true];
            }
            return BaseItem.fail;
        }
        if (item.isKind('stop')) {
            throw new TexError('EnvMissingEnd', 'Missing \\end{%1}', this.getName());
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return BeginItem;
}(BaseItem));
export { BeginItem };
var EndItem = (function (_super) {
    __extends(EndItem, _super);
    function EndItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EndItem.prototype, "kind", {
        get: function () {
            return 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return EndItem;
}(BaseItem));
export { EndItem };
var StyleItem = (function (_super) {
    __extends(StyleItem, _super);
    function StyleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StyleItem.prototype, "kind", {
        get: function () {
            return 'style';
        },
        enumerable: true,
        configurable: true
    });
    StyleItem.prototype.checkItem = function (item) {
        if (!item.isClose) {
            return _super.prototype.checkItem.call(this, item);
        }
        var mml = this.create('node', 'mstyle', this.nodes, this.getProperty('styles'));
        return [[this.factory.create('mml', mml), item], true];
    };
    return StyleItem;
}(BaseItem));
export { StyleItem };
var PositionItem = (function (_super) {
    __extends(PositionItem, _super);
    function PositionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PositionItem.prototype, "kind", {
        get: function () {
            return 'position';
        },
        enumerable: true,
        configurable: true
    });
    PositionItem.prototype.checkItem = function (item) {
        if (item.isClose) {
            throw new TexError('MissingBoxFor', 'Missing box for %1', this.getName());
        }
        if (item.isFinal) {
            var mml = item.toMml();
            switch (this.getProperty('move')) {
                case 'vertical':
                    mml = this.create('node', 'mpadded', [mml], { height: this.getProperty('dh'),
                        depth: this.getProperty('dd'),
                        voffset: this.getProperty('dh') });
                    return [[this.factory.create('mml', mml)], true];
                case 'horizontal':
                    return [[this.factory.create('mml', this.getProperty('left')), item,
                            this.factory.create('mml', this.getProperty('right'))], true];
            }
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return PositionItem;
}(BaseItem));
export { PositionItem };
var CellItem = (function (_super) {
    __extends(CellItem, _super);
    function CellItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CellItem.prototype, "kind", {
        get: function () {
            return 'cell';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellItem.prototype, "isClose", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return CellItem;
}(BaseItem));
export { CellItem };
var MmlItem = (function (_super) {
    __extends(MmlItem, _super);
    function MmlItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MmlItem.prototype, "isFinal", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmlItem.prototype, "kind", {
        get: function () {
            return 'mml';
        },
        enumerable: true,
        configurable: true
    });
    return MmlItem;
}(BaseItem));
export { MmlItem };
var FnItem = (function (_super) {
    __extends(FnItem, _super);
    function FnItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FnItem.prototype, "kind", {
        get: function () {
            return 'fn';
        },
        enumerable: true,
        configurable: true
    });
    FnItem.prototype.checkItem = function (item) {
        var top = this.First;
        if (top) {
            if (item.isOpen) {
                return BaseItem.success;
            }
            if (!item.isKind('fn')) {
                var mml = item.First;
                if (!item.isKind('mml') || !mml) {
                    return [[top, item], true];
                }
                if ((NodeUtil.isType(mml, 'mstyle') && mml.childNodes.length &&
                    NodeUtil.isType(mml.childNodes[0].childNodes[0], 'mspace')) ||
                    NodeUtil.isType(mml, 'mspace')) {
                    return [[top, item], true];
                }
                if (NodeUtil.isEmbellished(mml)) {
                    mml = NodeUtil.getCoreMO(mml);
                }
                var form = NodeUtil.getForm(mml);
                if (form != null && [0, 0, 1, 1, 0, 1, 1, 0, 0, 0][form[2]]) {
                    return [[top, item], true];
                }
            }
            var node = this.create('token', 'mo', { texClass: TEXCLASS.NONE }, entities.ApplyFunction);
            return [[top, node, item], true];
        }
        return _super.prototype.checkItem.apply(this, arguments);
    };
    return FnItem;
}(BaseItem));
export { FnItem };
var NotItem = (function (_super) {
    __extends(NotItem, _super);
    function NotItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remap = MapHandler.getMap('not_remap');
        return _this;
    }
    Object.defineProperty(NotItem.prototype, "kind", {
        get: function () {
            return 'not';
        },
        enumerable: true,
        configurable: true
    });
    NotItem.prototype.checkItem = function (item) {
        var mml;
        var c;
        var textNode;
        if (item.isKind('open') || item.isKind('left')) {
            return BaseItem.success;
        }
        if (item.isKind('mml') &&
            (NodeUtil.isType(item.First, 'mo') || NodeUtil.isType(item.First, 'mi') ||
                NodeUtil.isType(item.First, 'mtext'))) {
            mml = item.First;
            c = NodeUtil.getText(mml);
            if (c.length === 1 && !NodeUtil.getProperty(mml, 'movesupsub') &&
                NodeUtil.getChildren(mml).length === 1) {
                if (this.remap.contains(c)) {
                    textNode = this.create('text', this.remap.lookup(c).char);
                    NodeUtil.setChild(mml, 0, textNode);
                }
                else {
                    textNode = this.create('text', '\u0338');
                    NodeUtil.appendChildren(mml, [textNode]);
                }
                return [[item], true];
            }
        }
        textNode = this.create('text', '\u29F8');
        var mtextNode = this.create('node', 'mtext', [], {}, textNode);
        var paddedNode = this.create('node', 'mpadded', [mtextNode], { width: 0 });
        mml = this.create('node', 'TeXAtom', [paddedNode], { texClass: TEXCLASS.REL });
        return [[mml, item], true];
    };
    return NotItem;
}(BaseItem));
export { NotItem };
var DotsItem = (function (_super) {
    __extends(DotsItem, _super);
    function DotsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DotsItem.prototype, "kind", {
        get: function () {
            return 'dots';
        },
        enumerable: true,
        configurable: true
    });
    DotsItem.prototype.checkItem = function (item) {
        if (item.isKind('open') || item.isKind('left')) {
            return BaseItem.success;
        }
        var dots = this.getProperty('ldots');
        var top = item.First;
        if (item.isKind('mml') && NodeUtil.isEmbellished(top)) {
            var tclass = NodeUtil.getTexClass(NodeUtil.getCoreMO(top));
            if (tclass === TEXCLASS.BIN || tclass === TEXCLASS.REL) {
                dots = this.getProperty('cdots');
            }
        }
        return [[dots, item], true];
    };
    return DotsItem;
}(BaseItem));
export { DotsItem };
var ArrayItem = (function (_super) {
    __extends(ArrayItem, _super);
    function ArrayItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.table = [];
        _this.row = [];
        _this.frame = [];
        _this.hfill = [];
        _this.arraydef = {};
        _this.dashed = false;
        return _this;
    }
    Object.defineProperty(ArrayItem.prototype, "kind", {
        get: function () {
            return 'array';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArrayItem.prototype, "copyEnv", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ArrayItem.prototype.checkItem = function (item) {
        if (item.isClose && !item.isKind('over')) {
            if (item.getProperty('isEntry')) {
                this.EndEntry();
                this.clearEnv();
                return BaseItem.fail;
            }
            if (item.getProperty('isCR')) {
                this.EndEntry();
                this.EndRow();
                this.clearEnv();
                return BaseItem.fail;
            }
            this.EndTable();
            this.clearEnv();
            var scriptlevel = this.arraydef['scriptlevel'];
            delete this.arraydef['scriptlevel'];
            var mml = this.create('node', 'mtable', this.table, this.arraydef);
            if (this.frame.length === 4) {
                NodeUtil.setAttribute(mml, 'frame', this.dashed ? 'dashed' : 'solid');
            }
            else if (this.frame.length) {
                if (this.arraydef['rowlines']) {
                    this.arraydef['rowlines'] =
                        this.arraydef['rowlines'].replace(/none( none)+$/, 'none');
                }
                mml = this.create('node', 'menclose', [mml], { notation: this.frame.join(' '), isFrame: true });
                if ((this.arraydef['columnlines'] || 'none') !== 'none' ||
                    (this.arraydef['rowlines'] || 'none') !== 'none') {
                    NodeUtil.setAttribute(mml, 'padding', 0);
                }
            }
            if (scriptlevel) {
                mml = this.create('node', 'mstyle', [mml], { scriptlevel: scriptlevel });
            }
            if (this.getProperty('open') || this.getProperty('close')) {
                mml = ParseUtil.fenced(this.factory.configuration, this.getProperty('open'), mml, this.getProperty('close'));
            }
            var newItem = this.factory.create('mml', mml);
            if (this.getProperty('requireClose')) {
                if (item.isKind('close')) {
                    return [[newItem], true];
                }
                throw new TexError('MissingCloseBrace', 'Missing close brace');
            }
            return [[newItem, item], true];
        }
        return _super.prototype.checkItem.call(this, item);
    };
    ArrayItem.prototype.EndEntry = function () {
        var mtd = this.create('node', 'mtd', this.nodes);
        if (this.hfill.length) {
            if (this.hfill[0] === 0) {
                NodeUtil.setAttribute(mtd, 'columnalign', 'right');
            }
            if (this.hfill[this.hfill.length - 1] === this.Size()) {
                NodeUtil.setAttribute(mtd, 'columnalign', NodeUtil.getAttribute(mtd, 'columnalign') ? 'center' : 'left');
            }
        }
        this.row.push(mtd);
        this.Clear();
        this.hfill = [];
    };
    ArrayItem.prototype.EndRow = function () {
        var node;
        if (this.getProperty('isNumbered') && this.row.length === 3) {
            this.row.unshift(this.row.pop());
            node = this.create('node', 'mlabeledtr', this.row);
        }
        else {
            node = this.create('node', 'mtr', this.row);
        }
        this.table.push(node);
        this.row = [];
    };
    ArrayItem.prototype.EndTable = function () {
        if (this.Size() || this.row.length) {
            this.EndEntry();
            this.EndRow();
        }
        this.checkLines();
    };
    ArrayItem.prototype.checkLines = function () {
        if (this.arraydef['rowlines']) {
            var lines = this.arraydef['rowlines'].split(/ /);
            if (lines.length === this.table.length) {
                this.frame.push('bottom');
                lines.pop();
                this.arraydef['rowlines'] = lines.join(' ');
            }
            else if (lines.length < this.table.length - 1) {
                this.arraydef['rowlines'] += ' none';
            }
        }
        if (this.getProperty('rowspacing')) {
            var rows = this.arraydef['rowspacing'].split(/ /);
            while (rows.length < this.table.length) {
                rows.push(this.getProperty('rowspacing') + 'em');
            }
            this.arraydef['rowspacing'] = rows.join(' ');
        }
    };
    return ArrayItem;
}(BaseItem));
export { ArrayItem };
var EqnArrayItem = (function (_super) {
    __extends(EqnArrayItem, _super);
    function EqnArrayItem(factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, factory) || this;
        _this.factory.configuration.tags.start(args[0], args[2], args[1]);
        return _this;
    }
    Object.defineProperty(EqnArrayItem.prototype, "kind", {
        get: function () {
            return 'eqnarray';
        },
        enumerable: true,
        configurable: true
    });
    EqnArrayItem.prototype.EndEntry = function () {
        if (this.row.length) {
            ParseUtil.fixInitialMO(this.factory.configuration, this.nodes);
        }
        var node = this.create('node', 'mtd', this.nodes);
        this.row.push(node);
        this.Clear();
    };
    EqnArrayItem.prototype.EndRow = function () {
        var mtr = 'mtr';
        var tag = this.factory.configuration.tags.getTag();
        if (tag) {
            this.row = [tag].concat(this.row);
            mtr = 'mlabeledtr';
        }
        this.factory.configuration.tags.clearTag();
        var node = this.create('node', mtr, this.row);
        this.table.push(node);
        this.row = [];
    };
    EqnArrayItem.prototype.EndTable = function () {
        _super.prototype.EndTable.call(this);
        this.factory.configuration.tags.end();
    };
    return EqnArrayItem;
}(ArrayItem));
export { EqnArrayItem };
var EquationItem = (function (_super) {
    __extends(EquationItem, _super);
    function EquationItem(factory) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, factory) || this;
        _this.factory.configuration.tags.start('equation', true, args[0]);
        return _this;
    }
    Object.defineProperty(EquationItem.prototype, "kind", {
        get: function () {
            return 'equation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EquationItem.prototype, "isOpen", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    EquationItem.prototype.checkItem = function (item) {
        if (item.isKind('end')) {
            var mml = this.toMml();
            var tag = this.factory.configuration.tags.getTag();
            this.factory.configuration.tags.end();
            return [[tag ? this.factory.configuration.tags.enTag(mml, tag) : mml, item], true];
        }
        if (item.isKind('stop')) {
            throw new TexError('EnvMissingEnd', 'Missing \\end{%1}', this.getName());
        }
        return _super.prototype.checkItem.call(this, item);
    };
    return EquationItem;
}(BaseItem));
export { EquationItem };
//# sourceMappingURL=BaseItems.js.map