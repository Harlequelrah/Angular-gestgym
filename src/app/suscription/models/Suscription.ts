import { Customer } from "../../customer/models/Customer";
import { Pack } from "../../pack/models/Pack";

export class Suscription {
constructor(
    public id : number,
    public customer:Customer,
    public pack : Pack,
    public start_date:string
){}
}
