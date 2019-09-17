import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FakeTerminePage } from './fake-termine.page';

const routes: Routes = [
  {
    path: '',
    component: FakeTerminePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FakeTerminePage]
})
export class FakeTerminePageModule {}
