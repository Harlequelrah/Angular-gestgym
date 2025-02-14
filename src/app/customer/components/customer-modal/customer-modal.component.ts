import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  standalone: false,
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();

  customerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public customerData: any
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.customerForm = this.fb.group({
      first_name: [this.customerData?.first_name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      last_name: [this.customerData?.last_name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone_number: [this.customerData?.phone_number || '', [Validators.required, Validators.pattern("^\\+?[0-9. ()-]{7,25}$")]],
      active_suscription: [this.customerData?.active_suscription || false]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isLoading = true;
      const formData = this.customerForm.value;

      if (this.customerData) {

        this.customerService.updateCustomer(this.customerData.id, formData).subscribe(
          () => {
            this.isLoading = false;
            this.formSubmitted.emit();
            this.dialogRef.close(true);
          },
          error => {
            this.isLoading = false;
            alert('Erreur lors de la mise à jour du client.');
          }
        );
      } else {

        this.customerService.createCustomer(formData).subscribe(
          () => {
            this.isLoading = false;
            this.formSubmitted.emit();
            this.dialogRef.close(true);
          },
          error => {
            this.isLoading = false;
            alert('Erreur lors de la création du client.');
          }
        );
      }
    } else {
      alert('Formulaire invalide');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
