import { Injectable } from '@angular/core';

@Injectable()
export class CategoryCacheService {

  cache: any = {};

  constructor() { }

  storeCategoryStucture(categoryId, subcategoryIds) {
    this.cache[categoryId] = subcategoryIds;
  }

  isParentOfCategory(possibleParentId, possibleChildId) : boolean {
    let children = this.cache[possibleParentId];

    if (children !== undefined) {
      for (let i = 0; i < children.length; i++) {
        let childId = children[i];
        if (childId === possibleChildId) {
          return true;
        }
        else {
          if (this.cache[childId] !== undefined) {
            return this.isParentOfCategory(childId, possibleChildId) 
          }
        }
      }
    }

    return false;
    
  }

}
