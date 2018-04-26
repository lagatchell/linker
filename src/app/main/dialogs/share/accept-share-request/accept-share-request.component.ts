import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../../services/category.service';
import { ShareService } from '../../../services/share.service';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'accept-share-request',
  templateUrl: './accept-share-request.component.html',
  styleUrls: ['./accept-share-request.component.scss']
})
export class AcceptShareRequestDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AcceptShareRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private shareService: ShareService,
    private authService: AuthService
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
