import { Injectable, ElementRef } from '@angular/core';
import { Overlay, ConnectionPositionPair, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription, Subject } from 'rxjs';
import { ReuseTabContextMenuComponent } from './reuse-tab-context-menu.component';
export class ReuseTabContextService {
    constructor(overlay) {
        this.overlay = overlay;
        this.show = new Subject();
        this.close = new Subject();
    }
    remove() {
        if (!this.ref)
            return;
        this.ref.detach();
        this.ref.dispose();
        this.ref = null;
    }
    open(context) {
        this.remove();
        const { event, item } = context;
        const fakeElement = new ElementRef({
            getBoundingClientRect: () => ({
                bottom: event.clientY,
                height: 0,
                left: event.clientX,
                right: event.clientX,
                top: event.clientY,
                width: 0,
            }),
        });
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
        ];
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(fakeElement)
            .withPositions(positions);
        this.ref = this.overlay.create({
            positionStrategy,
            panelClass: 'reuse-tab-cm',
            scrollStrategy: this.overlay.scrollStrategies.close(),
        });
        const comp = this.ref.attach(new ComponentPortal(ReuseTabContextMenuComponent));
        const instance = comp.instance;
        instance.item = Object.assign({}, item);
        instance.event = event;
        const sub$ = new Subscription();
        sub$.add(instance.close.subscribe((res) => {
            this.close.next(res);
            this.remove();
        }));
        comp.onDestroy(() => sub$.unsubscribe());
    }
}
ReuseTabContextService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ReuseTabContextService.ctorParameters = () => [
    { type: Overlay, },
];
//# sourceMappingURL=reuse-tab-context.service.js.map