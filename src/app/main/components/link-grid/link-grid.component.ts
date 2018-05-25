import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { LinkService } from '../../../main/services/link.service';
import { MatDialog, MatSnackBar, MatFormField, MatInput, MatTableDataSource, MatPaginator } from '@angular/material';
import { AddLinkDialog } from '../../dialogs/links/add-link/add-link.component';
import { Category } from '../../models/category';
import { LinkItem } from '../../models/link-item';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';
import { EditLinkDialog } from '../../dialogs/links/edit-link/edit-link.component';
import { of } from 'rxjs/observable/of';
import { LinkViewService } from '../../services/link-view.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'link-grid',
  templateUrl: './link-grid.component.html',
  styleUrls: ['./link-grid.component.scss']
})
export class LinkGridComponent implements OnInit {
  windowWidth: number;
  links: LinkItem[] = [];
  category: Category = null;
  isSharedFolder: boolean = false;
  searchTerm: string = '';
  showSearch: boolean = false;
  showSearchMobile: boolean = false;
  googleSearchTerm: string = '';

  @ViewChild('linkurl') linkurl: ElementRef;

  listView: boolean = true;
  displayedColumns = ['index', 'icon', 'alias', 'linkUrl', 'shortDescription'];
  dataSource: MatTableDataSource<LinkItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  linkMenuItems: LgMenuItem[] = [
    {
      name: 'Copy',
      icon: 'content_copy',
      action: (linkItem: LinkItem) => {
        this.copyToClipBoard(linkItem);
      }
    },
    {
      name: 'Edit',
      icon: 'mode_edit',
      action: (linkItem: LinkItem) => {
        this.dialog.open(EditLinkDialog, {
          height: '400px',
          width: '450px',
          data: linkItem
        });
      },
      hidden: () => {
        return of(this.isSharedFolder);
      }
    },
    {
      name: 'Delete',
      icon: 'delete',
      action: (linkItem: LinkItem) => {
        this.linkService.deleteLinkItem(linkItem);
      },
      hidden: () => {
        return of(this.isSharedFolder);
      }
    }
  ];

  menuItems: LgMenuItem[] = [
    {
      name: 'Add Link',
      icon: 'link',
      action: () => {
        this.addLink();
      },
      hidden: () => {
        return this.linkService.category.map((category) => {
          return this.isSharedFolder || category === null;
        });
      }
    }
  ];

  constructor(
    private linkService: LinkService,
    private linkViewService: LinkViewService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCategory();
    this.getLinks();

    this.linkService.friendId.subscribe((friendId) => {
      if (friendId !== null) {
        this.isSharedFolder = true;
      }
      else {
        this.isSharedFolder = false;
      }
    });

    this.linkViewService.getLinkView().subscribe((isListView) => {
      if (isListView === null) {
        this.listView = false;
      }
      else {
        this.listView = isListView;
      }

      if (this.listView) {
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      }
    });

    this.onResize({
      target: window
    });
  }

  getLinks() {
    this.dataSource = new MatTableDataSource([]);
    this.linkService.getLinks$().subscribe((links: LinkItem[]) => {
      this.links = links.sort((a,b) => {
        return (a.order < b.order)? -1 : 1;
      });

      this.dataSource.data = this.links;
      
      if (this.listView) {
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      }
      
    });
  }

  getCategory() {
    this.linkService.category.subscribe((category: Category) => {
      this.category = category;
    });
  }

  openLink(linkUrl) {
    window.open(linkUrl, "_blank");
  }

  addLink() {
    this.dialog.open(AddLinkDialog, {
      height: '400px',
      width: '450px',
      data: {
        categoryId: this.category.id 
      }
    });
  }

  reorderLink(event: any, receivingLink: LinkItem) {

    let link: LinkItem = event.dragData;

    if (link.id !== receivingLink.id) {
      this.linkService.updateLinkOrder(link, receivingLink);
    }    
  }

  toggleSearch() {
    if (this.windowWidth <= 600) {
      this.showSearchMobile = !this.showSearchMobile;

      if (this.showSearchMobile) {
        setTimeout(() => {
          let searchMobile = document.getElementById('linkSearchMobile');
          searchMobile.focus();
        });
      }
    }

    if (this.windowWidth > 600) {
      this.showSearch = !this.showSearch;

      if (this.showSearch) {
        setTimeout(() => {
          let search = document.getElementById('linkSearch');
          search.focus();
        });
      }
    }

    if (!this.showSearch && !this.showSearchMobile) {
      this.clearSearch();
    }
  }

  performSearch() {
    this.linkService.searchTerm.next(this.searchTerm);
  }

  performGoogleSearch() {
    let httpFormat = new RegExp("^(http|https)://", "i");
    let isUrl = httpFormat.test(this.googleSearchTerm);

    if (isUrl) {
      window.open(this.googleSearchTerm, "_blank");
    }
    else {
      window.open(`https://www.google.com/search?q=${this.googleSearchTerm}`, "_blank");
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.linkService.searchTerm.next('');
  }

  clearGoogleSearch() {
    this.googleSearchTerm = '';
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth;

    if (this.windowWidth <= 600) {
        if (this.showSearch) {
          this.showSearch = false;
          this.showSearchMobile = true;
        }
    }

    if (this.windowWidth > 600) {
      if (this.showSearchMobile) {
        this.showSearch = true;
        this.showSearchMobile = false;
      }
    }

  }

  copyToClipBoard(link: LinkItem) {
    this.linkurl.nativeElement.value = link.linkUrl;
    this.linkurl.nativeElement.click();
  }

  copy() {
    this.linkurl.nativeElement.select();
    document.execCommand('Copy');
    
    this.snackBar.open('Copied to Clipboard', '', {
      duration: 2000,
    });
  }

  changeView() {
    this.linkViewService.setLinkView(!this.listView);
  }
}
