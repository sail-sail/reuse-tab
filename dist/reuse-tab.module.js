import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReuseTabComponent } from './reuse-tab.component';
import { ReuseTabContextComponent } from './reuse-tab-context.component';
import { ReuseTabContextDirective } from './reuse-tab-context.directive';
import { ReuseTabContextMenuComponent } from './reuse-tab-context-menu.component';
const COMPONENTS = [ReuseTabComponent];
const NOEXPORTS = [
    ReuseTabContextMenuComponent,
    ReuseTabContextComponent,
    ReuseTabContextDirective,
];
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule, MatTabsModule, MatIconModule, MatButtonModule } from '@angular/material';
export class AdReuseTabModule {
    static forRoot() {
        return {
            ngModule: AdReuseTabModule,
        };
    }
}
AdReuseTabModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RouterModule, OverlayModule,
                    MatMenuModule,
                    MatTabsModule,
                    MatIconModule,
                    MatButtonModule,
                ],
                declarations: [...COMPONENTS, ...NOEXPORTS],
                entryComponents: [ReuseTabContextMenuComponent],
                exports: [...COMPONENTS],
            },] },
];
/** @nocollapse */
AdReuseTabModule.ctorParameters = () => [];
//# sourceMappingURL=reuse-tab.module.js.map