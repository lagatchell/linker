import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDragDropModule } from 'ng-drag-drop';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkerRoutingModule } from './shared/modules/linker-routing/linker-routing.module';
import { MatDesignModule } from './shared/modules/mat-design/mat-design.module';
import { NavBarModule } from './shared/modules/nav-bar/nav-bar.module';
import { LgContextMenuModule } from './shared/modules/lg-context-menu/lg-context-menu.module';
import { LinkService } from './main/services/link.service';
import { AuthService } from './auth/services/auth.service';
import { CategoryService } from './main/services/category.service';
import { SubCategoryService } from './main/services/sub-category.service';
import { CategoryTreeComponent } from './main/components/category-tree/category-tree.component';
import { SubCategoryComponent } from './main/components/sub-category/sub-category.component';
import { LinkGridComponent } from './main/components/link-grid/link-grid.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LinksComponent } from './main/components/links/links.component';
import { AddLinkDialog } from './main/dialogs/links/add-link/add-link.component';
import { EditLinkDialog } from './main/dialogs/links/edit-link/edit-link.component';
import { AddCategoryDialog } from './main/dialogs/categories/add-category/add-category.component';
import { EditCategoryDialog } from './main/dialogs/categories/edit-category/edit-category.component';
import { SharedCategoryTreeComponent } from './main/components/shared-category-tree/shared-category-tree.component';
import { SharedCategoriesComponent } from './main/components/shared-categories/shared-categories.component';
import { FriendsService } from './main/services/friends.service';
import { NotificationService } from './main/services/notification.service';
import { ShareService } from './main/services/share.service';
import { SharedSubCategoriesComponent } from './main/components/shared-sub-categories/shared-sub-categories.component';
import { SendFriendRequestDialog } from './main/dialogs/friends/send-friend-request/send-friend-request.component';
import { AcceptFriendRequestDialog } from './main/dialogs/friends/accept-friend-request/accept-friend-request.component';
import { SendShareRequestDialog } from './main/dialogs/share/send-share-request/send-share-request.component';
import { AcceptShareRequestDialog } from './main/dialogs/share/accept-share-request/accept-share-request.component';
import { SidenavService } from './main/services/sidenav.service';
import { UserEditDialog } from './main/dialogs/user/user-edit/user-edit.component';
import { UserService } from './main/services/user.service';
import { CategoryCacheService } from './main/services/category-cache.service';
import { LinkViewService } from './main/services/link-view.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LinksComponent,
    CategoryTreeComponent,
    SubCategoryComponent,
    LinkGridComponent,
    AddLinkDialog,
    EditLinkDialog,
    AddCategoryDialog,
    EditCategoryDialog,
    SharedCategoryTreeComponent,
    SharedCategoriesComponent,
    SharedSubCategoriesComponent,
    SendFriendRequestDialog,
    AcceptFriendRequestDialog,
    SendShareRequestDialog,
    AcceptShareRequestDialog,
    UserEditDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'quick-links'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    NgDragDropModule.forRoot(),
    MatDesignModule,
    ClarityModule,
    LgContextMenuModule,
    LinkerRoutingModule,
    NavBarModule
  ],
  entryComponents: [
    AddLinkDialog,
    EditLinkDialog,
    AddCategoryDialog,
    EditCategoryDialog,
    AcceptShareRequestDialog,
    SendShareRequestDialog,
    AcceptFriendRequestDialog,
    SendFriendRequestDialog,
    UserEditDialog
  ],
  providers: [
    AuthService,
    CategoryService,
    SubCategoryService,
    LinkService,
    FriendsService,
    NotificationService,
    ShareService,
    SidenavService,
    UserService,
    CategoryCacheService,
    LinkViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
