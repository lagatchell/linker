import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LinkService } from '../../../services/link.service';
import { LinkItem } from '../../../models/link-item';

@Component({
  selector: 'add-link-dialog',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkDialog implements OnInit {

  linkAlias: string;
  linkUrl: string;
  linkDescription: string = "";

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
    let newLink: LinkItem = new LinkItem(
      this.linkUrl,
      this.linkAlias,
      this.linkDescription
    );
    
    this.linkService.createLinkItem(this.data.categoryId, newLink);
    this.onNoClick();
  }
}

