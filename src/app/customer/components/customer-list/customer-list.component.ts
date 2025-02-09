import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  standalone: false,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers$!: Observable<Customer[]>;
  constructor(private customerService:CustomerService){}
  ngOnInit(): void {
    this.customers$ = this.customerService.getAllCustomer();
  }

}
