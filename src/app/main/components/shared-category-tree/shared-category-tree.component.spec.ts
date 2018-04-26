import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCategoryTreeComponent } from './shared-category-tree.component';

describe('SharedCategoryTreeComponent', () => {
  let component: SharedCategoryTreeComponent;
  let fixture: ComponentFixture<SharedCategoryTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedCategoryTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedCategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
