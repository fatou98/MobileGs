import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }
  getAllCustomer():Observable<Customer>{
    let customers=JSON.parse(localStorage.getItem("customers"));
return customers;
  }
}
