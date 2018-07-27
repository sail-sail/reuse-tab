/**
 * 复用匹配模式
 */
export var ReuseTabMatchMode;
(function (ReuseTabMatchMode) {
    /**
     * （推荐）按菜单 `Menu` 配置
     *
     * 可复用：
     * - `{ text:'Dashboard' }`
     * - `{ text:'Dashboard', reuse: true }`
     *
     * 不可复用：
     * - `{ text:'Dashboard', reuse: false }`
     */
    ReuseTabMatchMode[ReuseTabMatchMode["Menu"] = 0] = "Menu";
    /**
     * 按菜单 `Menu` 强制配置
     *
     * 可复用：
     * - `{ text:'Dashboard', reuse: true }`
     *
     * 不可复用：
     * - `{ text:'Dashboard' }`
     * - `{ text:'Dashboard', reuse: false }`
     */
    ReuseTabMatchMode[ReuseTabMatchMode["MenuForce"] = 1] = "MenuForce";
    /**
     * 对所有路由有效，可以配合 `excludes` 过滤无须复用路由
     */
    ReuseTabMatchMode[ReuseTabMatchMode["URL"] = 2] = "URL";
})(ReuseTabMatchMode || (ReuseTabMatchMode = {}));
//# sourceMappingURL=interface.js.map