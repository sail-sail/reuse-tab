import { Overlay } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ReuseContextEvent, ReuseContextCloseEvent } from './interface';
export declare class ReuseTabContextService {
    private overlay;
    private ref;
    show: Subject<ReuseContextEvent>;
    close: Subject<ReuseContextCloseEvent>;
    constructor(overlay: Overlay);
    remove(): void;
    open(context: ReuseContextEvent): void;
}
