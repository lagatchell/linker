import { TestBed, inject } from '@angular/core/testing';

import { CategoryCacheService } from './category-cache.service';

describe('CategoryCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryCacheService]
    });
  });

  it('should be created', inject([CategoryCacheService], (service: CategoryCacheService) => {
    expect(service).toBeTruthy();
  }));
});
