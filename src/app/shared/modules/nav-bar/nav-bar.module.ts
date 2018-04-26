import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatDesignModule } from '../mat-design/mat-design.module';

@NgModule({
  imports: [
    CommonModule,
    MatDesignModule
  ],
  declarations: [NavBarComponent],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
