var AbstractWrapper = (function () {
    function AbstractWrapper(factory, node) {
        this.factory = factory;
        this.node = node;
    }
    Object.defineProperty(AbstractWrapper.prototype, "kind", {
        get: function () {
            return this.node.kind;
        },
        enumerable: true,
        configurable: true
    });
    AbstractWrapper.prototype.wrap = function (node) {
        return this.factory.wrap(node);
    };
    return AbstractWrapper;
}());
export { AbstractWrapper };
//# sourceMappingURL=Wrapper.js.map