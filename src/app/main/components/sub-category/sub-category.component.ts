import { Component, OnInit, Input } from '@angular/core';
import { SubCategoryService } from '../../services/sub-category.service';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';
import { LinkService } from '../../../main/services/link.service';
import { Category } from '../../models/category';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog } from '@angular/material';
import { CategoryService } from '../../services/category.service';
import { EditCategoryDialog } from '../../dialogs/categories/edit-category/edit-category.component';
import { SendShareRequestDialog } from '../../dialogs/share/send-share-request/send-share-request.component';
import { MoveCategoryDialog } from '../../dialogs/categories/move-category/move-category.component';

@Component({
  selector: 'sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  @Input() categoryId: string; 
  loading: boolean;
  subCategories: Category[] = [];

  menuItems: LgMenuItem[] = [
    {
      name: 'Add sub-category',
      icon: 'create_new_folder',
      action: (category: Category) => {
        console.log(category.id);
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
    private subcategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private linkService: LinkService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loading = true;
    this.subcategoryService.getSubCategoriesByParentId$(this.categoryId).subscribe((subCategories: Category[]) => {
      this.subCategories = subCategories;
      this.loading = false;
    });
  }

  showLinks(category: Category) {
    category.expanded = !category.expanded;
    this.linkService.friendId.next(null);
    this.linkService.category.next(category);
  }
}
