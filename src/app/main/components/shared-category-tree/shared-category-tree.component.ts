import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../services/friends.service';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';

@Component({
  selector: 'shared-category-tree',
  templateUrl: './shared-category-tree.component.html',
  styleUrls: ['./shared-category-tree.component.scss']
})
export class SharedCategoryTreeComponent implements OnInit {

  friends: any[] = [];

  menuItems: LgMenuItem[] = [
    {
      name: 'Unfriend',
      icon: 'people_outline',
      action: (friend: any) => {
        this.friendService.removeFriend(friend);
      }
    }
  ];

  constructor(
    private friendService: FriendsService
  ) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends() {
    this.friendService.getFriends$().subscribe((friends) => {
      this.friends = friends;
    })
  }

  expand(friend) {
    friend.expanded = !friend.expanded;
  }
}
