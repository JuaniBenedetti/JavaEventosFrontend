import { TestBed } from '@angular/core/testing';

import { HttpAuthenticateService } from './http-authenticate.service';

describe('HttpAuthenticateService', () => {
  let service: HttpAuthenticateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
