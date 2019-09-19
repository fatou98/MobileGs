import { Component, OnInit } from '@angular/core';
import { Order } from '../order';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor() { }
orders:Order[]=[]
  ngOnInit() {
    this.orders=JSON.parse(localStorage.getItem("orders"))

  }

}
