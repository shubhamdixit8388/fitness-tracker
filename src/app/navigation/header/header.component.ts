import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(status => {
      this.isAuth = status;
    });
  }

  toggle() {
    this.sideNavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
