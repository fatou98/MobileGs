import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommandeDetailsPage } from './commande-details.page';

const routes: Routes = [
  {
    path: '',
    component: CommandeDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommandeDetailsPage]
})
export class CommandeDetailsPageModule {}
