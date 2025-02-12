import { Customer } from "../../customer/models/Customer";
import { Pack } from "../../pack/models/Pack";

export class Suscription {
    constructor(
        public id: number,
        public customer: Customer,
        public pack: Pack,
        public start_date: string,
        public active: boolean
    ) { }

    // Méthode pour calculer la date de fin
}
