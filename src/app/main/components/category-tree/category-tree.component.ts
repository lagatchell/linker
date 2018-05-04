import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';
import { LinkService } from '../../../main/services/link.service';
import { Category } from '../../models/category';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditCategoryDialog } from '../../dialogs/categories/edit-category/edit-category.component';
import { SendShareRequestDialog } from '../../dialogs/share/send-share-request/send-share-request.component';
import { LinkItem } from '../../models/link-item';
import { CategoryCacheService } from '../../services/category-cache.service';

@Component({
  selector: 'category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent implements OnInit {
  rootExpanded: boolean = true;
  rootCategories: Category[] = [];
  menuItems: LgMenuItem[] = [
    {
      name: 'Add sub-category',
      icon: 'create_new_folder',
      action: (category: Category) => {
        this.dialog.open(AddCategoryDialog, {
          height: '300px',
          width: '450px',
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
          width: '450px',
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
          width: '450px',
          data: category
        });
      }
    },
    {
      name: 'Delete',
      icon: 'delete',
      action: (category: Category) => {
        if (category !== null) {
          this.categoryService.deleteLinkCategory(category.id);
        }
      }
    }
    
  ];

  constructor(
    private categoryService: CategoryService,
    private linkService: LinkService,
    private dialog: MatDialog,
    private categoryCacheService: CategoryCacheService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getRootCategories$().subscribe((categories: Category[]) => {
      this.rootCategories = categories.sort(function(a, b){
        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      })
    });
  }

  showLinks(category: Category) {
    category.expanded = !category.expanded;
    this.linkService.friendId.next(null);
    this.linkService.category.next(category);
  }

  onDrop(event: any, receivingCatgory: Category = null) {
    let droppedItem: any = event.dragData;

    // Link was dropped
    if (droppedItem.linkUrl !== undefined) {
      if (droppedItem.categoryId !== receivingCatgory.id) {
        this.linkService.moveLink(droppedItem, receivingCatgory.id);
      }
    }
    // Category was dropped
    else if (droppedItem.title !== undefined) {
      if (receivingCatgory === null && droppedItem.parentCategoryId) {
        this.categoryService.moveCategory(droppedItem.id, null);
      }
      else {
        if (droppedItem.id !== receivingCatgory.id && droppedItem.parentCategoryId !== receivingCatgory.id) {
          if (!this.categoryCacheService.isParentOfCategory(droppedItem.id, receivingCatgory.id)) {
            this.categoryService.moveCategory(droppedItem.id, receivingCatgory.id);
          }
          else {
            this.snackBar.open("Cannot move category into its' child", '', {
              duration: 2000,
            });
          }
        }
      }
    } 
  }

  toggleRoot() {
    this.rootExpanded = !this.rootExpanded;
    this.linkService.friendId.next(null);
    this.linkService.category.next(null);
  }

}
