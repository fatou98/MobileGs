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
                    children: [
                        {
                            path: 'new-article/:clientId',
                            loadChildren: './commandes/new-commande/new-article/new-article.module#NewArticlePageModule'
                        },
                        {
                            path: 'article1/:clientId',
                            loadChildren: './commandes/new-commande/article1/article1.module#Article1PageModule'
                        },
                        {
                            path: 'article2/:clientId',
                            loadChildren: './commandes/new-commande/article2/article2.module#Article2PageModule'
                        },
                        {
                            path: 'new-article2/:clientId',
                            loadChildren: './commandes/new-commande/new-article2/new-article2.module#NewArticle2PageModule'
                        },
                        {
                           path: ':clientId',
                           loadChildren: './commandes/new-commande/new-commande.module#NewCommandePageModule'
                        }
                    ]
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
            path: 'fake-commandes',
            children: [
                {
                    path: '',
                    loadChildren: './fake-commandes/fake-commandes.module#FakeCommandesPageModule'
                },
                {
                    path: 'termine-details/:clientId',
                    loadChildren: './fake-commandes/fake-termine-details/fake-termine-details.module#FakeTermineDetailsPageModule'
                },
                {
                    path: 'termine/:clientId',
                    loadChildren: './fake-commandes/fake-termine/fake-termine.module#FakeTerminePageModule'
                },
                {
                    path: 'details/:clientId',
                    loadChildren: './fake-commandes/fake-details/fake-details.module#FakeDetailsPageModule'
                },
                {
                    path: ':clientId',
                    loadChildren: './fake-commandes/fake-commandes.module#FakeCommandesPageModule'
                }
            ]
        },
        {
            path: 'vitrine',
            loadChildren: './vitrine/vitrine.module#VitrinePageModule'

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
},
  { path: 'new-article', loadChildren: './commandes/new-commande/new-article/new-article.module#NewArticlePageModule' },
  { path: 'article1', loadChildren: './commandes/new-commande/article1/article1.module#Article1PageModule' },
  { path: 'article2', loadChildren: './commandes/new-commande/article2/article2.module#Article2PageModule' },
  { path: 'new-article2', loadChildren: './commandes/new-commande/new-article2/new-article2.module#NewArticle2PageModule' },
  { path: 'fake-commandes', loadChildren: './fake-commandes/fake-commandes.module#FakeCommandesPageModule' },
  { path: 'fake-details', loadChildren: './fake-commandes/fake-details/fake-details.module#FakeDetailsPageModule' },
  { path: 'fake-termine', loadChildren: './fake-commandes/fake-termine/fake-termine.module#FakeTerminePageModule' },
  { path: 'fake-termine-details', loadChildren: './fake-commandes/fake-termine-details/fake-termine-details.module#FakeTermineDetailsPageModule' }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {

}
