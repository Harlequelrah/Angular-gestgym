import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent implements OnInit {
  @Input() customerData: any = null; // Pour modification
  @Input() isVisible: boolean = false; // Pour afficher/masquer le modal
  @Output() closeModal = new EventEmitter<void>(); // Événement pour fermer le modal
  @Output() formSubmitted = new EventEmitter<any>(); // Événement après soumission

  customerForm!: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      first_name: [this.customerData?.first_name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      last_name: [this.customerData?.last_name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone_number: [this.customerData?.phone_number || '', [Validators.required, Validators.pattern("^[0-9]{7,25}$")]],
      active_suscription: [this.customerData?.active_suscription || false]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;

      if (this.customerData) {
        // Mode modification
        this.customerService.updateCustomer(this.customerData.id, formData).subscribe(() => {
          this.formSubmitted.emit(); // Notifie la mise à jour
          this.closeModal.emit(); // Ferme le modal
        });
      } else {
        // Mode création
        this.customerService.createCustomer(formData).subscribe(() => {
          this.formSubmitted.emit(); // Notifie la création
          this.closeModal.emit(); // Ferme le modal
        });
      }
    } else {
      alert('Formulaire invalide');
    }
  }

  close() {
    this.closeModal.emit();
  }
}
