import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogin = true;

  constructor(
    //private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertService: AlertService) { }

  ngOnInit() {}


  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

  //  this.authenticate(email, password);
    form.reset();

  }



  auth(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log("je suis la");
    
    const portable = form.value.portable;
    const password = form.value.password;

    let user=JSON.parse(localStorage.getItem('user'))
  if (user.portable==portable && user.password==password) {
    
    this.alertService.presentToast("Bienvenue sur votre atelier");
this.router.navigate(["/home"])
  } else {
    
    this.alertService.presentToast("Identifiants incorrects, réessayez.");
  }

  }
}
