import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ShareService } from './share.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendsService {

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private shareService: ShareService,
    private afdb: AngularFireDatabase
  ) { }

  getFriends$() {
    const friendList = this.afdb.list<any>(`${this.authService.authUser.uid}/friends`).valueChanges();
    const userList = this.afdb.list<any>(`users`).valueChanges();
    return Observable.combineLatest(friendList, userList).map(([friends, users]) => {

      return friends.map((friend) => {
        const user = users.find((usr) => {
          return usr.id === friend.userId;
        });

        if (user) {
          return {
            userId: friend.userId,
            email: user.email,
            id: friend.id
          };
        }

      });
    });
  }

  addFriend(friend: any) {
    const dbRef1 = this.afdb.database.ref(`${this.authService.authUser.uid}/friends`);
    const newFriend1 = dbRef1.push();

    newFriend1.set ({
      userId: friend.userId,
      id: newFriend1.key
    }).then(() => {
      this.snackBar.open(`You are now friends with ${friend.senderEmail}`, '', {
        duration: 2000,
    });
    });


    const dbRef2 = this.afdb.database.ref(`${friend.userId}/friends`);
    const newFriend2 = dbRef2.push();
    newFriend2.set ({
      userId: this.authService.authUser.uid,
      id: newFriend2.key
    });
  }

  removeFriend(friendInfo: any) {
    // Removes the other user from the current user's follow list
    this.afdb.database.ref(`${this.authService.authUser.uid}/friends/${friendInfo.id}`).remove();

    // Removes the current user from the other user's follow list
    this.removeUserFromOtherFollowersFollowList(friendInfo.userId);

    // Removes all shared category references between the two users
    this.shareService.removeAllSharedCategoriesByFollowingUserId(friendInfo.userId);

    this.snackBar.open(`You have unfriended ${friendInfo.email}`, '', {
      duration: 2000,
    });
  }

  removeUserFromOtherFollowersFollowList(followingUserId: string) {
    this.afdb.database.ref(`${followingUserId}/friends`).once('value', (snapShot) => {
      const followList = snapShot.val();

      for (const followId in followList) {
        if (followList.hasOwnProperty(followId)) {
          const followRecord = followList[followId];
          if (followRecord.userId === this.authService.authUser.uid) {
            this.afdb.database.ref(`${followingUserId}/friends/${followRecord.id}`).remove();
          }
        }
      }

    });
  }

  getFriendRequests$() {
    return this.afdb.list<any>(`/friendRequests`).valueChanges().map((friendRequests: any[]) => {
      return friendRequests.filter((friendRequest: any) => {
        return friendRequest.receiverEmail === this.authService.authUser.email;
      });
    });
  }

  sendFriendRequest(receiverEmail: string) {
    const dbRef = this.afdb.database.ref(`friendRequests`);
    const newFriendRequest = dbRef.push();

    newFriendRequest.set ({
      userId: this.authService.authUser.uid,
      receiverEmail: receiverEmail,
      senderEmail: this.authService.authUser.email,
      id: newFriendRequest.key
    }).then(() => {
      this.snackBar.open('Request has been sent', '', {
        duration: 2000,
    });
    }).catch((error) => {
      console.log(error);
    });
  }

  removeFriendRequest(friendRequestId: string) {
    this.afdb.database.ref(`friendRequests/${friendRequestId}`).remove();
  }
}
