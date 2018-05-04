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
import { of } from 'rxjs/observable/of';


@Injectable()
export class LinkService {

  public category: BehaviorSubject<Category> = new BehaviorSubject(null);
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
        categoryId: (category !== null) ? category.id : null
      };
    })
    .switchMap((link) => {
      if (link.categoryId !== null) {
        return this.afdb.list<LinkItem>(`${link.userId}/links/${link.categoryId}`).valueChanges(); 
      }
      else {
        return of([]);
      }
    });
  }

  createLinkItem(categoryId: string, linkItem: LinkItem) {
    let dbRef = this.afdb.database.ref(`${this.authService.authUser.uid}/links/${categoryId}`);

    dbRef.once('value', (links) => {

      let newLinkItem = dbRef.push();
        newLinkItem.set ({
            alias: linkItem.alias,
            shortDescription: linkItem.shortDescription,
            linkUrl: linkItem.linkUrl,
            id: newLinkItem.key,
            categoryId: categoryId,
            order: links.numChildren() 
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

  deleteLinkItem(linkItem: LinkItem) {
    this.afdb.list(`${this.authService.authUser.uid}/links/${linkItem.categoryId}/${linkItem.id}`).remove();

    this.linkDeleteReorder(linkItem);

    let categoryRef = this.afdb.database.ref(`${this.authService.authUser.uid}/categories`).child(linkItem.categoryId);

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
      })
      .then(() => {
        let oldCategoryRef = this.afdb.database.ref(`${this.authService.authUser.uid}/categories`).child(linkItem.categoryId);
        let newCategoryRef = this.afdb.database.ref(`${this.authService.authUser.uid}/categories`).child(categoryId);
        
        // Add 1 to the linkcount of the new category
        newCategoryRef.once('value', (category) => {
          newCategoryRef.update({
            linkCount: (parseInt(category.val().linkCount) + 1)
          }).catch((error) => {
            console.log(error);
          });
        });

        // Subtract 1 from the linkcount of the old category
        oldCategoryRef.once('value', (category) => {
          oldCategoryRef.update({
            linkCount: (parseInt(category.val().linkCount) - 1)
          })
          .catch((error) => {
            console.log(error);
          });
        });

        // Update the links order to be the last link in the new category
        this.afdb.database.ref(`${this.authService.authUser.uid}/links/${categoryId}`).once('value', (links)=> {
          newRef.update({
            order: links.numChildren() -1
          })
        });

        this.linkDeleteReorder(linkItem);

      })
      .then(() => {
        this.snackBar.open(`Move Successful`, '', {
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

  updateLinkOrder(linkItem: LinkItem, receivingLink: LinkItem) {
    let linksRef = this.afdb.database.ref(`${this.authService.authUser.uid}/links/${linkItem.categoryId}`);

    let fromIndex = linkItem.order;
    let toIndex = receivingLink.order;

    this.afdb.database.ref(`${this.authService.authUser.uid}/links/${linkItem.categoryId}`).child(linkItem.id).update({
      order: receivingLink.order
    });

    let index = 0;
    linksRef.once('value', (links) => {
      links.forEach((linkSnapShot: any) => {
        let link: LinkItem = linkSnapShot.val();
        if (link.id !== linkItem.id) {
          if (fromIndex < toIndex) {
            if (link.order <= toIndex && link.order > fromIndex) {
              this.updateLinkItemOrder(link, 'subtract')
            }
          }
          else if (fromIndex > toIndex) {
            if (link.order >= toIndex && link.order < fromIndex) {
              this.updateLinkItemOrder(link, 'add')
            }
          }
        }

        if (index === links.numChildren()) {
          return true;
        }
        index ++;
      })
    })

  }

  updateLinkItemOrder(linkItem: LinkItem, action: string) {
    let linkRef = this.afdb.database.ref(`${this.authService.authUser.uid}/links/${linkItem.categoryId}`).child(linkItem.id);

    linkRef.once('value', (link) => {
      linkRef.update({
        order: (action === 'add')? parseInt(link.val().order) + 1 : parseInt(link.val().order) - 1
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  linkDeleteReorder(linkItem: LinkItem) {
    let linksRef = this.afdb.database.ref(`${this.authService.authUser.uid}/links/${linkItem.categoryId}`);
    
    let index = 0;
    linksRef.once('value', (links) => {
      links.forEach((linkSnapShot: any) => {
        let link: LinkItem = linkSnapShot.val();

        if (link.id !== linkItem.id) {
          if (link.order > linkItem.order) {
            this.updateLinkItemOrder(link, 'subtract');
          }
        }

        if (index === links.numChildren()) {
          return true;
        }
        index ++;
      })
    })

  }

}
