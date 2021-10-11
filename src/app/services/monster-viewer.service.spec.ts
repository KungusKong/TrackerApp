import { TestBed } from '@angular/core/testing';

import { MonsterViewerService } from './monster-viewer.service';

describe('MonsterViewerService', () => {
  let service: MonsterViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
