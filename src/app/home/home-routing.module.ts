import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
{
    path: 'tabs',
    component: HomePage,
    children: [
        {
            path: 'clients',
            children: [
                {
                    path: '',
                    loadChildren: './clients/clients.module#ClientsPageModule'
                },
                {
                    path: 'new',
                    loadChildren: './clients/new-client/new-client.module#NewClientPageModule'
                },
                {
                    path: 'edit/:clientId',
                    loadChildren: './clients/edit-client/edit-client.module#EditClientPageModule'
                },
                {
                    path: ':clientId',
                    loadChildren: './clients/client-details/client-details.module#ClientDetailsPageModule'
                }
            ]
        },
        {
            path: 'commandes',
            children: [
                {
                    path: '',
                    loadChildren: './commandes/commandes.module#CommandesPageModule'
                },
                {
                    path: 'new',
                    loadChildren: './commandes/new-commande/new-commande.module#NewCommandePageModule'
                },
                {
                    path: 'edit/:commandeId',
                    loadChildren: './commandes/edit-commande/edit-commande.module#EditCommandePageModule'
                },
                {
                    path: ':commandeId',
                    loadChildren: './commandes/commande-details/commande-details.module#CommandeDetailsPageModule'
                }
            ]

        },
        {
            path: '',
            redirectTo: '/home/tabs/clients',
            pathMatch: 'full'
        }
    ]
},
{
    path: '',
    redirectTo: '/home/tabs/clients',
    pathMatch: 'full'
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {

}
