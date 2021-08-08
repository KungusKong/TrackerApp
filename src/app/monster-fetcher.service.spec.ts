import { TestBed } from '@angular/core/testing';

import { MonsterFetcherService } from './monster-viewer/monster-fetcher.service';

describe('MonsterFetcherService', () => {
  let service: MonsterFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
