import { Component, OnInit } from '@angular/core';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  sideNavOpenState: Observable<boolean>;
  sideNavMode: string = 'side';

  constructor(
    private dialog: MatDialog,
    private sideNavService: SidenavService
  ) { }

  ngOnInit() {
    this.sideNavOpenState = this.sideNavService.sideNavOpenState;
    this.onResize({
      target: window
    });
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

  onResize(event) {
    const elementWidth = event.target.innerWidth;

    if (elementWidth <= 600) {
        this.sideNavMode = 'over';
        this.sideNavService.sideNavOpenState.next(false);
    }

    if (elementWidth > 600) {
      this.sideNavMode = 'side';
      this.sideNavService.sideNavOpenState.next(true);
    }

  }

}
