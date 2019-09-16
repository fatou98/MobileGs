import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModelImageDetailsPage } from './model-image-details.page';

const routes: Routes = [
  {
    path: '',
    component: ModelImageDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModelImageDetailsPage]
})
export class ModelImageDetailsPageModule {}
