import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../../../auth/services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditDialog implements OnInit {
  email: string;
  password: string;
  updateErrorMessage = '';
  user: any = null;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialog>,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.authService.authUser;
    this.email = this.user.email;
  }

  save() {
    if (this.user.email !== this.email && this.email !== '' && this.password !== '' && this.password !== null) {
      this.userService.updateUser(this.email, this.password).then(() => {
        this.onNoClick();
      })
      .catch((error) => {
        this.updateErrorMessage = error;
      });
    } else if (this.user.email !== this.email && this.email !== '') {
      this.userService.updateUser(this.email).then(() => {
        this.onNoClick();
      })
      .catch((error) => {
        this.updateErrorMessage = error;
      });
    } else if (this.password !== '' && this.password !== null) {
      this.userService.updatePassword(this.password).then(() => {
        this.onNoClick();
      })
      .catch((error) => {
        this.updateErrorMessage = error;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
