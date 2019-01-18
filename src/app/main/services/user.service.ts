import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(
    public afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
  ) { }

  updateUser(newEmail: string, newPassword = null) {
    if (newPassword === null) {
        return this.updateEmail(newEmail);
    } else {
      return this.updateEmail(newEmail)
      .then(() => {
        return this.updatePassword(newPassword);
      });
    }
  }

  updateEmail(newEmail: string) {
    return this.afAuth.auth.currentUser.updateEmail(newEmail)
    .then(() => {
      return this.afdb.database.ref('users').child(this.afAuth.auth.currentUser.uid).update({
        email: newEmail
      });
    });
  }

  updatePassword(newPassword: string) {
    return this.afAuth.auth.currentUser.updatePassword(newPassword);
  }
}
