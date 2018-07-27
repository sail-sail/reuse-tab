import { Component, Input, EventEmitter, Output, HostListener, } from '@angular/core';
export class ReuseTabContextMenuComponent {
    constructor() {
        this.close = new EventEmitter();
    }
    get includeNonCloseable() {
        return this.event.ctrlKey;
    }
    notify(type, _item) {
        this.close.next({
            type,
            item: this.item,
            includeNonCloseable: this.includeNonCloseable,
        });
    }
    ngOnInit() {
        if (this.includeNonCloseable)
            this.item.closable = true;
    }
    click(e, type) {
        e.preventDefault();
        e.stopPropagation();
        if (type === 'close' && !this.item.closable)
            return;
        if (type === 'closeRight' && this.item.last)
            return;
        this.notify(type, this.item);
    }
    closeMenu(event) {
        if (event.type === 'click' && event.button === 2)
            return;
        this.notify(null, null);
    }
}
ReuseTabContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'reuse-tab-context-menu',
                template: `
  <mat-menu>
    <button mat-menu-item (click)="click($event, 'close')" [disabled]="!item.closable">关闭</button>
    <button mat-menu-item (click)="click($event, 'closeOther')" data-type="closeOther">关闭其它</button>
    <button mat-menu-item (click)="click($event, 'closeRight')" data-type="closeRight" [disabled]="item.last">关闭右侧</button>
    <button mat-menu-item (click)="click($event, 'clear')" data-type="clear">清空</button>
  </mat-menu>
  `,
                preserveWhitespaces: false,
            },] },
];
/** @nocollapse */
ReuseTabContextMenuComponent.ctorParameters = () => [];
ReuseTabContextMenuComponent.propDecorators = {
    'item': [{ type: Input },],
    'event': [{ type: Input },],
    'close': [{ type: Output },],
    'closeMenu': [{ type: HostListener, args: ['document:click', ['$event'],] }, { type: HostListener, args: ['document:contextmenu', ['$event'],] },],
};
//# sourceMappingURL=reuse-tab-context-menu.component.js.map