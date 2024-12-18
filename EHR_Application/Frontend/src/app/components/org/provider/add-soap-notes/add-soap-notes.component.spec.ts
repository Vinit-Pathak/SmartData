import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoapNotesComponent } from './add-soap-notes.component';

describe('AddSoapNotesComponent', () => {
  let component: AddSoapNotesComponent;
  let fixture: ComponentFixture<AddSoapNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSoapNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSoapNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
