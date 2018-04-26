import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkDialog } from './edit-link.component';

describe('EditLinkComponent', () => {
  let component: EditLinkDialog;
  let fixture: ComponentFixture<EditLinkDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLinkDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLinkDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
