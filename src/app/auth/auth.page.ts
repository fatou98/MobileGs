import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {}

  authenticate(email: string, password: string) {

    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Logging in ...'})
    .then(loadingEl => {
      loadingEl.present();
      let authObs: Observable<AuthResponseData>;

      if (this.isLogin) {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signup(email, password);
      }

      authObs.subscribe(
        resData => {
        console.log(resData);
        loadingEl.dismiss();
        this.router.navigateByUrl('/home/tabs/clients');
      },
      errRes => {
        loadingEl.dismiss();
        const code = errRes.error.error.message;
        let message = '';
        if (code === 'EMAIL_EXISTS') {
          message = 'This email address already exists!';
          this.showAlert(message);
        } else if (code === 'EMAIL_NOT_FOUND') {
          message = 'Email address could not be found.';
          this.showAlert(message);
        } else if (code === 'INVALID_PASSWORD') {
          message = 'This password is not correct.';
          this.showAlert(message);
        }
      });
    });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
    form.reset();

  }

  private showAlert(message: string) {
    this.alertCtrl.create({
      header: 'Authentication failed',
      // tslint:disable-next-line: object-literal-shorthand
      message: message,
      buttons: ['Okay']
    })
    .then(alertEl => alertEl.present());
  }

}
