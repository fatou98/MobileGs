import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FakeCommandesPage } from './fake-commandes.page';

const routes: Routes = [
  {
    path: '',
    component: FakeCommandesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FakeCommandesPage]
})
export class FakeCommandesPageModule {}
