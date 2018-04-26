import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptShareRequestDialog } from './accept-share-request.component';

describe('AcceptShareRequestComponent', () => {
  let component: AcceptShareRequestDialog;
  let fixture: ComponentFixture<AcceptShareRequestDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptShareRequestDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptShareRequestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
