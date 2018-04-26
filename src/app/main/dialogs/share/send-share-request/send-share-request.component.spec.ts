import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendShareRequestDialog } from './send-share-request.component';

describe('SendShareRequestComponent', () => {
  let component: SendShareRequestDialog;
  let fixture: ComponentFixture<SendShareRequestDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendShareRequestDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendShareRequestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
