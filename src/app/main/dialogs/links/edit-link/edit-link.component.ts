import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LinkService } from '../../../services/link.service';

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.scss']
})
export class EditLinkDialog implements OnInit {

  linkAlias: string;
  linkUrl: string;
  linkDescription: string = "";

  @ViewChild('linkurl') linkurl: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EditLinkDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    this.linkAlias = this.data.alias;
    this.linkDescription = this.data.shortDescription;
    this.linkUrl = this.data.linkUrl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveLink() {
    this.linkService.updateLinkItem(this.data.categoryId, this.data.id, this.linkAlias, this.linkDescription, this.linkUrl);
    this.onNoClick();
  }

  copyToClipBoard() {
    this.linkurl.nativeElement.select();
    document.execCommand('Copy');
    
    this.snackBar.open('Copied to Clipboard', '', {
      duration: 2000,
    });
  }

}
