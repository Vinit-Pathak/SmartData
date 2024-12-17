import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPatientAppointmentComponent } from './get-patient-appointment.component';

describe('GetPatientAppointmentComponent', () => {
  let component: GetPatientAppointmentComponent;
  let fixture: ComponentFixture<GetPatientAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetPatientAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
