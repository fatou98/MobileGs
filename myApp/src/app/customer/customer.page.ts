import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  customers: Customer[] = [];
  isLoading = false;
  private clientsSub: Subscription;

  constructor(private clientsService: CustomerService,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.customers = JSON.parse(localStorage.getItem('customers'));
  }

  onEdit(slidingItem: IonItemSliding) {
    slidingItem.close();
    // this.router.navigate(['/', 'home', 'tabs', 'clients', 'edit', clientId]);
    console.log('Editing client');
  }


  onDelete(slidingItem: IonItemSliding) {
    if (confirm('sure ! you want to delete this item ?')) {
      slidingItem.close();
      console.log('deleting client');
      // this.loadingCtrl.create({
      //   message: 'Deleting...' }).then(loadingEl => {
      //     loadingEl.present();
      //     this.clientsService.deleteClient(clientId).subscribe(() => {
      //       loadingEl.dismiss();
      //     });
      //   });

      // this.clientsService.deleteClient(clientId);
      // this.router.navigate(['/', 'home', 'tabs', 'clients']);
    } else {
      slidingItem.close();
      return;
    }
  }


  /* ionViewWillEnter() {
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
    */

}
