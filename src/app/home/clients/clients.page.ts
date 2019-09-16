import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from './clients.service';
import { Client } from './client.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  loadedClients: Client[];
  isLoading = false;
  private clientsSub: Subscription;

  constructor( private clientsService: ClientsService,
               private router: Router,
               private loadingCtrl: LoadingController) { }

    ngOnInit() {
      this.clientsSub = this.clientsService.clients.subscribe(clients => {
        this.loadedClients = clients;
      });
    }

    ionViewWillEnter() {
      this.isLoading = true;
      this.clientsService.fetchClients().subscribe(() => {
        this.isLoading = false;
      });
    }


    onEdit(clientId: string, slidingItem: IonItemSliding) {
      slidingItem.close();
      this.router.navigate(['/', 'home', 'tabs', 'clients', 'edit', clientId]);
      console.log('Editing client', clientId);
    }


    onDelete(clientId: string, slidingItem: IonItemSliding) {
      if (confirm('sure ! you want to delete this item ?')) {
        slidingItem.close();
        this.loadingCtrl.create({
          message: 'Deleting...' }).then(loadingEl => {
            loadingEl.present();
            this.clientsService.deleteClient(clientId).subscribe(() => {
              loadingEl.dismiss();
            });
          });

        this.clientsService.deleteClient(clientId);
        this.router.navigate(['/', 'home', 'tabs', 'clients']);
        } else {
          slidingItem.close();
          return;
        }
      }

      // tslint:disable-next-line: use-life-cycle-interface
      ngOnDestroy() {
        if (this.clientsSub) {
          this.clientsSub.unsubscribe();
        }
      }


    }
