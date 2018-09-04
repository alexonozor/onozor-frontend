import { TestBed, inject } from '@angular/core/testing';

import { UiUpdateService } from './ui-update.service';

describe('UiUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiUpdateService]
    });
  });

  it('should be created', inject([UiUpdateService], (service: UiUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
