import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UIService} from '../../Shared/services/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  isLoading = false;
  loginForm: FormGroup;
  isLoadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: Validators.required})
    });
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }

}
