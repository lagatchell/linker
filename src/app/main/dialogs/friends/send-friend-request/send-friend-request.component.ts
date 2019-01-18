import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FriendsService } from '../../../services/friends.service';

@Component({
  selector: 'app-send-friend-request',
  templateUrl: './send-friend-request.component.html',
  styleUrls: ['./send-friend-request.component.scss']
})
export class SendFriendRequestDialog implements OnInit {

  email: string;

  constructor(
    public dialogRef: MatDialogRef<SendFriendRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private friendService: FriendsService
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  send() {
    if (this.email) {
      this.friendService.sendFriendRequest(this.email);
      this.onNoClick();
    }
  }

}
