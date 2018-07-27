import { Component, Output, EventEmitter, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReuseTabContextService } from './reuse-tab-context.service';
var ReuseTabContextComponent = /** @class */ (function () {
    function ReuseTabContextComponent(srv) {
        var _this = this;
        this.srv = srv;
        this.sub$ = new Subscription();
        this.change = new EventEmitter();
        this.sub$.add(srv.show.subscribe(function (context) { return _this.srv.open(context); }));
        this.sub$.add(srv.close.subscribe(function (res) { return _this.change.emit(res); }));
    }
    ReuseTabContextComponent.prototype.ngOnDestroy = function () {
        this.sub$.unsubscribe();
    };
    ReuseTabContextComponent.decorators = [
        { type: Component, args: [{
                    selector: 'reuse-tab-context',
                    template: "",
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    ReuseTabContextComponent.ctorParameters = function () { return [
        { type: ReuseTabContextService, },
    ]; };
    ReuseTabContextComponent.propDecorators = {
        'change': [{ type: Output },],
    };
    return ReuseTabContextComponent;
}());
export { ReuseTabContextComponent };
//# sourceMappingURL=reuse-tab-context.component.js.map