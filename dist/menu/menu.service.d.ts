import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from './interface';
export declare class MenuService implements OnDestroy {
    private _change$;
    private i18n$;
    private data;
    constructor();
    readonly change: Observable<Menu[]>;
    visit(callback: (item: Menu, parentMenum: Menu, depth?: number) => void): void;
    add(items: Menu[]): void;
    /**
     * 重置菜单，可能I18N、用户权限变动时需要调用刷新
     */
    resume(callback?: (item: Menu, parentMenum: Menu, depth?: number) => void): void;
    /**
     * 加载快捷菜单，加载位置规则如下：
     * 1、统一在下标0的节点下（即【主导航】节点下方）
     *      1、若 children 存在 【shortcut_root: true】则最优先【推荐】这种方式
     *      2、否则查找带有【dashboard】字样链接，若存在则在此菜单的下方创建快捷入口
     *      3、否则放在0节点位置
     */
    private loadShortcut;
    readonly menus: Menu[];
    /**
     * 清空菜单
     */
    clear(): void;
    /**
     * 根据URL设置菜单 `_open` 属性
     * @param url URL地址
     */
    openedByUrl(url: string): void;
    /**
     * 根据url获取菜单列表
     * @param url
     */
    getPathByUrl(url: string): Menu[];
    ngOnDestroy(): void;
}
