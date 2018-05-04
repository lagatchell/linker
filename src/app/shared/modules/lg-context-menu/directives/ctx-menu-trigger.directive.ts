import { Directive, HostListener, Input } from '@angular/core';
import { CtxMenuService } from '../services/ctx-menu.service';
import { LgMenuItem } from '../interfaces/lg-menu-item';

@Directive({
  selector: '[lg-ctx-menu]'
})
export class CtxMenuTriggerDirective {

  @Input('lg-ctx-menu') lgCtxMenuItems: LgMenuItem[] = [];
  @Input('target-item') targetItem: any = null;

  constructor(
    private ctxMenuService: CtxMenuService
  ) { }

  @HostListener('contextmenu', ['$event']) openContextMenu(event: any) : boolean {
    event.stopPropagation();
    // Get the Host element's position from the event
    // and give it to the service to set on the
    // LgCtxMenuComponent once it has been created
    this.ctxMenuService.menuPosition = {
      x: event.clientX,
      y: event.clientY
    };

    // Give the menuItems to the service to set on the
    // LgCtxMenuComponent once it has been created
    this.ctxMenuService.menuItems = this.lgCtxMenuItems;

    // If a Target Item has been passed in
    // give it to the service to set on the LgCtxMenuComponent
    // once it has been created
    if (this.targetItem) {
      this.ctxMenuService.targetItem = this.targetItem;
    }

    // Create and attach a new instance of the LgCtxMenuComponent
    this.ctxMenuService.attach();


    // Return false to prevent the default context menu from showing
    return false;
  }

}

