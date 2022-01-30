import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageDialogComponent } from './damage-dialog.component';

describe('DamageDialogComponent', () => {
  let component: DamageDialogComponent;
  let fixture: ComponentFixture<DamageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
