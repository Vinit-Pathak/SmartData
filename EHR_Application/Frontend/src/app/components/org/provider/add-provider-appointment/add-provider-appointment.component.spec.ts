import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProviderAppointmentComponent } from './add-provider-appointment.component';

describe('AddProviderAppointmentComponent', () => {
  let component: AddProviderAppointmentComponent;
  let fixture: ComponentFixture<AddProviderAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProviderAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProviderAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
