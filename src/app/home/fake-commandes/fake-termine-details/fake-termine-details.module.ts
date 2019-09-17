import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FakeTermineDetailsPage } from './fake-termine-details.page';

const routes: Routes = [
  {
    path: '',
    component: FakeTermineDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FakeTermineDetailsPage]
})
export class FakeTermineDetailsPageModule {}
