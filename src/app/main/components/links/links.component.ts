import { Component, OnInit, ViewChild } from '@angular/core';
import { AddCategoryDialog } from '../../dialogs/categories/add-category/add-category.component';
import { MatDialog, MatDrawer } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  sideNavOpenState: Observable<boolean>;
  sideNavMode: string = 'side';
  showSearch: boolean = false;
  searchTerm: string = '';

  @ViewChild('drawer') sideNav: MatDrawer;

  constructor(
    private dialog: MatDialog,
    private sideNavService: SidenavService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.sideNavOpenState = this.sideNavService.sideNavOpenState;
    this.onResize({
      target: window
    });

    this.sideNav.onClose.subscribe(() => {
      this.sideNavService.sideNavOpenState.next(false);
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
        this.sideNavService.sideNavOpenState.next(false);
    }

    if (elementWidth > 600) {
      if (this.sideNavMode === 'over') {
        this.sideNavService.sideNavOpenState.next(true);
      }
      this.sideNavMode = 'side';
    }

  }

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (this.showSearch) {
      setTimeout(() => {
        let search = document.getElementById('categorySearch');
        search.focus();
      });
    }
    else {
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
