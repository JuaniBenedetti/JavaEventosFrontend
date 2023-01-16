import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServicioComponent } from './tipo-servicio.component';

describe('TipoServicioComponent', () => {
  let component: TipoServicioComponent;
  let fixture: ComponentFixture<TipoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
