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
export var ARROWX = 4, ARROWDX = 1, ARROWY = 2;
export var THICKNESS = .067;
export var PADDING = .2;
export var SOLID = THICKNESS + 'em solid';
export var sideIndex = { top: 0, right: 1, bottom: 2, left: 3 };
export var sideNames = Object.keys(sideIndex);
export var fullBBox = (function (node) { return new Array(4).fill(node.thickness + node.padding); });
export var fullPadding = (function (node) { return new Array(4).fill(node.padding); });
export var fullBorder = (function (node) { return new Array(4).fill(node.thickness); });
export var arrowHead = function (node) {
    return Math.max(node.padding, node.thickness * (node.arrowhead.x + node.arrowhead.dx + 1));
};
export var arrowBBoxHD = function (node, TRBL) {
    if (node.childNodes[0]) {
        var _a = node.childNodes[0].getBBox(), h = _a.h, d = _a.d;
        TRBL[0] = TRBL[2] = Math.max(0, node.thickness * node.arrowhead.y - (h + d) / 2);
    }
    return TRBL;
};
export var arrowBBoxW = function (node, TRBL) {
    if (node.childNodes[0]) {
        var w = node.childNodes[0].getBBox().w;
        TRBL[1] = TRBL[3] = Math.max(0, node.thickness * node.arrowhead.y - w / 2);
    }
    return TRBL;
};
export var arrowDef = {
    up: [-Math.PI / 2, false, true, 'verticalstrike'],
    down: [Math.PI / 2, false, true, 'verticakstrike'],
    right: [0, false, false, 'horizontalstrike'],
    left: [Math.PI, false, false, 'horizontalstrike'],
    updown: [Math.PI / 2, true, true, 'verticalstrike uparrow downarrow'],
    leftright: [0, true, false, 'horizontalstrike leftarrow rightarrow']
};
export var diagonalArrowDef = {
    updiagonal: [-1, 0, false, 'updiagonalstrike northeastarrow'],
    northeast: [-1, 0, false, 'updiagonalstrike updiagonalarrow'],
    southeast: [1, 0, false, 'downdiagonalstrike'],
    northwest: [1, Math.PI, false, 'downdiagonalstrike'],
    southwest: [-1, Math.PI, false, 'updiagonalstrike'],
    northeastsouthwest: [-1, 0, true, 'updiagonalstrike northeastarrow updiagonalarrow southwestarrow'],
    northwestsoutheast: [1, 0, true, 'downdiagonalstrike northwestarrow southeastarrow']
};
export var arrowBBox = {
    up: function (node) { return arrowBBoxW(node, [arrowHead(node), 0, node.padding, 0]); },
    down: function (node) { return arrowBBoxW(node, [node.padding, 0, arrowHead(node), 0]); },
    right: function (node) { return arrowBBoxHD(node, [0, arrowHead(node), 0, node.padding]); },
    left: function (node) { return arrowBBoxHD(node, [0, node.padding, 0, arrowHead(node)]); },
    updown: function (node) { return arrowBBoxW(node, [arrowHead(node), 0, arrowHead(node), 0]); },
    leftright: function (node) { return arrowBBoxHD(node, [0, arrowHead(node), 0, arrowHead(node)]); }
};
export var CommonBorder = function (render) {
    return function (side) {
        var i = sideIndex[side];
        return [side, {
                renderer: render,
                bbox: function (node) {
                    var bbox = [0, 0, 0, 0];
                    bbox[i] = node.thickness + node.padding;
                    return bbox;
                },
                border: function (node) {
                    var bbox = [0, 0, 0, 0];
                    bbox[i] = node.thickness;
                    return bbox;
                }
            }];
    };
};
export var CommonBorder2 = function (render) {
    return function (name, side1, side2) {
        var i1 = sideIndex[side1];
        var i2 = sideIndex[side2];
        return [name, {
                renderer: render,
                bbox: function (node) {
                    var t = node.thickness + node.padding;
                    var bbox = [0, 0, 0, 0];
                    bbox[i1] = bbox[i2] = t;
                    return bbox;
                },
                border: function (node) {
                    var bbox = [0, 0, 0, 0];
                    bbox[i1] = bbox[i2] = node.thickness;
                    return bbox;
                },
                remove: side1 + ' ' + side2
            }];
    };
};
export var CommonDiagonalStrike = function (render) {
    return function (name) {
        var cname = 'mjx-' + name.charAt(0) + 'strike';
        return [name + 'diagonalstrike', {
                renderer: render(cname),
                bbox: fullBBox
            }];
    };
};
export var CommonDiagonalArrow = function (render) {
    return function (name) {
        var _a = __read(diagonalArrowDef[name], 4), c = _a[0], pi = _a[1], double = _a[2], remove = _a[3];
        return [name + 'arrow', {
                renderer: function (node, child) {
                    var _a = node.arrowData(), a = _a.a, W = _a.W;
                    var arrow = node.arrow(W, c * (a - pi), double);
                    render(node, arrow);
                },
                bbox: function (node) {
                    var _a = node.arrowData(), a = _a.a, x = _a.x, y = _a.y;
                    var _b = __read([node.arrowhead.x, node.arrowhead.y, node.arrowhead.dx], 3), ax = _b[0], ay = _b[1], adx = _b[2];
                    var _c = __read(node.getArgMod(ax + adx, ay), 2), b = _c[0], ar = _c[1];
                    var dy = y + (b > a ? node.thickness * ar * Math.sin(b - a) : 0);
                    var dx = x + (b > Math.PI / 2 - a ? node.thickness * ar * Math.sin(b + a - Math.PI / 2) : 0);
                    return [dy, dx, dy, dx];
                },
                remove: remove
            }];
    };
};
export var CommonArrow = function (render) {
    return function (name) {
        var _a = __read(arrowDef[name], 4), angle = _a[0], double = _a[1], isVertical = _a[2], remove = _a[3];
        return [name + 'arrow', {
                renderer: function (node, child) {
                    var _a = node.getBBox(), w = _a.w, h = _a.h, d = _a.d;
                    var _b = __read((isVertical ? [h + d, w] : [w, h + d]), 2), W = _b[0], H = _b[1];
                    var arrow = node.arrow(W, angle, double);
                    render(node, arrow);
                },
                bbox: arrowBBox[name],
                remove: remove
            }];
    };
};
//# sourceMappingURL=Notation.js.map