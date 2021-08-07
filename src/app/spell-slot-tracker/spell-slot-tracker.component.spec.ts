import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellSlotTrackerComponent } from './spell-slot-tracker.component';

describe('SpellSlotTrackerComponent', () => {
  let component: SpellSlotTrackerComponent;
  let fixture: ComponentFixture<SpellSlotTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellSlotTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellSlotTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
