import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { Subscription } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  customers: Customer[] = [];
  isLoading = false;
  private clientsSub: Subscription;

  constructor( private clientsService: CustomerService,
               private router: Router,
               private loadingCtrl: LoadingController) { }

    ngOnInit() {
      this.customers = JSON.parse(localStorage.getItem('customers'));
    }


  }
