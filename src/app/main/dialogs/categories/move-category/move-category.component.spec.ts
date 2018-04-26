import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCategoryDialog } from './move-category.component';

describe('MoveCategoryDialog', () => {
  let component: MoveCategoryDialog;
  let fixture: ComponentFixture<MoveCategoryDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveCategoryDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveCategoryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
