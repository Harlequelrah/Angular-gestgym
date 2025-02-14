import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';
import { Observable, tap } from 'rxjs';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  standalone: false,
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  onSearch() {
    if (this.searchTerm == '') {
      this.loadCustomers();
    }
    else {
      this.customers$ = this.customerService.getOneCustomerByName(this.searchTerm);
    }

}

  active_customer_suscription_count!: number;
  inactive_customer_suscription_count!: number;
  customers$!: Observable<Customer[]>;
  selectedCustomer?: Customer;
  isModalOpen = false;
  searchTerm: string = '';

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }


  loadCustomers(): void {
    this.customers$ = this.customerService.getAllCustomers().pipe(
      tap(
        (customers) => {
        this.active_customer_suscription_count = customers.filter(customer => customer.active_suscription).length;
        this.inactive_customer_suscription_count = customers.filter(customer => !customer.active_suscription).length;
        }
      )
    );
  }

  openCustomerModal(customer?: Customer): void {
    console.log('customer to open', customer);
    const dialogRef = this.dialog.open(CustomerModalComponent, {
      width: '500px',
      data: customer ? { ...customer } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadCustomers();
      }
    });
  }




  editCustomer(customer: Customer): void {
    console.log('customer to edit', customer);
    this.openCustomerModal(customer);
  }


  deleteCustomer(id: number): void {

    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }


  closeCustomerModal(): void {
    this.isModalOpen = false;
  }


  onCustomerSaved(customer: Customer): void {
    this.loadCustomers();
  }

  subscribeCustomer(customer_id: number) {
    this.router.navigateByUrl(`packs/subscribe-customer/${customer_id}`);
  }

  viewSuscription(customer_id: number) {
    this.router.navigateByUrl(`suscriptions/customer/${customer_id}`)

  }
}
