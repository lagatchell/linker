import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveLinkDialog } from './move-link.component';

describe('MoveLinkDialog', () => {
  let component: MoveLinkDialog;
  let fixture: ComponentFixture<MoveLinkDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveLinkDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveLinkDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
