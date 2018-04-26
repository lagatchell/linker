import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../auth/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { LinkItem } from '../models/link-item';
import { MatSnackBar } from '@angular/material';
import { Category } from '../models/category';


@Injectable()
export class LinkService {

  public category: Subject<Category> = new Subject();
  public friendId: Subject<string> = new Subject();

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private afdb: AngularFireDatabase,
  ) { }

  getLinks$() {
    return Observable.combineLatest(this.category, this.friendId).map(([category, friendId]) => {
      return {
        userId: (friendId !== null)? friendId: this.authService.authUser.uid,
        categoryId: category.id
      };
    })
    .switchMap((link) => {
      return this.afdb.list<LinkItem>(`${link.userId}/links/${link.categoryId}`).valueChanges(); 
    });
  }

  createLinkItem(categoryId: string, linkItem: LinkItem) {
    let dbRef = this.afdb.database.ref(`${this.authService.authUser.uid}/links/${categoryId}`);
    let newLinkItem = dbRef.push();
      newLinkItem.set ({
          alias: linkItem.alias,
          shortDescription: linkItem.shortDescription,
          linkUrl: linkItem.linkUrl,
          id: newLinkItem.key,
          categoryId: categoryId
      }).then(() => {
        this.snackBar.open(`${linkItem.alias} has been created`, '', {
          duration: 2000,
      });
    });

    let categoryRef = this.afdb.database.ref(`${this.authService.authUser.uid}/categories`).child(categoryId);

    categoryRef.once('value', (category) => {
      categoryRef.update({
        linkCount: (parseInt(category.val().linkCount) + 1)
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  updateLinkItem(categoryId, linkItemId, linkAlias, linkDescription, linkUrl) {
    this.afdb.database.ref(`${this.authService.authUser.uid}/links/${categoryId}`).child(linkItemId)
    .update({
        alias: linkAlias,
        shortDescription: linkDescription,
        linkUrl: linkUrl
    }).then(() => {
      this.snackBar.open(`Update Successful`, '', {
        duration: 2000,
    });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteLinkItem(categoryId: string, linkItemId: string) {
    this.afdb.list(`${this.authService.authUser.uid}/links/${categoryId}/${linkItemId}`).remove();

    let categoryRef = this.afdb.database.ref(`${this.authService.authUser.uid}/categories`).child(categoryId);

    categoryRef.once('value', (category) => {
      categoryRef.update({
        linkCount: (parseInt(category.val().linkCount) - 1)
      }).then(() => {
        this.snackBar.open(`Delete Successful`, '', {
          duration: 2000,
      });
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }

  moveLink(linkItem: LinkItem, categoryId: string) {
    let oldRef = this.afdb.database.ref(`${this.authService.authUser.uid}/links/${linkItem.categoryId}`).child(linkItem.id);
    let newRef = this.afdb.database.ref(`${this.authService.authUser.uid}/links/${categoryId}`).child(linkItem.id);
    
    this.moveFbRecord(oldRef, newRef)
    .then(() => {
      newRef.update({
          categoryId: categoryId
      }).then(() => {
        this.snackBar.open(`Update Successful`, '', {
          duration: 2000,
      });
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  moveFbRecord(oldRef, newRef) {    
    return oldRef.once('value', function(snap)  {
        newRef.set( snap.val(), function(error) {
              if( !error ) {  oldRef.remove(); }
              else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
        });
    });
  }
}
