import { OnChanges, ChangeDetectorRef, EventEmitter, OnInit, SimpleChanges, SimpleChange, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReuseTabService } from './reuse-tab.service';
import { ReuseTabMatchMode, ReuseItem, ReuseContextCloseEvent } from './interface';
export declare class ReuseTabComponent implements OnInit, OnChanges, OnDestroy {
    srv: ReuseTabService;
    private cd;
    private router;
    private route;
    private el;
    private render;
    private doc;
    private sub$;
    list: ReuseItem[];
    item: ReuseItem;
    pos: number;
    /** 设置匹配模式 */
    mode: ReuseTabMatchMode;
    /** 是否Debug模式 */
    debug: any;
    private _debug;
    /** 允许最多复用多少个页面 */
    max: any;
    private _max;
    /** 排除规则，限 `mode=URL` */
    excludes: RegExp[];
    /** 允许关闭 */
    allowClose: any;
    private _allowClose;
    /** 是否固定 */
    fixed: any;
    private _fixed;
    /** 总是显示当前页 */
    showCurrent: any;
    private _showCurrent;
    /** 切换时回调 */
    change: EventEmitter<ReuseItem>;
    /** 关闭回调 */
    close: EventEmitter<ReuseItem>;
    constructor(srv: ReuseTabService, cd: ChangeDetectorRef, router: Router, route: ActivatedRoute, el: ElementRef, render: Renderer2, doc: any);
    private genTit;
    private genList;
    private visibility;
    cmChange(res: ReuseContextCloseEvent): void;
    refStatus(dc?: boolean): void;
    to(e: Event, index: number): void;
    _close(e: Event, idx: number, includeNonCloseable: boolean): boolean;
    ngOnInit(): void;
    private setClass;
    ngOnChanges(changes: {
        [P in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    ngOnDestroy(): void;
    selectedIndexChange(index: number): void;
}
