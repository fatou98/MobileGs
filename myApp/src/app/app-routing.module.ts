import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'customer', loadChildren: './customer/customer.module#CustomerPageModule' },
  { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'profil', loadChildren: './profil/profil.module#ProfilPageModule' },
  { path: 'new-customer', loadChildren: './new-customer/new-customer.module#NewCustomerPageModule' },
  { path: 'customer-detail', loadChildren: './customer-detail/customer-detail.module#CustomerDetailPageModule' },
  { path: 'new-order', loadChildren: './new-order/new-order.module#NewOrderPageModule' },
  { path: 'order-detail', loadChildren: './order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'new-article', loadChildren: './new-article/new-article.module#NewArticlePageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
