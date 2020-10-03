import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { AuthData } from './auth-data.model';
import {Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UIService} from '../Shared/services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('User registered successfully!!!', null, 3000);
      }).catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
    });
  }
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('User Logged In successfully!!!', null, 3000);
      }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000);
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
