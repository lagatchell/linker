import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../models/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LinkService } from '../../../services/link.service';

@Component({
  selector: 'move-link',
  templateUrl: './move-link.component.html',
  styleUrls: ['./move-link.component.scss']
})
export class MoveLinkDialog implements OnInit {

  categories: Observable<Category[]>;
  selectedCategory: any;

  constructor(
    public dialogRef: MatDialogRef<MoveLinkDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories = this.categoryService.getAllCategories$().map((categories: Category[]) => {
      return categories.filter((category: Category) => {
        return category.id !== this.data.categoryId;
      });
    })
  }

  move() {
    if (this.selectedCategory) {
      this.linkService.moveLink(this.data, this.selectedCategory.id);
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
