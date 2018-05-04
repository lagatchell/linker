import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';
import { ShareRequest } from '../models/share-request';
import { Category } from '../models/category';
import { Observable } from 'rxjs/Observable';
import { LinkService } from './link.service';

@Injectable()
export class ShareService {

  category: Category = null;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private afdb: AngularFireDatabase,
    private linkService: LinkService
  ) {
    this.linkService.category.subscribe((category: Category) => {
      this.category = category;
    });
   }

  sendCategoryShareRequest(shareRequest: any) {
    let dbRef = this.afdb.database.ref(`shareRequests/categories`);
    let newShareRequest = dbRef.push();
    newShareRequest.set({
      categoryId: shareRequest.categoryId,
      ownerId: this.authService.authUser.uid,
      title: shareRequest.title,
      senderEmail: this.authService.authUser.email,
      receiverEmail: shareRequest.receiverEmail,
      message: shareRequest.message,
      id: newShareRequest.key
    }).then(() => {
      this.snackBar.open(`Request has been sent`, '', {
        duration: 2000,
    });
    }).catch((error) => {
      console.log(error);
    });
  }

  getCategoryShareRequests$() {
    return this.afdb.list<ShareRequest>(`/shareRequests/categories`).valueChanges().map((shareRequests: ShareRequest[]) => {
      return shareRequests.filter((shareRequest: ShareRequest) => {
        return shareRequest.receiverEmail == this.authService.authUser.email;
      });
    });
  }

  acceptSharedCategory(shareRequest: ShareRequest) {
    let dbRef = this.afdb.database.ref(`${this.authService.authUser.uid}/sharedWithMe/categories/${shareRequest.ownerId}`);
    let newSharedCategory = dbRef.push();
    newSharedCategory.set({
      categoryId: shareRequest.categoryId,
      ownerId: shareRequest.ownerId,
      owner: shareRequest.senderEmail,
      title: shareRequest.title,
      id: newSharedCategory.key
    });
  }

  removeCategoryShareRequest(shareRequestId: string) {
    this.afdb.database.ref(`shareRequests/categories/${shareRequestId}`).remove();
  }

  getSharedCatgoriesByOwnerId$(friendId: string) {
    let sharedCategories = this.afdb.list<any>(`${this.authService.authUser.uid}/sharedWithMe/categories/${friendId}`).valueChanges();
    let ownersCategories = this.afdb.list<any>(`${friendId}/categories`).valueChanges();

    return Observable.combineLatest(sharedCategories, ownersCategories).map(([sharedCats, ownersCats]) => {
      let returnedCategories = [];
      sharedCats.forEach((sharedCategory) => {
        ownersCats.forEach((ownerCategory) => {
          if (sharedCategory.categoryId == ownerCategory.id) {
            returnedCategories.push(ownerCategory);
          }
        });
      });

      return returnedCategories;
    });
  }

  getSharedChildLinkCategoryByParentId$(friendId: string, parentCategoryId: string) {
    return this.afdb.list<Category>(`${friendId}/categories`).valueChanges()
    .map((categories: Category[]) => {
      return categories.filter((category: Category) => {
        return category.parentCategoryId == parentCategoryId;
      });
    });
  }

  removeSharedCategory(categoryId, friendId) {
    this.afdb.database.ref(`${this.authService.authUser.uid}/sharedWithMe/categories/${friendId}`).once('value', (snapShot) => {
      let sharedCatgories = snapShot.val();

      for (const categoryKey in sharedCatgories) {
        if (sharedCatgories.hasOwnProperty(categoryKey)) {
          const category = sharedCatgories[categoryKey];
          if (category.categoryId == categoryId) {
            this.afdb.database.ref(`${this.authService.authUser.uid}/sharedWithMe/categories/${friendId}/${category.id}`).remove();
          }
        }
      }
    });

    if (this.category.id == categoryId) {
      this.linkService.category.next(null);
    }
  }

  removeAllSharedCategoriesByFollowingUserId(userId: string) {
    this.afdb.database.ref(`${this.authService.authUser.uid}/sharedWithMe/categories/${userId}`).remove();
    this.afdb.database.ref(`${userId}/sharedWithMe/${this.authService.authUser.uid}`).remove();
  }

}
