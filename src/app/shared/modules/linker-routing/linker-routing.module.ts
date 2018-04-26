import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../../../auth/components/login/login.component';
import { RegisterComponent } from '../../../auth/components/register/register.component';
import { LinksComponent } from '../../../main/components/links/links.component';
import { AuthService } from '../../../auth/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: LinksComponent, canActivate: [AuthService]},
      { path: '**', component: LinksComponent, canActivate: [AuthService]},
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class LinkerRoutingModule { }
