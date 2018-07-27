import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
var MenuService = /** @class */ (function () {
    function MenuService() {
        this._change$ = new BehaviorSubject([]);
        this.data = [];
    }
    Object.defineProperty(MenuService.prototype, "change", {
        get: function () {
            return this._change$.pipe(share());
        },
        enumerable: true,
        configurable: true
    });
    MenuService.prototype.visit = function (callback) {
        var inFn = function (list, parentMenu, depth) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                callback(item, parentMenu, depth);
                if (item.children && item.children.length > 0) {
                    inFn(item.children, item, depth + 1);
                }
                else {
                    item.children = [];
                }
            }
        };
        inFn(this.data, null, 0);
    };
    MenuService.prototype.add = function (items) {
        this.data = items;
        this.resume();
    };
    /**
     * 重置菜单，可能I18N、用户权限变动时需要调用刷新
     */
    MenuService.prototype.resume = function (callback) {
        var i = 1;
        var shortcuts = [];
        this.visit(function (item, parent, depth) {
            item.__id = i++;
            item.__parent = parent;
            item._depth = depth;
            if (!item.link)
                item.link = '';
            if (typeof item.linkExact === 'undefined')
                item.linkExact = false;
            if (!item.externalLink)
                item.externalLink = '';
            // badge
            if (item.badge) {
                if (item.badge_dot !== true) {
                    item.badge_dot = false;
                }
                if (!item.badge_status) {
                    item.badge_status = 'error';
                }
            }
            item._type = item.externalLink ? 2 : 1;
            if (item.children && item.children.length > 0) {
                item._type = 3;
            }
            // shortcut
            if (parent && item.shortcut === true && parent.shortcut_root !== true)
                shortcuts.push(item);
            item.text = item.text;
            // hidden
            item._hidden = typeof item.hide === 'undefined' ? false : item.hide;
            if (callback)
                callback(item, parent, depth);
        });
        this.loadShortcut(shortcuts);
        this._change$.next(this.data);
    };
    /**
     * 加载快捷菜单，加载位置规则如下：
     * 1、统一在下标0的节点下（即【主导航】节点下方）
     *      1、若 children 存在 【shortcut_root: true】则最优先【推荐】这种方式
     *      2、否则查找带有【dashboard】字样链接，若存在则在此菜单的下方创建快捷入口
     *      3、否则放在0节点位置
     */
    MenuService.prototype.loadShortcut = function (shortcuts) {
        if (shortcuts.length === 0 || this.data.length === 0) {
            return;
        }
        var ls = this.data[0].children;
        var pos = ls.findIndex(function (w) { return w.shortcut_root === true; });
        if (pos === -1) {
            pos = ls.findIndex(function (w) { return w.link.includes('dashboard'); });
            pos = (pos !== -1 ? pos : -1) + 1;
            var shortcutMenu = {
                text: '快捷菜单',
                i18n: 'shortcut',
                icon: 'icon-rocket',
                children: [],
            };
            this.data[0].children.splice(pos, 0, shortcutMenu);
        }
        var _data = this.data[0].children[pos];
        _data = Object.assign(_data, {
            shortcut_root: true,
            _type: 3,
            __id: -1,
            _depth: 1,
        });
        _data.children = shortcuts.map(function (i) {
            i._depth = 2;
            return i;
        });
    };
    Object.defineProperty(MenuService.prototype, "menus", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 清空菜单
     */
    MenuService.prototype.clear = function () {
        this.data = [];
        this._change$.next(this.data);
    };
    /**
     * 根据URL设置菜单 `_open` 属性
     * @param url URL地址
     */
    MenuService.prototype.openedByUrl = function (url) {
        if (!url)
            return;
        var findItem = null;
        this.visit(function (item) {
            item._open = false;
            if (!item.link) {
                return;
            }
            if (!findItem && url.startsWith(item.link)) {
                findItem = item;
            }
        });
        if (!findItem)
            return;
        do {
            findItem._open = true;
            findItem = findItem.__parent;
        } while (findItem);
    };
    /**
     * 根据url获取菜单列表
     * @param url
     */
    MenuService.prototype.getPathByUrl = function (url) {
        var item = null;
        this.visit(function (i, parent, depth) {
            if (i.link === url) {
                item = i;
            }
        });
        var ret = [];
        if (!item)
            return ret;
        do {
            ret.splice(0, 0, item);
            item = item.__parent;
        } while (item);
        return ret;
    };
    MenuService.prototype.ngOnDestroy = function () {
        this._change$.unsubscribe();
        if (this.i18n$)
            this.i18n$.unsubscribe();
    };
    MenuService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    MenuService.ctorParameters = function () { return []; };
    return MenuService;
}());
export { MenuService };
//# sourceMappingURL=menu.service.js.map