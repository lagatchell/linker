import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSubCategoriesComponent } from './shared-sub-categories.component';

describe('SharedSubCategoriesComponent', () => {
  let component: SharedSubCategoriesComponent;
  let fixture: ComponentFixture<SharedSubCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedSubCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
