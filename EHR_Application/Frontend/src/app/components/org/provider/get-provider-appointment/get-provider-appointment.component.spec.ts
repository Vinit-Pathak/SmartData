import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProviderAppointmentComponent } from './get-provider-appointment.component';

describe('GetProviderAppointmentComponent', () => {
  let component: GetProviderAppointmentComponent;
  let fixture: ComponentFixture<GetProviderAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetProviderAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProviderAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
