import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptFriendRequestDialog } from './accept-friend-request.component';

describe('AcceptFriendRequestComponent', () => {
  let component: AcceptFriendRequestDialog;
  let fixture: ComponentFixture<AcceptFriendRequestDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptFriendRequestDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptFriendRequestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
