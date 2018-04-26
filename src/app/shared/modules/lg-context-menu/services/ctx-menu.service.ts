import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  Input
} from '@angular/core';

import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { LgCtxMenuComponent } from '../components/lg-ctx-menu/lg-ctx-menu.component';
import { Subscription } from 'rxjs/Subscription';
import { LgMenuItem } from '../interfaces/lg-menu-item';
import { MenuPosition } from '../interfaces/menu-position';

@Injectable()
export class CtxMenuService {

  private ctxMenuPortal: ComponentPortal<LgCtxMenuComponent>;
  private ctxMenuPortalOutlet: DomPortalOutlet;

  private menuClosedStateSubscription: Subscription;
  public menuItems: LgMenuItem[] = [];
  public menuPosition: MenuPosition = { x: 0, y: 0 };
  public targetItem: any = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ){ 
    this.ctxMenuPortal = new ComponentPortal(LgCtxMenuComponent);
    this.ctxMenuPortalOutlet = new DomPortalOutlet(
      document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  attach() {
    // Call detach to remove any previous instances of the LgCtxMenuComponent from the PortalOutlet
    this.detach();

    // Create and attach a new instance of the LgCtxMenuComponent to the PortalOutlet
    let attachedPortal = this.ctxMenuPortalOutlet.attach(this.ctxMenuPortal).instance;

    // If a Target Item has been passed in
    // set the target item on the new LgCtxMenuComponent instance
    if (this.targetItem) {
      attachedPortal.targetItem = this.targetItem;
    }

    // Set the menu position on the new LgCtxMenuComponent instance
    attachedPortal.position = this.menuPosition;

    // Set the menu items on the new LgCtxMenuComponent instance
    attachedPortal.items = this.menuItems;

    // Subscribe to the emitted closed state of the menu
    this.menuClosedStateSubscription = attachedPortal.closed.subscribe((closed) => {
      // If the menu closes, unsubscribe
      if (closed) {
        this.menuClosedStateSubscription.unsubscribe();
      }
    });
  }

  detach() {
    // Remove any components attached to the PortalOutlet
    if (this.ctxMenuPortalOutlet.hasAttached) {
      this.ctxMenuPortalOutlet.detach();
    }
  }

}

