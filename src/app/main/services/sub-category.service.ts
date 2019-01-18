import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from '../models/category';

@Injectable()
export class SubCategoryService {

  constructor(
    private authService: AuthService,
    private afdb: AngularFireDatabase,
  ) { }

  getSubCategoriesByParentId$(parentCategoryId: string) {
    return this.afdb.list<Category>(`${this.authService.authUser.uid}/categories`).valueChanges()
    .map((categories: Category[]) => {
      return categories.filter((category: Category) => {
        return category.parentCategoryId === parentCategoryId;
      });
    });
  }

}
