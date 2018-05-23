import { Component, OnInit, Input } from '@angular/core';
import { SubCategoryService } from '../../services/sub-category.service';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';
import { LinkService } from '../../../main/services/link.service';
import { Category } from '../../models/category';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CategoryService } from '../../services/category.service';
import { EditCategoryDialog } from '../../dialogs/categories/edit-category/edit-category.component';
import { SendShareRequestDialog } from '../../dialogs/share/send-share-request/send-share-request.component';
import { LinkItem } from '../../models/link-item';
import { CategoryCacheService } from '../../services/category-cache.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  @Input() categoryId: string; 
  loading: boolean;
  subCategories: Category[] = [];
  selectedCategory: BehaviorSubject<Category>;
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
        this.categoryService.deleteLinkCategory(category.id);
      }
    }
  ];

  constructor(
    private subcategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private linkService: LinkService,
    private categoryCacheService: CategoryCacheService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.selectedCategory = this.linkService.category;
    this.subcategoryService.getSubCategoriesByParentId$(this.categoryId).subscribe((subCategories: Category[]) => {
      this.subCategories = subCategories.sort(function(a, b){
        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      })
      this.loading = false;
      this.writeSubCategoryIdsToCache();
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

  writeSubCategoryIdsToCache() {
    let subcategoryIds = [];
    
    this.subCategories.forEach((subcategory) => {
      subcategoryIds.push(subcategory.id);
    });

    this.categoryCacheService.storeCategoryStucture(this.categoryId, subcategoryIds);
  }
}
