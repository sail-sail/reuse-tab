import { Component, Input, EventEmitter, Output, HostListener, } from '@angular/core';
var ReuseTabContextMenuComponent = /** @class */ (function () {
    function ReuseTabContextMenuComponent() {
        this.close = new EventEmitter();
    }
    Object.defineProperty(ReuseTabContextMenuComponent.prototype, "includeNonCloseable", {
        get: function () {
            return this.event.ctrlKey;
        },
        enumerable: true,
        configurable: true
    });
    ReuseTabContextMenuComponent.prototype.notify = function (type, _item) {
        this.close.next({
            type: type,
            item: this.item,
            includeNonCloseable: this.includeNonCloseable,
        });
    };
    ReuseTabContextMenuComponent.prototype.ngOnInit = function () {
        if (this.includeNonCloseable)
            this.item.closable = true;
    };
    ReuseTabContextMenuComponent.prototype.click = function (e, type) {
        e.preventDefault();
        e.stopPropagation();
        if (type === 'close' && !this.item.closable)
            return;
        if (type === 'closeRight' && this.item.last)
            return;
        this.notify(type, this.item);
    };
    ReuseTabContextMenuComponent.prototype.closeMenu = function (event) {
        if (event.type === 'click' && event.button === 2)
            return;
        this.notify(null, null);
    };
    ReuseTabContextMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'reuse-tab-context-menu',
                    template: "\n  <mat-menu>\n    <button mat-menu-item (click)=\"click($event, 'close')\" [disabled]=\"!item.closable\">\u5173\u95ED</button>\n    <button mat-menu-item (click)=\"click($event, 'closeOther')\" data-type=\"closeOther\">\u5173\u95ED\u5176\u5B83</button>\n    <button mat-menu-item (click)=\"click($event, 'closeRight')\" data-type=\"closeRight\" [disabled]=\"item.last\">\u5173\u95ED\u53F3\u4FA7</button>\n    <button mat-menu-item (click)=\"click($event, 'clear')\" data-type=\"clear\">\u6E05\u7A7A</button>\n  </mat-menu>\n  ",
                    preserveWhitespaces: false,
                },] },
    ];
    /** @nocollapse */
    ReuseTabContextMenuComponent.ctorParameters = function () { return []; };
    ReuseTabContextMenuComponent.propDecorators = {
        'item': [{ type: Input },],
        'event': [{ type: Input },],
        'close': [{ type: Output },],
        'closeMenu': [{ type: HostListener, args: ['document:click', ['$event'],] }, { type: HostListener, args: ['document:contextmenu', ['$event'],] },],
    };
    return ReuseTabContextMenuComponent;
}());
export { ReuseTabContextMenuComponent };
//# sourceMappingURL=reuse-tab-context-menu.component.js.map