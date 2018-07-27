import { Directive, HostListener, Input } from '@angular/core';
import { ReuseTabContextService } from './reuse-tab-context.service';
export class ReuseTabContextDirective {
    constructor(srv) {
        this.srv = srv;
    }
    onContextMenu(event) {
        this.srv.show.next({
            event,
            item: this.item,
        });
        event.preventDefault();
        event.stopPropagation();
    }
}
ReuseTabContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[context-menu]',
            },] },
];
/** @nocollapse */
ReuseTabContextDirective.ctorParameters = () => [
    { type: ReuseTabContextService, },
];
ReuseTabContextDirective.propDecorators = {
    'item': [{ type: Input, args: ['context-menu',] },],
    'onContextMenu': [{ type: HostListener, args: ['contextmenu', ['$event'],] },],
};
//# sourceMappingURL=reuse-tab-context.directive.js.map