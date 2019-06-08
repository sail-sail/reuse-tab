import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReuseTabComponent } from './reuse-tab.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule, MatTabsModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    ReuseTabComponent,
  ],
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
