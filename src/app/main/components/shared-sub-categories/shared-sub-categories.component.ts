import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../../services/share.service';
import { Category } from '../../models/category';
import { LinkService } from '../../services/link.service';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';

@Component({
  selector: 'shared-sub-categories',
  templateUrl: './shared-sub-categories.component.html',
  styleUrls: ['./shared-sub-categories.component.scss']
})
export class SharedSubCategoriesComponent implements OnInit {

  @Input() categoryId: string;
  @Input() friendId: string;

  sharedSubCategories: Category[] = [];

  menuItems: LgMenuItem[] = [
  ];

  constructor(
    private shareService: ShareService,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    this.getSharedSubCategories();
  }

  getSharedSubCategories() {
    this.shareService.getSharedChildLinkCategoryByParentId$(this.friendId, this.categoryId).subscribe((sharedSubCategories) => {
      this.sharedSubCategories = sharedSubCategories;
    });
  }

  showLinks(category: Category) {
    category.expanded = !category.expanded;
    this.linkService.friendId.next(this.friendId);
    this.linkService.category.next(category);
  }

}
