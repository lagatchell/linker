import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFriendRequestDialog } from './send-friend-request.component';

describe('SendFriendRequestComponent', () => {
  let component: SendFriendRequestDialog;
  let fixture: ComponentFixture<SendFriendRequestDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendFriendRequestDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFriendRequestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
