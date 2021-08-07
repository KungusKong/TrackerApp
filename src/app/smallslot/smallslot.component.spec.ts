import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallslotComponent } from './smallslot.component';

describe('SmallslotComponent', () => {
  let component: SmallslotComponent;
  let fixture: ComponentFixture<SmallslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallslotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
