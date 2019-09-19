import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { IonicModule } from '@ionic/angular';

import { NewCustomerPage } from './new-customer.page';

const routes: Routes = [
  {
    path: '',
    component: NewCustomerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewCustomerPage],
  providers:[
    Camera,
    File]
})
export class NewCustomerPageModule {}
