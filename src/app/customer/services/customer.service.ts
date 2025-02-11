import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Customer } from "../models/Customer";
import { environment } from "../../core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { customerForm } from "../types/customerForm.type";


@Injectable(
    {
        providedIn:'root'
    }
)
export class CustomerService{
    getOneCustomerByName(searchTerm: string): Observable<Customer[]> {
        return this.http.get<Customer>(`${this.baseUrl}/search?full_name=${searchTerm}`).pipe(
            map(
                (customer) => {
                    return [customer];
                }
            )
        );
    }

    private baseUrl: string = `${environment.ApiUrl}/customers`;

    constructor(private http:HttpClient){}

    public getAllCustomers(): Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.baseUrl}`);
    }


    public getOneCustomer(customer_id: number): Observable<Customer>{
        return this.http.get<Customer>(`${this.baseUrl}/${customer_id}`);
    }

    public createCustomer(customer: customerForm): Observable<Customer>{
        return this.http.post<Customer>(`${this.baseUrl}`,customer);
    }

    public updateCustomer(customer_id: number, customer: Customer): Observable<Customer>{
        return this.http.put<Customer>(`${this.baseUrl}/${customer_id}`, customer);
    }

    public deleteCustomer(customer_id: number): Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${customer_id}`);
    }

}
