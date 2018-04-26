import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { LgMenuItem } from '../../interfaces/lg-menu-item';
import { MatMenuTrigger } from '@angular/material';
import { isFunction, isBoolean } from 'util';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'lg-sub-menu',
  templateUrl: './lg-sub-menu.component.html',
  styleUrls: ['./lg-sub-menu.component.scss']
})
export class LgSubMenuComponent implements OnInit {

  @ViewChild(MatMenuTrigger) contextMenuTrigger: MatMenuTrigger;

  @Input() item: LgMenuItem = null;
  @Input() targetItem: any;

  constructor() { }

  ngOnInit() {
  }

  closeMenu() {
    this.contextMenuTrigger.closeMenu();
  }

  isDisabled(condition: any) : Observable<boolean> {
    if (isFunction(condition)) {
      return condition(this.targetItem);
    }
    else if (isBoolean(condition)) {
      return of(condition);
    }
    else {
      return of(false);
    }
  }

  isHidden(condition: any) : Observable<boolean> {
    if (isFunction(condition)) {
      return condition(this.targetItem);
    }
    else if (isBoolean(condition)) {
      return of(condition);
    }
    else {
      return of(false);
    }
  }

}

