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
import * as Notation from '../common/Notation.js';
export * from '../common/Notation.js';
export var RenderElement = function (name, offset) {
    if (offset === void 0) { offset = ''; }
    return (function (node, child) {
        var shape = node.adjustBorder(node.html('mjx-' + name));
        if (offset && node.thickness !== Notation.THICKNESS) {
            var transform = 'translate' + offset + '(' + node.em(node.thickness / 2) + ')';
            node.adaptor.setStyle(shape, 'transform', transform);
        }
        node.adaptor.append(node.chtml, shape);
    });
};
export var Border = function (side) {
    return Notation.CommonBorder(function (node, child) {
        node.adaptor.setStyle(child, 'border-' + side, node.em(node.thickness) + ' solid');
    })(side);
};
export var Border2 = function (name, side1, side2) {
    return Notation.CommonBorder2(function (node, child) {
        var border = node.em(node.thickness) + ' solid';
        node.adaptor.setStyle(child, 'border-' + side1, border);
        node.adaptor.setStyle(child, 'border-' + side2, border);
    })(name, side1, side2);
};
export var DiagonalStrike = function (name, neg) {
    return Notation.CommonDiagonalStrike(function (cname) { return function (node, child) {
        var _a = node.getBBox(), w = _a.w, h = _a.h, d = _a.d;
        var _b = __read(node.getArgMod(w, h + d), 2), a = _b[0], W = _b[1];
        var t = neg * node.thickness / 2;
        var strike = node.adjustBorder(node.html(cname, { style: {
                width: node.em(W),
                transform: 'rotate(' + node.fixed(-neg * a) + 'rad) translateY(' + t + 'em)',
            } }));
        node.adaptor.append(node.chtml, strike);
    }; })(name);
};
export var DiagonalArrow = function (name) {
    return Notation.CommonDiagonalArrow(function (node, arrow) {
        node.adaptor.append(node.chtml, arrow);
    })(name);
};
export var Arrow = function (name) {
    return Notation.CommonArrow(function (node, arrow) {
        node.adaptor.append(node.chtml, arrow);
    })(name);
};
//# sourceMappingURL=Notation.js.map