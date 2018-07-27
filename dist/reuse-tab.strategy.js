var ReuseTabStrategy = /** @class */ (function () {
    function ReuseTabStrategy(srv) {
        this.srv = srv;
    }
    ReuseTabStrategy.prototype.shouldDetach = function (route) {
        return this.srv.shouldDetach(route);
    };
    ReuseTabStrategy.prototype.store = function (route, handle) {
        this.srv.store(route, handle);
    };
    ReuseTabStrategy.prototype.shouldAttach = function (route) {
        return this.srv.shouldAttach(route);
    };
    ReuseTabStrategy.prototype.retrieve = function (route) {
        return this.srv.retrieve(route);
    };
    ReuseTabStrategy.prototype.shouldReuseRoute = function (future, curr) {
        return this.srv.shouldReuseRoute(future, curr);
    };
    return ReuseTabStrategy;
}());
export { ReuseTabStrategy };
//# sourceMappingURL=reuse-tab.strategy.js.map