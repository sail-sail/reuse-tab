import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  ReuseContextCloseEvent,
  ReuseItem,
  CloseType,
} from './interface';

@Component({
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
})
export class ReuseTabContextMenuComponent implements OnInit {

  @Input() item: ReuseItem;

  @Input() event: MouseEvent;

  @Output() close = new EventEmitter<ReuseContextCloseEvent>();

  get includeNonCloseable() {
    return this.event.ctrlKey;
  }

  private notify(type: CloseType, _item: ReuseItem) {
    this.close.next({
      type,
      item: this.item,
      includeNonCloseable: this.includeNonCloseable,
    });
  }

  ngOnInit(): void {
    if (this.includeNonCloseable) this.item.closable = true;
  }

  click(e: MouseEvent, type: CloseType) {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'close' && !this.item.closable) return;
    if (type === 'closeRight' && this.item.last) return;
    this.notify(type, this.item);
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:contextmenu', ['$event'])
  closeMenu(event: MouseEvent): void {
    if (event.type === 'click' && event.button === 2) return;
    this.notify(null, null);
  }
}
