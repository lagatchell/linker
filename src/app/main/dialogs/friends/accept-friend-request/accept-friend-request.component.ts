import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FriendsService } from '../../../services/friends.service';

@Component({
  selector: 'app-accept-friend-request',
  templateUrl: './accept-friend-request.component.html',
  styleUrls: ['./accept-friend-request.component.scss']
})
export class AcceptFriendRequestDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AcceptFriendRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private friendService: FriendsService
  ) { }

  ngOnInit() {
  }

  acceptRequest() {
    this.friendService.addFriend({
      userId: this.data.userId,
      senderEmail: this.data.senderEmail
    });
    this.removeRequest();
  }

  removeRequest() {
    this.friendService.removeFriendRequest(this.data.id);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
