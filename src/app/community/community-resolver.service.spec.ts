import { TestBed, inject } from '@angular/core/testing';

import { CommunityResolverService } from './community-resolver.service';

describe('CommunityResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunityResolverService]
    });
  });

  it('should be created', inject([CommunityResolverService], (service: CommunityResolverService) => {
    expect(service).toBeTruthy();
  }));
});
