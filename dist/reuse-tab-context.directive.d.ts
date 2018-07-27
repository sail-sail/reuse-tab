import { ReuseTabContextService } from './reuse-tab-context.service';
import { ReuseItem } from './interface';
export declare class ReuseTabContextDirective {
    private srv;
    item: ReuseItem;
    constructor(srv: ReuseTabContextService);
    onContextMenu(event: MouseEvent): void;
}
