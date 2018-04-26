import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import { FriendsService } from './friends.service';
import { ShareService } from './share.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class NotificationService {

  constructor(
    private authService: AuthService,
    private shareService: ShareService,
    private friendService: FriendsService
  ) { }

  getNotifications$() {
    let sharedCategoryRequests = this.shareService.getCategoryShareRequests$();
    let followRequests = this.friendService.getFriendRequests$();

    return Observable.combineLatest(sharedCategoryRequests, followRequests).map(([categoryRequests, friendRequests]) => {
      return {
        categoryRequests: categoryRequests,
        friendRequests: friendRequests
      };
    });
  }

}
