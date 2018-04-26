import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CategoryService } from './category.service';
import { AuthService } from '../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ShareService } from './share.service';

@Injectable()
export class FriendsService {

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private shareService: ShareService,
    private afdb: AngularFireDatabase
  ) { }

  getFriends$() {
    return this.afdb.list<any>(`${this.authService.authUser.uid}/following`).valueChanges();
  }

  addFriend(friend: any) {
    let dbRef1 = this.afdb.database.ref(`${this.authService.authUser.uid}/following`);
    let newFollow1 = dbRef1.push();
    newFollow1.set ({
      userId: friend.userId,
      email: friend.senderEmail,
      id: newFollow1.key
    }).then(() => {
      this.snackBar.open(`You are now friends with ${friend.senderEmail}`, '', {
        duration: 2000,
    })
    });

    let dbRef2 = this.afdb.database.ref(`${friend.userId}/following`);
    let newFollow2 = dbRef2.push();
    newFollow2.set ({
      userId: this.authService.authUser.uid,
      email: this.authService.authUser.email,
      id: newFollow2.key
    });
  }

  removeFriend(friendInfo: any) {
    // Removes the other user from the current user's follow list
    this.afdb.database.ref(`${this.authService.authUser.uid}/following/${friendInfo.id}`).remove();

    // Removes the current user from the other user's follow list
    this.removeUserFromOtherFollowersFollowList(friendInfo.userId);

    // Removes all shared category references between the two users
    this.shareService.removeAllSharedCategoriesByFollowingUserId(friendInfo.userId);

    this.snackBar.open(`You have unfriended ${friendInfo.email}`, '', {
      duration: 2000,
    });
  }

  removeUserFromOtherFollowersFollowList(followingUserId: string) {
    this.afdb.database.ref(`${followingUserId}/following`).once('value', (snapShot) => {
      let followList = snapShot.val();

      for (const followId in followList) {
        if (followList.hasOwnProperty(followId)) {
          const followRecord = followList[followId];
          if (followRecord.userId == this.authService.authUser.uid) {
            this.afdb.database.ref(`${followingUserId}/following/${followRecord.id}`).remove();
          }
        }
      }

    });
  }

  getFriendRequests$() {
    return this.afdb.list<any>(`/followRequests`).valueChanges().map((followRequest: any[]) => {
      return followRequest.filter((followRequest: any) => {
        return followRequest.receiverEmail == this.authService.authUser.email;
      });
    });
  }

  sendFriendRequest(receiverEmail: string) {
    let dbRef = this.afdb.database.ref(`followRequests`);
    let newFollowRequest = dbRef.push();
    newFollowRequest.set ({
      userId: this.authService.authUser.uid,
      receiverEmail: receiverEmail,
      senderEmail: this.authService.authUser.email,
      id: newFollowRequest.key
    }).then(() => {
      this.snackBar.open('Request has been sent', '', {
        duration: 2000,
    });
    }).catch((error) => {
      console.log(error);
    });
  }

  removeFriendRequest(followRequestId: string) {
    this.afdb.database.ref(`followRequests/${followRequestId}`).remove();
  }
}
