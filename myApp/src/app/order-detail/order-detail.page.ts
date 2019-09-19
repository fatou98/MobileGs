import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { Subscription } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  customers: Customer[] = [];
  isLoading = false;
  private clientsSub: Subscription;

  constructor(private clientsService: CustomerService,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.customers = JSON.parse(localStorage.getItem('customers'));
  }


}
