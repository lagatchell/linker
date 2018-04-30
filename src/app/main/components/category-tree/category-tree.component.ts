import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';
import { LinkService } from '../../../main/services/link.service';
import { Category } from '../../models/category';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog } from '@angular/material';
import { EditCategoryDialog } from '../../dialogs/categories/edit-category/edit-category.component';
import { SendShareRequestDialog } from '../../dialogs/share/send-share-request/send-share-request.component';
import { MoveCategoryDialog } from '../../dialogs/categories/move-category/move-category.component';

@Component({
  selector: 'category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {

  rootCategories: Category[] = [];
  menuItems: LgMenuItem[] = [
    {
      name: 'Add sub-category',
      icon: 'create_new_folder',
      action: (category: Category) => {
        this.dialog.open(AddCategoryDialog, {
          height: '300px',
          width: '350px',
          data: {
            'parentCategoryId': category.id
          }
        });
      }
    },
    {
      name: 'Share',
      icon: 'folder_shared',
      action: (category: Category) => {
        this.dialog.open(SendShareRequestDialog, {
          height: '300px',
          width: '350px',
          data: category
        });
      }
    },
    {
      name: 'Move',
      icon: 'swap_vert',
      action: (category: Category) => {
        this.dialog.open(MoveCategoryDialog, {
          height: '300px',
          width: '350px',
          data: category
        });
      }
    },
    {
      name: 'Edit',
      icon: 'mode_edit',
      action: (category: Category) => {
        this.dialog.open(EditCategoryDialog, {
          height: '300px',
          width: '350px',
          data: category
        });
      }
    },
    {
      name: 'Delete',
      icon: 'delete',
      action: (category: Category) => {
        this.categoryService.deleteLinkCategory(category.id);
      }
    }
    
  ];

  constructor(
    private categoryService: CategoryService,
    private linkService: LinkService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getRootCategories$().subscribe((categories: Category[]) => {
      this.rootCategories = categories;
    });
  }

  showLinks(category: Category) {
    category.expanded = !category.expanded;
    this.linkService.friendId.next(null);
    this.linkService.category.next(category);
  }

}
