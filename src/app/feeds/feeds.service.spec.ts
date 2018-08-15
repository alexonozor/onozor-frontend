import { TestBed, inject } from '@angular/core/testing';

import { FeedsService } from './feeds.service';

describe('FeedsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedsService]
    });
  });

  it('should be created', inject([FeedsService], (service: FeedsService) => {
    expect(service).toBeTruthy();
  }));
});
