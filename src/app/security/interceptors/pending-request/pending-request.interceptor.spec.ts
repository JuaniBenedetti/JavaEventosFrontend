import { TestBed } from '@angular/core/testing';

import { PendingRequestInterceptor } from '../pending-request/pending-request.interceptor';

describe('PendingRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PendingRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PendingRequestInterceptor = TestBed.inject(PendingRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
