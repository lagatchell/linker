import { TestBed, inject } from '@angular/core/testing';

import { CtxMenuService } from './ctx-menu.service';

describe('CtxMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CtxMenuService]
    });
  });

  it('should be created', inject([CtxMenuService], (service: CtxMenuService) => {
    expect(service).toBeTruthy();
  }));
});
