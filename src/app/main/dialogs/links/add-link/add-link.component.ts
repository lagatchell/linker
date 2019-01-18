import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LinkService } from '../../../services/link.service';
import { LinkItem } from '../../../models/link-item';

@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkDialog implements OnInit {

  linkAlias: string;
  linkUrl: string;
  linkDescription = '';

  constructor(
    public dialogRef: MatDialogRef<AddLinkDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private linkService: LinkService
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createLink() {
    if (this.linkUrl && this.linkUrl !== '' && this.linkAlias && this.linkAlias !== '') {
      const newLink: LinkItem = new LinkItem(
        this.linkUrl,
        this.linkAlias,
        this.linkDescription
      );

      this.linkService.createLinkItem(this.data.categoryId, newLink);
      this.onNoClick();
    }
  }
}

