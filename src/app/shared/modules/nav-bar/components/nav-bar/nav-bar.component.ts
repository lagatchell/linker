import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/services/auth.service';
import { NotificationService } from '../../../../../main/services/notification.service';
import { ShareService } from '../../../../../main/services/share.service';
import { ShareRequest } from '../../../../../main/models/share-request';
import { AcceptFriendRequestDialog } from '../../../../../main/dialogs/friends/accept-friend-request/accept-friend-request.component';
import { MatDialog } from '@angular/material';
import { AcceptShareRequestDialog } from '../../../../../main/dialogs/share/accept-share-request/accept-share-request.component';
import { SendFriendRequestDialog } from '../../../../../main/dialogs/friends/send-friend-request/send-friend-request.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private user: any = null;
  private categoryRequests: ShareRequest[] = [];
  private linkRequests: any[] = [];
  private friendRequests: any[] = [];
  private notificationCount: number = 0;
  public notificationText: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService,
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.getUserAuthState();
  }

  getUserAuthState() {
    this.authService.afAuth.auth.onAuthStateChanged(user => {
        if (user !== null) {
            this.user = user;
            this.getUserNotifications();
        } else {
            this.user = null;
        }
    });
  }

  logout() {
    this.authService.logout();
  }

  getUserNotifications() {
    this.notificationService.getNotifications$().subscribe((notifications) => {
      this.categoryRequests = notifications.categoryRequests;
      this.friendRequests = notifications.friendRequests;
      this.setNotificationCount();
    });
  }

  setNotificationCount() {
    let count = 0;
    count += this.categoryRequests.length;
    count += this.linkRequests.length;
    count += this.friendRequests.length;
    this.notificationCount = count;

    if (this.notificationCount === 1) {
      this.notificationText = `${this.notificationCount} notification`;
    }
    else {
      this.notificationText = `${this.notificationCount} notifications`;
    }

  }

  openAcceptFriendRequestDialog(friendRequest) {
    this.dialog.open(AcceptFriendRequestDialog, {
      height: '250px',
      width: '350px',
      data: friendRequest
    });
  }

  openAcceptShareRequestDialog(shareRequest: ShareRequest) {
    this.dialog.open(AcceptShareRequestDialog, {
      height: '250px',
      width: '350px',
      data: shareRequest
    });
    return false;
  }

  openSendFriendRequestDialog() {
    this.dialog.open(SendFriendRequestDialog, {
      height: '250px',
      width: '350px',
      data: {}
    });
  }

}
