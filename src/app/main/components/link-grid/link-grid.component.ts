import { Component, OnInit } from '@angular/core';
import { LinkService } from '../../../main/services/link.service';
import { MatDialog } from '@angular/material';
import { AddLinkDialog } from '../../dialogs/links/add-link/add-link.component';
import { Category } from '../../models/category';
import { LinkItem } from '../../models/link-item';
import { LgMenuItem } from '../../../shared/modules/lg-context-menu/interfaces/lg-menu-item';
import { EditLinkDialog } from '../../dialogs/links/edit-link/edit-link.component';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'link-grid',
  templateUrl: './link-grid.component.html',
  styleUrls: ['./link-grid.component.scss']
})
export class LinkGridComponent implements OnInit {

  links: LinkItem[] = [];
  category: Category = null;
  isSharedFolder: boolean = false;

  linkMenuItems: LgMenuItem[] = [
    {
      name: 'Copy',
      icon: 'content_copy',
      action: (linkItem: LinkItem) => {

        let linkCopy: LinkItem = {
          alias: linkItem.alias + '-COPY',
          linkUrl: linkItem.linkUrl,
          shortDescription: linkItem.shortDescription
        };

        this.linkService.createLinkItem(this.category.id, linkCopy);
      },
      hidden: () => {
        return of(this.isSharedFolder);
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
      }
    },
    {
      name: 'Delete',
      icon: 'delete',
      action: (linkItem: LinkItem) => {
        this.linkService.deleteLinkItem(linkItem);
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
    private dialog: MatDialog,
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
  }

  getLinks() {
    this.linkService.getLinks$().subscribe((links: LinkItem[]) => {
      this.links = links.sort((a,b) => {
        return (a.order < b.order)? -1 : 1;
      })
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
      width: '350px',
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
}
