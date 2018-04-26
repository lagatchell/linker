import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDesignModule } from '../mat-design/mat-design.module';
import { LgCtxMenuComponent } from './components/lg-ctx-menu/lg-ctx-menu.component';
import { CtxMenuTriggerDirective } from './directives/ctx-menu-trigger.directive';
import { CtxMenuService } from './services/ctx-menu.service';

import { LgMenuItem } from './interfaces/lg-menu-item';
import { LgSubMenuComponent } from './components/lg-sub-menu/lg-sub-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatDesignModule
  ],
  declarations: [ 
    LgCtxMenuComponent, 
    CtxMenuTriggerDirective, 
    LgSubMenuComponent
  ],
  entryComponents: [
    LgCtxMenuComponent
  ],
  exports: [
    CtxMenuTriggerDirective
  ],
  providers: [
    CtxMenuService
  ]
})
export class LgContextMenuModule { }
