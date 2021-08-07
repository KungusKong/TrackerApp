import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellslotComponent } from './spellslot.component';

describe('SpellslotComponent', () => {
  let component: SpellslotComponent;
  let fixture: ComponentFixture<SpellslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellslotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
