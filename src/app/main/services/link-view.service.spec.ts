import { TestBed, inject } from '@angular/core/testing';

import { LinkViewService } from './link-view.service';

describe('LinkViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkViewService]
    });
  });

  it('should be created', inject([LinkViewService], (service: LinkViewService) => {
    expect(service).toBeTruthy();
  }));
});
