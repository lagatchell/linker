import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { LgMenuItem } from '../../interfaces/lg-menu-item';
import { MenuPosition } from '../../interfaces/menu-position';
import { isFunction, isBoolean } from 'util';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'lg-context-menu',
  templateUrl: './lg-ctx-menu.component.html',
  styleUrls: ['./lg-ctx-menu.component.scss']
})
export class LgCtxMenuComponent implements OnInit {

  @ViewChild(MatMenuTrigger) contextMenuTrigger: MatMenuTrigger;

  @Output() closed: EventEmitter<any> = new EventEmitter();

  @Input() items: LgMenuItem[] = [];
  @Input() targetItem: any = null;

  @Input() position: MenuPosition = {
    x: 0,
    y: 0
  };

  constructor() { }

  ngOnInit() {
    // Subscribe to menuClosed and emit the state
    this.contextMenuTrigger.menuClosed.subscribe(() => {
      this.closed.emit(true);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.openMenu();
    });
  }

  openMenu() {
    // If there are items to show, open the menu
    if (this.items.length > 0) {
      this.contextMenuTrigger.openMenu();
      this.overrideDefaultContextMenuFromCDKOverlay();
    }
  }

  closeMenu() {
    this.contextMenuTrigger.closeMenu();
  }

  overrideDefaultContextMenuFromCDKOverlay() {
    let overlay = document.querySelector('.cdk-overlay-container');
    
    if (overlay !== undefined) {
      overlay.addEventListener('contextmenu', (event: Event) => {
        this.closeMenu();
        event.preventDefault();
      });
    }
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

