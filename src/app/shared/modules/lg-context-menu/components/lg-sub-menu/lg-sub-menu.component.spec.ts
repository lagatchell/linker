import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgSubMenuComponent } from './lg-sub-menu.component';

describe('LgSubMenuComponent', () => {
  let component: LgSubMenuComponent;
  let fixture: ComponentFixture<LgSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
