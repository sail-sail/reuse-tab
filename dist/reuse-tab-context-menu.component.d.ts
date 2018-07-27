import { EventEmitter, OnInit } from '@angular/core';
import { ReuseContextCloseEvent, ReuseItem, CloseType } from './interface';
export declare class ReuseTabContextMenuComponent implements OnInit {
    item: ReuseItem;
    event: MouseEvent;
    close: EventEmitter<ReuseContextCloseEvent>;
    readonly includeNonCloseable: boolean;
    private notify;
    ngOnInit(): void;
    click(e: MouseEvent, type: CloseType): void;
    closeMenu(event: MouseEvent): void;
}
