import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  private authSub: Subscription;
  private previousAuthState = false;

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router
    ) {
      this.initializeApp();
    }

    initializeApp() {
      this.platform.ready().then(() => {
        if (Capacitor.isPluginAvailable('Splashscreen')) {
          Plugins.Splashscreen.hide();
        }
      });
    }

    ngOnInit() {
      this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
        if (!isAuth && this.previousAuthState !== isAuth) {
          this.router.navigateByUrl('/auth');
        }
        this.previousAuthState = isAuth;
      });
    }

    onLogout() {
      // tslint:disable-next-line: no-unused-expression
      this.authService.logout();
      this.router.navigateByUrl('/auth');
    }

    ngOnDestroy() {
      if (this.authSub) {
        this.authSub.unsubscribe();
      }
    }
  }
