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
  selectedCustomer?: Customer;  // Pour garder la référence au client sélectionné
  isModalOpen = false; // Pour gérer l'état de visibilité du modal
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
      data: customer ? { ...customer } : null  // <-- Les données sont bien passées ici
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadCustomers(); // Rafraîchir la liste après ajout/modification
      }
    });
  }



  // Méthode pour éditer un client (ouvre le modal)
  editCustomer(customer: Customer): void {
    console.log('customer to edit', customer);
    this.openCustomerModal(customer);
  }

  // Méthode pour supprimer un client
  deleteCustomer(id: number): void {
    // Implémentation de la suppression
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers(); // Rafraîchir la liste après suppression
    });
  }

  // Ferme le modal
  closeCustomerModal(): void {
    this.isModalOpen = false;
  }

  // Gère l'enregistrement d'un client depuis le modal
  onCustomerSaved(customer: Customer): void {
    this.loadCustomers(); // Rafraîchir la liste après sauvegarde
  }

  subscribeCustomer(customer_id: number) {
    this.router.navigateByUrl(`packs/subscribe-customer/${customer_id}`);
  }

  viewSuscription(customer_id: number) {
    this.router.navigateByUrl(`suscriptions/customer/${customer_id}`)

  }
}
