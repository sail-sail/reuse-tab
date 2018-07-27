import { Injectable, Optional, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ReuseTabMatchMode, } from './interface';
import { MenuService } from './menu/menu.service';
/**
 * 路由复用类，提供复用所需要一些基本接口
 *
 * **注：** 所有缓存数据来源于路由离开后才会产生
 */
var ReuseTabService = /** @class */ (function () {
    // endregion
    function ReuseTabService(injector, menuService) {
        this.injector = injector;
        this.menuService = menuService;
        this._max = 10;
        this._debug = false;
        this._mode = ReuseTabMatchMode.Menu;
        this._excludes = [];
        this._cachedChange = new BehaviorSubject(null);
        this._cached = [];
        this._titleCached = {};
        this._closableCached = {};
    }
    Object.defineProperty(ReuseTabService.prototype, "curUrl", {
        // region: public
        /** 当前路由地址 */
        get: function () {
            return this.getUrl(this.injector.get(ActivatedRoute).snapshot);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "max", {
        /** 允许最多复用多少个页面，取值范围 `2-100` */
        set: function (value) {
            this._max = Math.min(Math.max(value, 2), 100);
            for (var i = this._cached.length; i > this._max; i--) {
                this._cached.pop();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        /** 设置匹配模式 */
        set: function (value) {
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "debug", {
        get: function () {
            return this._debug;
        },
        /** 设置Debug模式 */
        set: function (value) {
            this._debug = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "excludes", {
        get: function () {
            return this._excludes;
        },
        /** 排除规则，限 `mode=URL` */
        set: function (values) {
            if (!values)
                return;
            this._excludes = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "items", {
        /** 获取已缓存的路由 */
        get: function () {
            return this._cached;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "count", {
        /** 获取当前缓存的路由总数 */
        get: function () {
            return this._cached.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "change", {
        /** 订阅缓存变更通知 */
        get: function () {
            return this._cachedChange.asObservable(); // .pipe(filter(w => w !== null));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReuseTabService.prototype, "title", {
        /** 自定义当前标题 */
        set: function (value) {
            var url = this.curUrl;
            if (typeof value === 'string')
                value = { text: value };
            this._titleCached[url] = value;
            this.di('update current tag title: ', value);
            this._cachedChange.next({
                active: 'title',
                title: value,
                list: this._cached,
            });
        },
        enumerable: true,
        configurable: true
    });
    /** 获取指定路径缓存所在位置，`-1` 表示无缓存 */
    ReuseTabService.prototype.index = function (url) {
        return this._cached.findIndex(function (w) { return w.url === url; });
    };
    /** 获取指定路径缓存是否存在 */
    ReuseTabService.prototype.exists = function (url) {
        return this.index(url) !== -1;
    };
    /** 获取指定路径缓存 */
    ReuseTabService.prototype.get = function (url) {
        return url ? this._cached.find(function (w) { return w.url === url; }) || null : null;
    };
    ReuseTabService.prototype.remove = function (url, includeNonCloseable) {
        var idx = typeof url === 'string' ? this.index(url) : url;
        var item = idx !== -1 ? this._cached[idx] : null;
        if (!item || (!includeNonCloseable && !item.closable))
            return false;
        this.destroy(item._handle);
        this._cached.splice(idx, 1);
        delete this._titleCached[url];
        return true;
    };
    /**
     * 根据URL移除标签
     *
     * @param [includeNonCloseable=false] 是否强制包含不可关闭
     */
    ReuseTabService.prototype.close = function (url, includeNonCloseable) {
        if (includeNonCloseable === void 0) { includeNonCloseable = false; }
        this.removeUrlBuffer = url;
        this.remove(url, includeNonCloseable);
        this._cachedChange.next({ active: 'close', url: url, list: this._cached });
        this.di('close tag', url);
        return true;
    };
    /**
     * 清除右边
     *
     * @param [includeNonCloseable=false] 是否强制包含不可关闭
     */
    ReuseTabService.prototype.closeRight = function (url, includeNonCloseable) {
        if (includeNonCloseable === void 0) { includeNonCloseable = false; }
        var start = this.index(url);
        for (var i = this.count - 1; i > start; i--) {
            this.remove(i, includeNonCloseable);
        }
        this.removeUrlBuffer = null;
        this._cachedChange.next({ active: 'closeRight', url: url, list: this._cached });
        this.di('close right tages', url);
        return true;
    };
    /**
     * 清除所有缓存
     *
     * @param [includeNonCloseable=false] 是否强制包含不可关闭
     */
    ReuseTabService.prototype.clear = function (includeNonCloseable) {
        var _this = this;
        if (includeNonCloseable === void 0) { includeNonCloseable = false; }
        this._cached.forEach(function (w) {
            if (!includeNonCloseable && w.closable)
                _this.destroy(w._handle);
        });
        this._cached = this._cached.filter(function (w) { return !includeNonCloseable && !w.closable; });
        this.removeUrlBuffer = null;
        this._cachedChange.next({ active: 'clear', list: this._cached });
        this.di('clear all catch');
    };
    /**
     * 移动缓存数据
     * @param url 要移动的URL地址
     * @param position 新位置，下标从 `0` 开始
     *
     * @example
     * ```
     * // source
     * [ '/a/1', '/a/2', '/a/3', '/a/4', '/a/5' ]
     * move('/a/1', 2);
     * // output
     * [ '/a/2', '/a/3', '/a/1', '/a/4', '/a/5' ]
     * move('/a/1', -1);
     * // output
     * [ '/a/2', '/a/3', '/a/4', '/a/5', '/a/1' ]
     * ```
     */
    ReuseTabService.prototype.move = function (url, position) {
        var start = this._cached.findIndex(function (w) { return w.url === url; });
        if (start === -1)
            return;
        var data = this._cached.slice();
        data.splice(position < 0 ? data.length + position : position, 0, data.splice(start, 1)[0]);
        this._cached = data;
        this._cachedChange.next({
            active: 'move',
            url: url,
            position: position,
            list: this._cached,
        });
    };
    /**
     * 强制关闭当前路由（包含不可关闭状态），并重新导航至 `newUrl` 路由
     */
    ReuseTabService.prototype.replace = function (newUrl) {
        var url = this.curUrl;
        if (this.exists(url)) {
            this.close(url, true);
        }
        else {
            this.removeUrlBuffer = url;
        }
        this.injector.get(Router).navigateByUrl(newUrl);
    };
    /**
     * 获取标题，顺序如下：
     *
     * 1. 组件内使用 `ReuseTabService.title = 'new title'` 重新指定文本
     * 2. 路由配置中 data 属性
     * 3. 菜单数据中 text 属性
     *
     * @param url 指定URL
     * @param route 指定路由快照
     */
    ReuseTabService.prototype.getTitle = function (url, route) {
        if (this._titleCached[url])
            return this._titleCached[url];
        if (route && route.data && (route.data.titleI18n || route.data.title))
            return { text: route.data.title };
        var menu = this.mode !== ReuseTabMatchMode.URL ? this.getMenu(url) : null;
        return menu ? { text: menu.text } : { text: url };
    };
    /**
     * 清除标题缓存
     */
    ReuseTabService.prototype.clearTitleCached = function () {
        this._titleCached = {};
    };
    Object.defineProperty(ReuseTabService.prototype, "closable", {
        /** 自定义当前 `closable` 状态 */
        set: function (value) {
            var url = this.curUrl;
            this._closableCached[url] = value;
            this.di('update current tag closable: ', value);
            this._cachedChange.next({
                active: 'closable',
                closable: value,
                list: this._cached,
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取 `closable` 状态，顺序如下：
     *
     * 1. 组件内使用 `ReuseTabService.closable = true` 重新指定 `closable` 状态
     * 2. 路由配置中 data 属性中包含 `reuseClosable`
     * 3. 菜单数据中 `reuseClosable` 属性
     *
     * @param url 指定URL
     * @param route 指定路由快照
     */
    ReuseTabService.prototype.getClosable = function (url, route) {
        if (typeof this._closableCached[url] !== 'undefined')
            return this._closableCached[url];
        if (route && route.data && typeof route.data.reuseClosable === 'boolean')
            return route.data.reuseClosable;
        var menu = this.mode !== ReuseTabMatchMode.URL ? this.getMenu(url) : null;
        if (menu && typeof menu.reuseClosable === 'boolean')
            return menu.reuseClosable;
        return true;
    };
    /**
     * 清空 `closable` 缓存
     */
    ReuseTabService.prototype.clearClosableCached = function () {
        this._closableCached = {};
    };
    ReuseTabService.prototype.getTruthRoute = function (route) {
        var next = route;
        while (next.firstChild)
            next = next.firstChild;
        return next;
    };
    /**
     * 根据快照获取URL地址
     */
    ReuseTabService.prototype.getUrl = function (route) {
        var next = this.getTruthRoute(route);
        var segments = [];
        while (next) {
            segments.push(next.url.join('/'));
            next = next.parent;
        }
        var url = '/' +
            segments
                .filter(function (i) { return i; })
                .reverse()
                .join('/');
        return url;
    };
    /**
     * 检查快照是否允许被复用
     */
    ReuseTabService.prototype.can = function (route) {
        var url = this.getUrl(route);
        if (url === this.removeUrlBuffer)
            return false;
        if (route.data && typeof route.data.reuse === 'boolean')
            return route.data.reuse;
        if (this.mode !== ReuseTabMatchMode.URL) {
            var menu = this.getMenu(url);
            if (!menu)
                return false;
            if (this.mode === ReuseTabMatchMode.Menu) {
                if (menu.reuse === false)
                    return false;
            }
            else {
                if (!menu.reuse || menu.reuse !== true)
                    return false;
            }
            return true;
        }
        return this._excludes.findIndex(function (r) { return r.test(url); }) === -1;
    };
    /**
     * 刷新，触发一个 refresh 类型事件
     */
    ReuseTabService.prototype.refresh = function (data) {
        this._cachedChange.next({ active: 'refresh', data: data });
    };
    // endregion
    // region: privates
    ReuseTabService.prototype.destroy = function (_handle) {
        if (_handle && _handle.componentRef && _handle.componentRef.destroy)
            _handle.componentRef.destroy();
    };
    ReuseTabService.prototype.di = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.debug)
            return;
        // tslint:disable-next-line:no-console
        console.warn.apply(console, args);
    };
    ReuseTabService.prototype.getMenu = function (url) {
        var menus = this.menuService ? this.menuService.getPathByUrl(url) : [];
        if (!menus || menus.length === 0)
            return null;
        return menus.pop();
    };
    ReuseTabService.prototype.runHook = function (method, url, comp) {
        if (comp.instance && typeof comp.instance[method] === 'function')
            comp.instance[method]();
    };
    ReuseTabService.prototype.hasInValidRoute = function (route) {
        return (!route.routeConfig ||
            route.routeConfig.loadChildren ||
            route.routeConfig.children);
    };
    /**
     * 决定是否允许路由复用，若 `true` 会触发 `store`
     */
    ReuseTabService.prototype.shouldDetach = function (route) {
        if (this.hasInValidRoute(route))
            return false;
        this.di('#shouldDetach', this.can(route), this.getUrl(route));
        return this.can(route);
    };
    /**
     * 存储
     */
    ReuseTabService.prototype.store = function (_snapshot, _handle) {
        if (this.count >= this._max)
            this._cached.shift();
        var url = this.getUrl(_snapshot);
        var idx = this.index(url);
        var item = {
            title: this.getTitle(url, _snapshot),
            closable: this.getClosable(url, _snapshot),
            url: url,
            _snapshot: _snapshot,
            _handle: _handle,
        };
        if (idx === -1) {
            this._cached.push(item);
        }
        else {
            this._cached[idx] = item;
        }
        this.removeUrlBuffer = null;
        this.di('#store', idx === -1 ? '[new]' : '[override]', url);
        if (_handle && _handle.componentRef) {
            this.runHook('_onReuseDestroy', url, _handle.componentRef);
        }
        this._cachedChange.next({ active: 'add', item: item, list: this._cached });
    };
    /**
     * 决定是否允许应用缓存数据
     */
    ReuseTabService.prototype.shouldAttach = function (route) {
        if (this.hasInValidRoute(route))
            return false;
        var url = this.getUrl(route);
        var data = this.get(url);
        var ret = !!(data && data._handle);
        this.di('#shouldAttach', ret, url);
        if (ret && data._handle.componentRef) {
            this.runHook('_onReuseInit', url, data._handle.componentRef);
        }
        return ret;
    };
    /**
     * 提取复用数据
     */
    ReuseTabService.prototype.retrieve = function (route) {
        if (this.hasInValidRoute(route))
            return null;
        var url = this.getUrl(route);
        var data = this.get(url);
        var ret = (data && data._handle) || null;
        this.di('#retrieve', url, ret);
        return ret;
    };
    /**
     * 决定是否应该进行复用路由处理
     */
    ReuseTabService.prototype.shouldReuseRoute = function (future, curr) {
        var ret = future.routeConfig === curr.routeConfig;
        if (!ret)
            return false;
        var path = ((future.routeConfig && future.routeConfig.path) ||
            '');
        if (path.length > 0 && ~path.indexOf(':')) {
            var futureUrl = this.getUrl(future);
            var currUrl = this.getUrl(curr);
            ret = futureUrl === currUrl;
        }
        this.di('=====================');
        this.di('#shouldReuseRoute', ret, this.getUrl(curr) + "=>" + this.getUrl(future), future, curr);
        return ret;
    };
    ReuseTabService.prototype.ngOnDestroy = function () {
        this._cached = [];
        this._cachedChange.unsubscribe();
    };
    ReuseTabService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ReuseTabService.ctorParameters = function () { return [
        { type: Injector, },
        { type: MenuService, decorators: [{ type: Optional },] },
    ]; };
    return ReuseTabService;
}());
export { ReuseTabService };
//# sourceMappingURL=reuse-tab.service.js.map