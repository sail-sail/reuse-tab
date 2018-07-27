import { RouteReuseStrategy, ActivatedRouteSnapshot } from '@angular/router';
import { ReuseTabService } from './reuse-tab.service';
export declare class ReuseTabStrategy implements RouteReuseStrategy {
    private srv;
    constructor(srv: ReuseTabService);
    shouldDetach(route: ActivatedRouteSnapshot): boolean;
    store(route: ActivatedRouteSnapshot, handle: {}): void;
    shouldAttach(route: ActivatedRouteSnapshot): boolean;
    retrieve(route: ActivatedRouteSnapshot): {};
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
}
