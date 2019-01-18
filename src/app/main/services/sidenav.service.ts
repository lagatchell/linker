import { Injectable } from '@angular/core';

@Injectable()
export class SidenavService {

  isOpen = true;

  constructor() { }

  toggle(openState: boolean = !this.isOpen) {
    this.isOpen = openState;
  }
}
