import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../../../models/category';
import { FriendsService } from '../../../services/friends.service';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'send-share-request',
  templateUrl: './send-share-request.component.html',
  styleUrls: ['./send-share-request.component.scss']
})
export class SendShareRequestDialog implements OnInit {

  friends: any[] = [];
  selectedFriend: any;

  constructor(
    public dialogRef: MatDialogRef<SendShareRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shareService: ShareService,
    private friendService: FriendsService
  ) { }

  ngOnInit() {
    this.getFollowers();
  }

  getFollowers() {
    this.friendService.getFriends$().subscribe((friends) => {
      this.friends = friends;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  share() {
    if (this.selectedFriend.email) {
      this.shareService.sendCategoryShareRequest({
        title: this.data.title,
        categoryId: this.data.id,
        receiverEmail: this.selectedFriend.email,
      });
      this.onNoClick();
    }
  }

}
