import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryDialog implements OnInit {
  categoryTitle: string;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  createCategory() {
    if (this.categoryTitle !== null && this.categoryTitle.trim() !== '') {
      const newCategory: Category = new Category(this.categoryTitle);
      const parentCategoryId = (this.data.parentCategoryId) ? this.data.parentCategoryId : null;
      this.categoryService.createLinkCategory(newCategory, parentCategoryId);
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
