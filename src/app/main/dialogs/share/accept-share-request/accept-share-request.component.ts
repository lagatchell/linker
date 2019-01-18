import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-accept-share-request',
  templateUrl: './accept-share-request.component.html',
  styleUrls: ['./accept-share-request.component.scss']
})
export class AcceptShareRequestDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AcceptShareRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shareService: ShareService,
  ) { }

  ngOnInit() {
  }

  acceptRequest() {
    this.shareService.acceptSharedCategory(this.data);
    this.removeRequest();
  }

  removeRequest() {
    this.shareService.removeCategoryShareRequest(this.data.id);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
