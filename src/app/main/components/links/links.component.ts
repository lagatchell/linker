import { Component, OnInit, ViewChild } from '@angular/core';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog, MatDrawer } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  sideNavOpenState: Observable<boolean>;
  sideNavMode = 'side';
  showSearch = false;
  searchTerm = '';

  @ViewChild('drawer') sideNav: MatDrawer;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    public sideNavService: SidenavService,
  ) { }

  ngOnInit() {
    this.onResize({
      target: window
    });
  }

  addCategory() {
    this.dialog.open(AddCategoryDialog, {
      height: '300px',
      width: '450px',
      data: {
        'parentCategoryId': null
      }
    });
  }

  onResize(event) {
    const elementWidth = event.target.innerWidth;

    if (elementWidth <= 600) {
      this.sideNavMode = 'over';
      this.sideNavService.toggle(false);
    }

    if (elementWidth > 600) {
      if (this.sideNavMode === 'over') {
        this.sideNavService.toggle(true);
      }
      this.sideNavMode = 'side';
    }

  }

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (this.showSearch) {
      setTimeout(() => {
        const search = document.getElementById('categorySearch');
        search.focus();
      });
    } else {
      this.clearSearch();
    }
  }

  performSearch() {
    this.categoryService.searchTerm.next(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.categoryService.searchTerm.next('');
  }

}
