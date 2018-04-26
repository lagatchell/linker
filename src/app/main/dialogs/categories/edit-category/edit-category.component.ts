import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryDialog implements OnInit {
  categoryTitle: string;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.categoryTitle = this.data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCategory() {
    this.categoryService.updateCategory(this.data.id, this.categoryTitle);
    this.onNoClick();
  }

}
