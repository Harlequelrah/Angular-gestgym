import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerRoutingModule } from './customer-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';




@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerModalComponent,

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [
    CustomerListComponent,
    CustomerModalComponent,
  ]
})
export class CustomerModule { }
