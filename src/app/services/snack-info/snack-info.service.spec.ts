import { TestBed } from '@angular/core/testing';

import { SnackInfoService } from './snack-info.service';

describe('SnackInfoService', () => {
  let service: SnackInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
