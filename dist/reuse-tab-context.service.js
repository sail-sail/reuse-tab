var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Injectable, ElementRef } from '@angular/core';
import { Overlay, ConnectionPositionPair, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription, Subject } from 'rxjs';
import { ReuseTabContextMenuComponent } from './reuse-tab-context-menu.component';
var ReuseTabContextService = /** @class */ (function () {
    function ReuseTabContextService(overlay) {
        this.overlay = overlay;
        this.show = new Subject();
        this.close = new Subject();
    }
    ReuseTabContextService.prototype.remove = function () {
        if (!this.ref)
            return;
        this.ref.detach();
        this.ref.dispose();
        this.ref = null;
    };
    ReuseTabContextService.prototype.open = function (context) {
        var _this = this;
        this.remove();
        var event = context.event, item = context.item;
        var fakeElement = new ElementRef({
            getBoundingClientRect: function () { return ({
                bottom: event.clientY,
                height: 0,
                left: event.clientX,
                right: event.clientX,
                top: event.clientY,
                width: 0,
            }); },
        });
        var positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
        ];
        var positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(fakeElement)
            .withPositions(positions);
        this.ref = this.overlay.create({
            positionStrategy: positionStrategy,
            panelClass: 'reuse-tab-cm',
            scrollStrategy: this.overlay.scrollStrategies.close(),
        });
        var comp = this.ref.attach(new ComponentPortal(ReuseTabContextMenuComponent));
        var instance = comp.instance;
        instance.item = __assign({}, item);
        instance.event = event;
        var sub$ = new Subscription();
        sub$.add(instance.close.subscribe(function (res) {
            _this.close.next(res);
            _this.remove();
        }));
        comp.onDestroy(function () { return sub$.unsubscribe(); });
    };
    ReuseTabContextService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ReuseTabContextService.ctorParameters = function () { return [
        { type: Overlay, },
    ]; };
    return ReuseTabContextService;
}());
export { ReuseTabContextService };
//# sourceMappingURL=reuse-tab-context.service.js.map