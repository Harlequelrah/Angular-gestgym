import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers$!: Observable<Customer[]>;

  constructor(private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers$ = this.customerService.getAllCustomer();
  }

  openCustomerModal(customer?: Customer): void {
    const dialogRef = this.dialog.open(CustomerModalComponent, {
      width: '500px',
      data: customer ? { ...customer } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCustomers(); // Rafraîchir la liste après ajout/modification
      }
    });
  }
}
