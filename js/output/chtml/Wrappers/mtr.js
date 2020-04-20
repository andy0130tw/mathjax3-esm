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
import { CommonMtrMixin } from '../../common/Wrappers/mtr.js';
import { CommonMlabeledtrMixin } from '../../common/Wrappers/mtr.js';
import { MmlMtr, MmlMlabeledtr } from '../../../core/MmlTree/MmlNodes/mtr.js';
var CHTMLmtr = (function (_super) {
    __extends(CHTMLmtr, _super);
    function CHTMLmtr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmtr.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
        var align = this.node.attributes.get('rowalign');
        if (align !== 'baseline') {
            this.adaptor.setAttribute(this.chtml, 'rowalign', align);
        }
    };
    CHTMLmtr.kind = MmlMtr.prototype.kind;
    CHTMLmtr.styles = {
        'mjx-mtr': {
            display: 'table-row',
        },
        'mjx-mtr[rowalign="top"] > mjx-mtd': {
            'vertical-align': 'top'
        },
        'mjx-mtr[rowalign="center"] > mjx-mtd': {
            'vertical-align': 'middle'
        },
        'mjx-mtr[rowalign="bottom"] > mjx-mtd': {
            'vertical-align': 'bottom'
        },
        'mjx-mtr[rowalign="baseline"] > mjx-mtd': {
            'vertical-align': 'baseline'
        },
        'mjx-mtr[rowalign="axis"] > mjx-mtd': {
            'vertical-align': '.25em'
        }
    };
    return CHTMLmtr;
}(CommonMtrMixin(CHTMLWrapper)));
export { CHTMLmtr };
var CHTMLmlabeledtr = (function (_super) {
    __extends(CHTMLmlabeledtr, _super);
    function CHTMLmlabeledtr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CHTMLmlabeledtr.prototype.toCHTML = function (parent) {
        _super.prototype.toCHTML.call(this, parent);
        var child = this.adaptor.firstChild(this.chtml);
        if (child) {
            this.adaptor.remove(child);
            var align = this.node.attributes.get('rowalign');
            var attr = (align !== 'baseline' && align !== 'axis' ? { rowalign: align } : {});
            var row = this.html('mjx-mtr', attr, [child]);
            CHTMLmtr.used = true;
            this.adaptor.append(this.parent.labels, row);
        }
    };
    CHTMLmlabeledtr.kind = MmlMlabeledtr.prototype.kind;
    CHTMLmlabeledtr.styles = {
        'mjx-mlabeledtr': {
            display: 'table-row'
        },
        'mjx-mlabeledtr[rowalign="top"] > mjx-mtd': {
            'vertical-align': 'top'
        },
        'mjx-mlabeledtr[rowalign="center"] > mjx-mtd': {
            'vertical-align': 'middle'
        },
        'mjx-mlabeledtr[rowalign="bottom"] > mjx-mtd': {
            'vertical-align': 'bottom'
        },
        'mjx-mlabeledtr[rowalign="baseline"] > mjx-mtd': {
            'vertical-align': 'baseline'
        },
        'mjx-mlabeledtr[rowalign="axis"] > mjx-mtd': {
            'vertical-align': '.25em'
        }
    };
    return CHTMLmlabeledtr;
}(CommonMlabeledtrMixin(CHTMLmtr)));
export { CHTMLmlabeledtr };
//# sourceMappingURL=mtr.js.map