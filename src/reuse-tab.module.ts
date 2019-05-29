import { NgModule, ModuleWithProviders } from '@angular/core';
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

@NgModule({
  imports: [CommonModule, RouterModule, OverlayModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    ReuseTabComponent,
    ReuseTabContextMenuComponent,
    ReuseTabContextComponent,
    ReuseTabContextDirective,
  ],
  entryComponents: [ReuseTabContextMenuComponent],
  exports: [
    ReuseTabComponent,
  ],
})
export class AdReuseTabModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdReuseTabModule,
    };
  }
}
