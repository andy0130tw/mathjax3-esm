var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
import { TEXCLASS } from '../../core/MmlTree/MmlNode.js';
import NodeUtil from './NodeUtil.js';
var FilterUtil;
(function (FilterUtil) {
    FilterUtil.cleanStretchy = function (arg) {
        var e_1, _a;
        var options = arg.data;
        try {
            for (var _b = __values(options.getList('fixStretchy')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mo = _c.value;
                if (NodeUtil.getProperty(mo, 'fixStretchy')) {
                    var symbol = NodeUtil.getForm(mo);
                    if (symbol && symbol[3] && symbol[3]['stretchy']) {
                        NodeUtil.setAttribute(mo, 'stretchy', false);
                    }
                    var parent_1 = mo.parent;
                    if (!NodeUtil.getTexClass(mo) && (!symbol || !symbol[2])) {
                        var texAtom = options.nodeFactory.create('node', 'TeXAtom', [mo]);
                        parent_1.replaceChild(texAtom, mo);
                        texAtom.inheritAttributesFrom(mo);
                    }
                    NodeUtil.removeProperties(mo, 'fixStretchy');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    FilterUtil.cleanAttributes = function (arg) {
        var node = arg.data.root;
        node.walkTree(function (mml, d) {
            var e_2, _a;
            var attribs = mml.attributes;
            if (!attribs) {
                return;
            }
            try {
                for (var _b = __values(attribs.getExplicitNames()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (attribs.attributes[key] === mml.attributes.getInherited(key)) {
                        delete attribs.attributes[key];
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }, {});
    };
    FilterUtil.combineRelations = function (arg) {
        var e_3, _a;
        try {
            for (var _b = __values(arg.data.getList('mo')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mo = _c.value;
                if (mo.getProperty('relationsCombined') || !mo.parent ||
                    (mo.parent && !NodeUtil.isType(mo.parent, 'mrow')) ||
                    NodeUtil.getTexClass(mo) !== TEXCLASS.REL) {
                    continue;
                }
                var mml = mo.parent;
                var m2 = void 0;
                var children = mml.childNodes;
                var next = children.indexOf(mo) + 1;
                var variantForm = NodeUtil.getProperty(mo, 'variantForm');
                while (next < children.length && (m2 = children[next]) &&
                    NodeUtil.isType(m2, 'mo') &&
                    NodeUtil.getTexClass(m2) === TEXCLASS.REL) {
                    if (variantForm === NodeUtil.getProperty(m2, 'variantForm') &&
                        _compareExplicit(mo, m2)) {
                        NodeUtil.appendChildren(mo, NodeUtil.getChildren(m2));
                        _copyExplicit(['stretchy', 'rspace'], mo, m2);
                        NodeUtil.setProperties(mo, m2.getAllProperties());
                        children.splice(next, 1);
                        m2.parent = null;
                        m2.setProperty('relationsCombined', true);
                    }
                    else {
                        if (mo.attributes.getExplicit('rspace') == null) {
                            NodeUtil.setAttribute(mo, 'rspace', '0pt');
                        }
                        if (m2.attributes.getExplicit('lspace') == null) {
                            NodeUtil.setAttribute(m2, 'lspace', '0pt');
                        }
                        break;
                    }
                }
                mo.attributes.setInherited('form', mo.getForms()[0]);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    var _copyExplicit = function (attrs, node1, node2) {
        var attr1 = node1.attributes;
        var attr2 = node2.attributes;
        attrs.forEach(function (x) {
            var attr = attr2.getExplicit(x);
            if (attr != null) {
                attr1.set(x, attr);
            }
        });
    };
    var _compareExplicit = function (node1, node2) {
        var e_4, _a;
        var filter = function (attr, space) {
            var exp = attr.getExplicitNames();
            return exp.filter(function (x) {
                return x !== space &&
                    (x !== 'stretchy' ||
                        attr.getExplicit('stretchy'));
            });
        };
        var attr1 = node1.attributes;
        var attr2 = node2.attributes;
        var exp1 = filter(attr1, 'lspace');
        var exp2 = filter(attr2, 'rspace');
        if (exp1.length !== exp2.length) {
            return false;
        }
        try {
            for (var exp1_1 = __values(exp1), exp1_1_1 = exp1_1.next(); !exp1_1_1.done; exp1_1_1 = exp1_1.next()) {
                var name_1 = exp1_1_1.value;
                if (attr1.getExplicit(name_1) !== attr2.getExplicit(name_1)) {
                    return false;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (exp1_1_1 && !exp1_1_1.done && (_a = exp1_1.return)) _a.call(exp1_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return true;
    };
    var _cleanSubSup = function (options, low, up) {
        var e_5, _a;
        try {
            for (var _b = __values(options.getList('m' + low + up)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mml = _c.value;
                var children = mml.childNodes;
                if (children[mml[low]] && children[mml[up]]) {
                    continue;
                }
                var parent_2 = mml.parent;
                var newNode = (children[mml[low]] ?
                    options.nodeFactory.create('node', 'm' + low, [children[mml.base], children[mml[low]]]) :
                    options.nodeFactory.create('node', 'm' + up, [children[mml.base], children[mml[up]]]));
                NodeUtil.copyAttributes(mml, newNode);
                if (parent_2) {
                    parent_2.replaceChild(newNode, mml);
                }
                else {
                    options.root = newNode;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    FilterUtil.cleanSubSup = function (arg) {
        var options = arg.data;
        if (options.error) {
            return;
        }
        _cleanSubSup(options, 'sub', 'sup');
        _cleanSubSup(options, 'under', 'over');
    };
    var _moveLimits = function (options, underover, subsup) {
        var e_6, _a;
        try {
            for (var _b = __values(options.getList(underover)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mml = _c.value;
                if (mml.attributes.get('displaystyle')) {
                    continue;
                }
                var base = mml.childNodes[mml.base];
                var mo = base.coreMO();
                if (base.getProperty('movablelimits') && !mo.attributes.getExplicit('movablelimits')) {
                    var node = options.nodeFactory.create('node', subsup, mml.childNodes);
                    NodeUtil.copyAttributes(mml, node);
                    if (mml.parent) {
                        mml.parent.replaceChild(node, mml);
                    }
                    else {
                        options.root = node;
                    }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    FilterUtil.moveLimits = function (arg) {
        var options = arg.data;
        _moveLimits(options, 'munderover', 'msubsup');
        _moveLimits(options, 'munder', 'msub');
        _moveLimits(options, 'mover', 'msup');
    };
    FilterUtil.setInherited = function (arg) {
        arg.data.root.setInheritedAttributes({}, arg.math['display'], 0, false);
    };
})(FilterUtil || (FilterUtil = {}));
export default FilterUtil;
//# sourceMappingURL=FilterUtil.js.map