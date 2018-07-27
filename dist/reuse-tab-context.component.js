import { Component, Output, EventEmitter, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReuseTabContextService } from './reuse-tab-context.service';
export class ReuseTabContextComponent {
    constructor(srv) {
        this.srv = srv;
        this.sub$ = new Subscription();
        this.change = new EventEmitter();
        this.sub$.add(srv.show.subscribe(context => this.srv.open(context)));
        this.sub$.add(srv.close.subscribe(res => this.change.emit(res)));
    }
    ngOnDestroy() {
        this.sub$.unsubscribe();
    }
}
ReuseTabContextComponent.decorators = [
    { type: Component, args: [{
                selector: 'reuse-tab-context',
                template: ``,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
ReuseTabContextComponent.ctorParameters = () => [
    { type: ReuseTabContextService, },
];
ReuseTabContextComponent.propDecorators = {
    'change': [{ type: Output },],
};
//# sourceMappingURL=reuse-tab-context.component.js.map