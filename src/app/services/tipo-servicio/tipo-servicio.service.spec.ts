import { TestBed } from '@angular/core/testing';

import { TipoServicioService } from './tipo-servicio.service';

describe('TipoServicioService', () => {
  let service: TipoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
