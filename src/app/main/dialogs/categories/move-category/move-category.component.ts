import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../models/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'move-category',
  templateUrl: './move-category.component.html',
  styleUrls: ['./move-category.component.scss']
})
export class MoveCategoryDialog implements OnInit {

  categories: Observable<Category[]>;
  selectedCategory: any;

  rootCategory: Category = {
    title: "Root",
    id: null
  };

  constructor(
    public dialogRef: MatDialogRef<MoveCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories = this.categoryService.getAllCategories$().map((categories: Category[]) => {
      return categories.filter((category: Category) => {
        return category.id !== this.data.id;
      });
    })
  }

  move() {
    if (this.selectedCategory) {
      this.categoryService.moveCategory(this.data.id, this.selectedCategory.id);
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
