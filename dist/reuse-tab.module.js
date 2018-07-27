import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReuseTabComponent } from './reuse-tab.component';
import { ReuseTabContextComponent } from './reuse-tab-context.component';
import { ReuseTabContextDirective } from './reuse-tab-context.directive';
import { ReuseTabContextMenuComponent } from './reuse-tab-context-menu.component';
var COMPONENTS = [ReuseTabComponent];
var NOEXPORTS = [
    ReuseTabContextMenuComponent,
    ReuseTabContextComponent,
    ReuseTabContextDirective,
];
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule, MatTabsModule, MatIconModule } from '@angular/material';
var AdReuseTabModule = /** @class */ (function () {
    function AdReuseTabModule() {
    }
    AdReuseTabModule.forRoot = function () {
        return {
            ngModule: AdReuseTabModule,
        };
    };
    AdReuseTabModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, RouterModule, OverlayModule,
                        MatMenuModule,
                        MatTabsModule,
                        MatIconModule,
                    ],
                    declarations: COMPONENTS.concat(NOEXPORTS),
                    entryComponents: [ReuseTabContextMenuComponent],
                    exports: COMPONENTS.slice(),
                },] },
    ];
    /** @nocollapse */
    AdReuseTabModule.ctorParameters = function () { return []; };
    return AdReuseTabModule;
}());
export { AdReuseTabModule };
//# sourceMappingURL=reuse-tab.module.js.map