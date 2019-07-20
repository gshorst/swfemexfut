import { TestBed } from '@angular/core/testing';

import { GetdataswapiService } from './getdataswapi.service';

describe('GetdataswapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetdataswapiService = TestBed.get(GetdataswapiService);
    expect(service).toBeTruthy();
  });
});
