import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { Category } from '../../models/category';
import { LinkService } from '../../services/link.service';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';

@Component({
  selector: 'shared-categories',
  templateUrl: './shared-categories.component.html',
  styleUrls: ['./shared-categories.component.scss']
})
export class SharedCategoriesComponent implements OnInit {

  @Input() friendId: string;
  sharedCategories: Category[] = [];

  menuItems: LgMenuItem[] = [
    {
      name: 'Remove',
      icon: 'delete',
      action: (category: Category) => {
        this.shareService.removeSharedCategory(category.id, this.friendId);
      }
    }
  ];

  constructor(
    private shareService: ShareService,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    this.getSharedCategories();
  }

  getSharedCategories() {
    this.shareService.getSharedCatgoriesByOwnerId$(this.friendId).subscribe((categories: Category[]) => {
      this.sharedCategories = categories;
    });
  }

  showLinks(category: Category) {
    category.expanded = !category.expanded;
    this.linkService.friendId.next(this.friendId);
    this.linkService.category.next(category);
  }

}
