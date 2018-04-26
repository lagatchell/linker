import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkDialog } from './add-link.component';

describe('AddLinkComponent', () => {
  let component: AddLinkDialog;
  let fixture: ComponentFixture<AddLinkDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
