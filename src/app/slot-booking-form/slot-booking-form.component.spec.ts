import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotBookingFormComponent } from './slot-booking-form.component';

describe('SlotBookingFormComponent', () => {
  let component: SlotBookingFormComponent;
  let fixture: ComponentFixture<SlotBookingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotBookingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
