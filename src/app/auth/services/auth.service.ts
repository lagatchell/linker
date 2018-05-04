import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService implements CanActivate {

  authUser: any;
  userLoggedIn: boolean = false;

  constructor( 
    public afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
    private router: Router
  ) { 
      this.setAuthState();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable(observer => {
        this.afAuth.auth.onAuthStateChanged(user => {
            if (user) {
                observer.next(true);
            }
            else {
                this.router.navigate(['login']);
                observer.next(false);
            }
        })
    })
  }

  setAuthState() {
    this.afAuth.auth.onAuthStateChanged(user => {
        if(user !== null) {
            this.userLoggedIn = true;
            this.authUser = user;
        } 
        else {
            this.userLoggedIn = false;
            this.authUser = null;
        }
    });
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
        let dbRef = this.afdb.database.ref('users');
        let newUser = dbRef.push();
        newUser.set ({
            email: email,
            id: newUser.key,
        });
    });
  }

  login(loginEmail: string, loginPassword: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(loginEmail, loginPassword);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
