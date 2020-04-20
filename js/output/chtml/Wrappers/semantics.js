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
import { CHTMLWrapper } from '../Wrapper.js';
import { CommonSemanticsMixin } from '../../common/Wrappers/semantics.js';
import { MmlSemantics, MmlAnnotation, MmlAnnotationXML } from '../../../core/MmlTree/MmlNodes/semantics.js';
import { XMLNode } from '../../../core/MmlTree/MmlNode.js';
var CHTMLsemantics = (function (_super) {
    __extends(CHTMLsemantics, _super);
    function CHTMLsemantics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLsemantics.prototype.toCHTML = function (parent) {
        var chtml = this.standardCHTMLnode(parent);
        if (this.childNodes.length) {
            this.childNodes[0].toCHTML(chtml);
        }
    };
    CHTMLsemantics.kind = MmlSemantics.prototype.kind;
    return CHTMLsemantics;
}(CommonSemanticsMixin(CHTMLWrapper)));
export { CHTMLsemantics };
var CHTMLannotation = (function (_super) {
    __extends(CHTMLannotation, _super);
    function CHTMLannotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLannotation.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
    };
    CHTMLannotation.prototype.computeBBox = function () {
        return this.bbox;
    };
    CHTMLannotation.kind = MmlAnnotation.prototype.kind;
    return CHTMLannotation;
}(CHTMLWrapper));
export { CHTMLannotation };
var CHTMLannotationXML = (function (_super) {
    __extends(CHTMLannotationXML, _super);
    function CHTMLannotationXML() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLannotationXML.kind = MmlAnnotationXML.prototype.kind;
    CHTMLannotationXML.styles = {
        'mjx-annotation-xml': {
            'font-family': 'initial',
            'line-height': 'normal'
        }
    };
    return CHTMLannotationXML;
}(CHTMLWrapper));
export { CHTMLannotationXML };
var CHTMLxml = (function (_super) {
    __extends(CHTMLxml, _super);
    function CHTMLxml() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLxml.prototype.toCHTML = function (parent) {
        this.chtml = this.adaptor.append(parent, this.adaptor.clone(this.node.getXML()));
    };
    CHTMLxml.prototype.computeBBox = function (bbox, recompute) {
        if (recompute === void 0) { recompute = false; }
        var _a = this.jax.measureXMLnode(this.node.getXML()), w = _a.w, h = _a.h, d = _a.d;
        bbox.w = w;
        bbox.h = h;
        bbox.d = d;
    };
    CHTMLxml.prototype.getStyles = function () { };
    CHTMLxml.prototype.getScale = function () { };
    CHTMLxml.prototype.getVariant = function () { };
    CHTMLxml.kind = XMLNode.prototype.kind;
    CHTMLxml.autoStyle = false;
    return CHTMLxml;
}(CHTMLWrapper));
export { CHTMLxml };
//# sourceMappingURL=semantics.js.map