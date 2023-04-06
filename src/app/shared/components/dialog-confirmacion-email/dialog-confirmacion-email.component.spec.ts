import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DialogConfirmacionEmailComponent } from './dialog-confirmacion-email.component';

describe('DialogConfirmacionEmailComponent', () => {
  let component: DialogConfirmacionEmailComponent;
  let fixture: ComponentFixture<DialogConfirmacionEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmacionEmailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirmacionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
