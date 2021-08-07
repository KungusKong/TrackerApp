import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeItemComponent } from './initiative-item.component';

describe('InitiativeItemComponent', () => {
  let component: InitiativeItemComponent;
  let fixture: ComponentFixture<InitiativeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
