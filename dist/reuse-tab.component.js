import { Component, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, ElementRef, Renderer2, Inject, } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ReuseTabService } from './reuse-tab.service';
import { ReuseTabMatchMode, } from './interface';
import { ReuseTabContextService } from './reuse-tab-context.service';
var ReuseTabComponent = /** @class */ (function () {
    // endregion
    function ReuseTabComponent(srv, cd, router, route, el, render, doc) {
        var _this = this;
        this.srv = srv;
        this.cd = cd;
        this.router = router;
        this.route = route;
        this.el = el;
        this.render = render;
        this.doc = doc;
        this.list = [];
        this.pos = 0;
        // region: properties
        /** 设置匹配模式 */
        this.mode = ReuseTabMatchMode.Menu;
        this._debug = false;
        this._allowClose = true;
        this._fixed = true;
        this._showCurrent = true;
        /** 切换时回调 */
        this.change = new EventEmitter();
        /** 关闭回调 */
        this.close = new EventEmitter();
        var route$ = this.router.events.pipe(filter(function (evt) { return evt instanceof NavigationEnd; }));
        this.sub$ = combineLatest(this.srv.change, route$).subscribe(function (_a) {
            var res = _a[0], e = _a[1];
            return _this.genList(res);
        });
    }
    Object.defineProperty(ReuseTabComponent.prototype, "debug", {
        /** 是否Debug模式 */
        get: function () {
            return this._debug;
        },
        set: function (value) {
            this._debug = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabComponent.prototype, "max", {
        /** 允许最多复用多少个页面 */
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = Number(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabComponent.prototype, "allowClose", {
        /** 允许关闭 */
        get: function () {
            return this._allowClose;
        },
        set: function (value) {
            this._allowClose = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabComponent.prototype, "fixed", {
        /** 是否固定 */
        get: function () {
            return this._fixed;
        },
        set: function (value) {
            this._fixed = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabComponent.prototype, "showCurrent", {
        /** 总是显示当前页 */
        get: function () {
            return this._showCurrent;
        },
        set: function (value) {
            this._showCurrent = !!value;
        },
        enumerable: true,
        configurable: true
    });
    ReuseTabComponent.prototype.genTit = function (title) {
        return title.text;
    };
    ReuseTabComponent.prototype.genList = function (notify) {
        var _this = this;
        var isClosed = notify && notify.active === 'close';
        var beforeClosePos = isClosed
            ? this.list.findIndex(function (w) { return w.url === notify.url; })
            : -1;
        var ls = this.srv.items.map(function (item, index) {
            return {
                url: item.url,
                title: _this.genTit(item.title),
                closable: _this.allowClose && item.closable && _this.srv.count > 0,
                index: index,
                active: false,
                last: false,
            };
        });
        if (this.showCurrent) {
            var snapshot = this.route.snapshot;
            var url_1 = this.srv.getUrl(snapshot);
            var idx = ls.findIndex(function (w) { return w.url === url_1; });
            // jump directly when the current exists in the list
            // or create a new current item and jump
            if (idx !== -1 || (isClosed && notify.url === url_1)) {
                this.pos = isClosed
                    ? idx >= beforeClosePos
                        ? this.pos - 1
                        : this.pos
                    : idx;
            }
            else {
                var snapshotTrue = this.srv.getTruthRoute(snapshot);
                ls.push({
                    url: url_1,
                    title: this.genTit(this.srv.getTitle(url_1, snapshotTrue)),
                    closable: this.allowClose &&
                        this.srv.count > 0 &&
                        this.srv.getClosable(url_1, snapshotTrue),
                    index: ls.length,
                    active: false,
                    last: false,
                });
                this.pos = ls.length - 1;
            }
            // fix unabled close last item
            if (ls.length <= 1)
                ls[0].closable = false;
        }
        this.list = ls;
        if (ls.length && isClosed) {
            this.to(null, this.pos);
        }
        this.refStatus(false);
        this.visibility();
        this.cd.detectChanges();
    };
    ReuseTabComponent.prototype.visibility = function () {
        if (this.showCurrent)
            return;
        this.render.setStyle(this.el.nativeElement, 'display', this.list.length === 0 ? 'none' : 'block');
    };
    // region: UI
    ReuseTabComponent.prototype.cmChange = function (res) {
        switch (res.type) {
            case 'close':
                this._close(null, res.item.index, res.includeNonCloseable);
                break;
            case 'closeRight':
                this.srv.closeRight(res.item.url, res.includeNonCloseable);
                this.close.emit(null);
                break;
            case 'clear':
            case 'closeOther':
                this.srv.clear(res.includeNonCloseable);
                this.close.emit(null);
                break;
        }
    };
    ReuseTabComponent.prototype.refStatus = function (dc) {
        var _this = this;
        if (dc === void 0) { dc = true; }
        if (this.list.length) {
            this.list[this.list.length - 1].last = true;
            this.list.forEach(function (i, idx) { return (i.active = _this.pos === idx); });
        }
        if (dc)
            this.cd.detectChanges();
    };
    ReuseTabComponent.prototype.to = function (e, index) {
        var _this = this;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        index = Math.max(0, Math.min(index, this.list.length - 1));
        var item = this.list[index];
        this.router.navigateByUrl(item.url).then(function (res) {
            if (!res)
                return;
            _this.pos = index;
            _this.item = item;
            _this.refStatus();
            _this.change.emit(item);
        });
    };
    ReuseTabComponent.prototype._close = function (e, idx, includeNonCloseable) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        var item = this.list[idx];
        this.srv.close(item.url, includeNonCloseable);
        this.close.emit(item);
        this.cd.detectChanges();
        return false;
    };
    // endregion
    ReuseTabComponent.prototype.ngOnInit = function () {
        this.setClass();
        this.genList();
    };
    ReuseTabComponent.prototype.setClass = function () {
        var body = this.doc.querySelector('body');
        var bodyCls = "has-ad-rt";
        if (this.fixed) {
            this.render.addClass(body, bodyCls);
        }
        else {
            this.render.removeClass(body, bodyCls);
        }
    };
    ReuseTabComponent.prototype.ngOnChanges = function (changes) {
        if (changes.max)
            this.srv.max = this.max;
        if (changes.excludes)
            this.srv.excludes = this.excludes;
        if (changes.mode)
            this.srv.mode = this.mode;
        this.srv.debug = this.debug;
        this.setClass();
        this.cd.detectChanges();
    };
    ReuseTabComponent.prototype.ngOnDestroy = function () {
        this.sub$.unsubscribe();
    };
    ReuseTabComponent.prototype.selectedIndexChange = function (index) {
        var t = this;
        t.to(null, index);
    };
    ReuseTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'reuse-tab',
                    template: "<mat-tab-group [selectedIndex]=\"pos\" (selectedIndexChange)=\"selectedIndexChange($event)\"><mat-tab *ngFor=\"let i of list; let index = index\" [context-menu]=\"i\"><ng-template mat-tab-label><span>{{i.title}}</span><mat-icon *ngIf=\"i.closable\" class=\"tab_close\" (click)=\"_close($event, index, false)\">close</mat-icon></ng-template></mat-tab></mat-tab-group><reuse-tab-context (change)=\"cmChange($event)\"></reuse-tab-context>",
                    styles: [":host ::ng-deep .mat-tab-label{cursor:default}.tab_close{margin-left:15px;width:15px;height:15px;font-size:18px;cursor:pointer}.tab_close:hover{color:red}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    providers: [ReuseTabContextService],
                },] },
    ];
    /** @nocollapse */
    ReuseTabComponent.ctorParameters = function () { return [
        { type: ReuseTabService, },
        { type: ChangeDetectorRef, },
        { type: Router, },
        { type: ActivatedRoute, },
        { type: ElementRef, },
        { type: Renderer2, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    ReuseTabComponent.propDecorators = {
        'mode': [{ type: Input },],
        'debug': [{ type: Input },],
        'max': [{ type: Input },],
        'excludes': [{ type: Input },],
        'allowClose': [{ type: Input },],
        'fixed': [{ type: Input },],
        'showCurrent': [{ type: Input },],
        'change': [{ type: Output },],
        'close': [{ type: Output },],
    };
    return ReuseTabComponent;
}());
export { ReuseTabComponent };
//# sourceMappingURL=reuse-tab.component.js.map