import { Directive, HostListener, Input } from '@angular/core';
import { ReuseTabContextService } from './reuse-tab-context.service';
var ReuseTabContextDirective = /** @class */ (function () {
    function ReuseTabContextDirective(srv) {
        this.srv = srv;
    }
    ReuseTabContextDirective.prototype.onContextMenu = function (event) {
        this.srv.show.next({
            event: event,
            item: this.item,
        });
        event.preventDefault();
        event.stopPropagation();
    };
    ReuseTabContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[context-menu]',
                },] },
    ];
    /** @nocollapse */
    ReuseTabContextDirective.ctorParameters = function () { return [
        { type: ReuseTabContextService, },
    ]; };
    ReuseTabContextDirective.propDecorators = {
        'item': [{ type: Input, args: ['context-menu',] },],
        'onContextMenu': [{ type: HostListener, args: ['contextmenu', ['$event'],] },],
    };
    return ReuseTabContextDirective;
}());
export { ReuseTabContextDirective };
//# sourceMappingURL=reuse-tab-context.directive.js.map