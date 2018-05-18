import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class LinkViewService {

  constructor(
    private afdb: AngularFireDatabase,
    private authService: AuthService
  ) { }

  getLinkView() {
    return this.afdb.object<any>(`${this.authService.authUser.uid}/settings/listView`).valueChanges();
  }

  setLinkView(isListView: boolean) {
    this.afdb.database.ref(`${this.authService.authUser.uid}/settings/`).update({
      listView: isListView
    });
  }

}
