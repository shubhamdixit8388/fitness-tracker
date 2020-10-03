import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UIService} from '../../Shared/services/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  hide = true;
  isLoading = false;
  isLoadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
  }

  onSubmit(signUpData: NgForm) {
    this.authService.registerUser(signUpData.value);
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }
}
