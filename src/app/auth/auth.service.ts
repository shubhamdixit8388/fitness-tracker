import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AuthData } from './auth-data.model';
import {Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackBar: MatSnackBar) { }

  registerUser(authData: AuthData) {
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        this.snackBar.open('User registered successfully!!!', null, {
          duration: 3000
        });
      }).catch(error => {
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
    });
  }
  login(authData: AuthData) {
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        console.log('User Logged In successfully!!! : ', success);
        this.snackBar.open('User Logged In successfully!!!', null, {
          duration: 3000
        });
      }).catch(error => {
      this.snackBar.open(error.message, null, {
        duration: 3000
      });
    });
  }
  inItAuthListener() {
    this.angularFireAuth.authState.subscribe(state => {
      if (state) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
      }
    });
  }
  logout() {
    this.angularFireAuth.signOut();
  }
  isAuth() {
    return this.isAuthenticated;
  }
}
