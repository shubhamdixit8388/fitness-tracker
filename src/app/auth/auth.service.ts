import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { AuthData } from './auth-data.model';
import {User} from './user.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessFully();
  }
  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessFully();
  }
  logout() {
    this.user = null;
    this.authChange.next(false);
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.user != null;
  }
  authSuccessFully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
