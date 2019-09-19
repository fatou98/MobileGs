import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor() { }
orders:any[]
  ngOnInit() {
    this.orders=JSON.parse(localStorage.getItem("orders"))

  }

}
