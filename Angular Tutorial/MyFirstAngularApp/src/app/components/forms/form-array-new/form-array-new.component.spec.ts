import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayNewComponent } from './form-array-new.component';

describe('FormArrayNewComponent', () => {
  let component: FormArrayNewComponent;
  let fixture: ComponentFixture<FormArrayNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArrayNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
