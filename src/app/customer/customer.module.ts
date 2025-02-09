import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent,
    CustomerModalComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    CustomerModalComponent,
  ],
  exports:[CustomerListComponent,CustomerFormComponent]
})
export class CustomerModule { }
