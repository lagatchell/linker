import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidenavService {

  sideNavOpenState: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() { }

}
