import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgCtxMenuComponent } from './lg-ctx-menu.component';

describe('LgCtxMenuComponent', () => {
  let component: LgCtxMenuComponent;
  let fixture: ComponentFixture<LgCtxMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgCtxMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgCtxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
