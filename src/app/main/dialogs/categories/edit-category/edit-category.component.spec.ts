import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryDialog } from './edit-category.component';

describe('EditCategoryComponent', () => {
  let component: EditCategoryDialog;
  let fixture: ComponentFixture<EditCategoryDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
