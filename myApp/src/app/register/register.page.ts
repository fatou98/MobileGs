import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertService: AlertService) { }

  ngOnInit() {
  }
  register(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log("je suis la");
    
    const portable = form.value.portable;
    const password = form.value.password;
 
    let user={
portable:portable,
password:password
    }
    localStorage.setItem('user',JSON.stringify(user))
    this.alertService.presentToast("Inscrit avec succès.Veuillez-vous connecter");
this.router.navigate(["/login"])
    form.reset();

  }

}
