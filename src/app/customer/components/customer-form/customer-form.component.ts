import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: false,
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder,private customerService : CustomerService) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      last_name: ['', [Validators.required, Validators.min(2), Validators.max(50)]],
      phone_number: ['', [Validators.required, Validators.pattern("^\\+? [0 - 9.() -]{ 7, 25}$")]],
      active_suscription:[false]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log('Form Submitted!', this.customerForm.value);
      this.customerService.createCustomer(this.customerForm.value).subscribe();
    } else {
      alert('form is invalid');
      console.log('Form is invalid');
    }
  }
}
