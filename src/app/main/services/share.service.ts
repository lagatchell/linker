import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';
import { ShareRequest } from '../models/share-request';
import { Category } from '../models/category';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShareService {

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private afdb: AngularFireDatabase,
  ) { }

  sendCategoryShareRequest(shareRequest: any) {
    let dbRef = this.afdb.database.ref(`shareRequests/categories`);
    let newShareRequest = dbRef.push();
    newShareRequest.set({
      categoryId: shareRequest.categoryId,
      ownerId: this.authService.authUser.uid,
      title: shareRequest.title,
      senderEmail: this.authService.authUser.email,
      receiverEmail: shareRequest.receiverEmail,
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

  getSharedCatgoriesByOwnerId$(ownerId: string) {
    let sharedCategories = this.afdb.list<any>(`${this.authService.authUser.uid}/sharedWithMe/categories/${ownerId}`).valueChanges();
    let ownersCategories = this.afdb.list<any>(`${ownerId}/categories`).valueChanges();

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


  removeSharedCategory(categoryId, ownerId) {
    this.afdb.database.ref(`${this.authService.authUser.uid}/sharedWithMe/categories/${ownerId}`).once('value', (snapShot) => {
      let sharedCatgories = snapShot.val();

      for (const categoryKey in sharedCatgories) {
        if (sharedCatgories.hasOwnProperty(categoryKey)) {
          const category = sharedCatgories[categoryKey];
          if (category.categoryId == categoryId) {
            this.afdb.database.ref(`${this.authService.authUser.uid}/sharedWithMe/categories/${ownerId}/${category.id}`).remove();
          }
        }
      }
    });
  }

  removeAllSharedCategoriesByFollowingUserId(userId: string) {
    this.afdb.database.ref(`${this.authService.authUser.uid}/sharedWithMe/categories/${userId}`).remove();
    this.afdb.database.ref(`${userId}/sharedWithMe/${this.authService.authUser.uid}`).remove();
  }

}
