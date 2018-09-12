import { TestBed, async, inject } from '@angular/core/testing';

import { PostGaurdGuard } from './post-gaurd.guard';

describe('PostGaurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostGaurdGuard]
    });
  });

  it('should ...', inject([PostGaurdGuard], (guard: PostGaurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
