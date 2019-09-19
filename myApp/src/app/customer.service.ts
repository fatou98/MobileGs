import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor() { }


  getAllCustomer(): Observable<Customer> {
    const customers = JSON.parse(localStorage.getItem('customers'));
    return customers;
  }

  getCustomer(customerId: any): Observable<Customer> {
    const customers = JSON.parse(localStorage.getItem('customers'));
    const customer = customers.customerId;
    return customer;
  }


}
