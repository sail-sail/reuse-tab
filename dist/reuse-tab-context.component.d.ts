import { EventEmitter, OnDestroy } from '@angular/core';
import { ReuseContextCloseEvent } from './interface';
import { ReuseTabContextService } from './reuse-tab-context.service';
export declare class ReuseTabContextComponent implements OnDestroy {
    private srv;
    private sub$;
    change: EventEmitter<ReuseContextCloseEvent>;
    constructor(srv: ReuseTabContextService);
    ngOnDestroy(): void;
}
