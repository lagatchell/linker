import { Component, OnInit } from '@angular/core';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  addCategory() {
    this.dialog.open(AddCategoryDialog, {
      height: '300px',
      width: '350px',
      data: {
        'parentCategoryId': null
      }
    });
  }

}
