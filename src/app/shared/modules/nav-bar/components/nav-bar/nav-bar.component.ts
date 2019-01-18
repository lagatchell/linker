import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../auth/services/auth.service';
import { NotificationService } from '../../../../../main/services/notification.service';
import { ShareRequest } from '../../../../../main/models/share-request';
import { AcceptFriendRequestDialog } from '../../../../../main/dialogs/friends/accept-friend-request/accept-friend-request.component';
import { MatDialog } from '@angular/material';
import { AcceptShareRequestDialog } from '../../../../../main/dialogs/share/accept-share-request/accept-share-request.component';
import { SendFriendRequestDialog } from '../../../../../main/dialogs/friends/send-friend-request/send-friend-request.component';
import { SidenavService } from '../../../../../main/services/sidenav.service';
import { UserEditDialog } from '../../../../../main/dialogs/user/user-edit/user-edit.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  _user: any = null;
  _categoryRequests: ShareRequest[] = [];
  _friendRequests: any[] = [];
  _notificationCount = 0;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService,
    private sideNavService: SidenavService
  ) { }

  ngOnInit() {
    this.getUserAuthState();
  }

  getUserAuthState() {
    this.authService.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this._user = user;
        this.getUserNotifications();
      } else {
        this._user = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  getUserNotifications() {
    this.notificationService.getNotifications$().subscribe((notifications) => {
      this._categoryRequests = notifications.categoryRequests;
      this._friendRequests = notifications.friendRequests;
    });
  }

  openAcceptFriendRequestDialog(friendRequest) {
    this.dialog.open(AcceptFriendRequestDialog, {
      height: '300px',
      width: '450px',
      data: friendRequest
    });
  }

  openAcceptShareRequestDialog(shareRequest: ShareRequest) {
    this.dialog.open(AcceptShareRequestDialog, {
      height: '300px',
      width: '450px',
      data: shareRequest
    });
    return false;
  }

  openSendFriendRequestDialog() {
    this.dialog.open(SendFriendRequestDialog, {
      height: '300px',
      width: '450px',
      data: {}
    });
  }

  openEditUserDialog() {
    this.dialog.open(UserEditDialog, {
      height: '350px',
      width: '450px',
      data: {}
    });
  }

  toggle() {
    this.sideNavService.toggle();
  }
}
