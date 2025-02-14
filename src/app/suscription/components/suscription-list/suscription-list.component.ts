import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Suscription } from '../../models/Suscription';
import { SuscriptionService } from '../../services/suscription.service';

@Component({
  selector: 'app-suscription-list',
  templateUrl: './suscription-list.component.html',
  standalone: false,
  styleUrl: './suscription-list.component.scss'
})
export class SuscriptionListComponent implements OnInit {


  suscriptions$!: Observable<Suscription[]>;
  customer_id: number | null = null;
  pack_id: number | null = null;
  chiffreAffaire!: number;
  startDate: string = '';
  endDate: string = '';
  constructor(
    private suscriptionService: SuscriptionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.prepareScreen();
    this.loadSuscriptions();
  }

  getEndDate(suscription:Suscription): string {
    const startDate = new Date(suscription.start_date);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + suscription.pack.duration_months);
    return endDate.toISOString();
  }




  prepareScreen(): void{
    const customerId = this.route.snapshot.paramMap.get('customer_id');
    if (customerId) {
      this.customer_id = Number(customerId);
    }
    const packId = this.route.snapshot.paramMap.get('pack_id');
    if (packId)
    {
      this.pack_id = Number(packId);
    }
  }
  calculateChiffreAffaire(suscriptions: Suscription[]): number {
    return suscriptions
      .filter(s => s.active)
      .reduce((total, suscription) => total + suscription.pack.monthly_price, 0);
  }


  filterData() {

    if (!this.startDate || !this.endDate) {
      alert('Les deux dates doivent être renseignées.');
      return;
    }


    if (this.startDate === this.endDate) {
      alert('La date de début et la date de fin ne peuvent pas être identiques.');
      return;
    }


    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (start >= end) {
      alert('La date de début doit être antérieure à la date de fin.');
      return;
    }


    this.loadSuscriptions(start, end);
  }

  loadSuscriptions(startDate?: Date, endDate?: Date): void {
    if (this.customer_id) {
      this.suscriptions$ = this.suscriptionService.getSuscriptionsByCustomerId(this.customer_id).pipe(
        map(suscriptions =>
          (startDate) ? suscriptions.filter(s => {
            const subscriptionStartDate = new Date(s.start_date);
            const subscriptionEndDate = new Date(this.getEndDate(s));
            subscriptionEndDate.setMonth(subscriptionStartDate.getMonth() + s.pack.duration_months);

            return subscriptionStartDate >= startDate && endDate !== undefined && subscriptionEndDate <= endDate;
          }) : suscriptions
        ),
        tap(suscriptions => {
          this.chiffreAffaire = this.calculateChiffreAffaire(suscriptions);

        })
      );
    }
    else if (this.pack_id) {
      this.suscriptions$ = this.suscriptionService.getSuscriptionsByPackId(this.pack_id).pipe(
        map(suscriptions =>
          (startDate) ? suscriptions.filter(s => {
            const subscriptionStartDate = new Date(s.start_date);
            const subscriptionEndDate = new Date(this.getEndDate(s));

            return subscriptionStartDate >= startDate && endDate !== undefined && subscriptionEndDate <= endDate;
          }) : suscriptions
        ),
        tap(suscriptions => {
          this.chiffreAffaire = this.calculateChiffreAffaire(suscriptions);

        })
      );
    }
    else {
      this.suscriptions$ = this.suscriptionService.getAllSuscriptions().pipe(
        map(suscriptions =>
          (startDate) ? suscriptions.filter(s => {
            const subscriptionStartDate = new Date(s.start_date);
            const subscriptionEndDate = new Date(this.getEndDate(s));

            return subscriptionStartDate >= startDate && endDate !== undefined && subscriptionEndDate <= endDate;
          }) : suscriptions
        ),
        tap(suscriptions => {
          this.chiffreAffaire = this.calculateChiffreAffaire(suscriptions);

        })
      );
    }
  }


  deleteSuscription(id: number): void {

    this.suscriptionService.deleteSuscription(id).subscribe(() => {
      this.loadSuscriptions();
    });
  }


  onSuscriptionSaved(suscription: Suscription): void {
    this.loadSuscriptions();
  }
  changeSuscriptionStatus(suscription: Suscription) {
    this.suscriptionService.changeSuscriptionStatus(suscription.id,suscription).subscribe(() => {
      this.loadSuscriptions();
    });
  }

  exportSuscriptions() {
    this.suscriptions$.subscribe(suscriptions => {
      if (!suscriptions || suscriptions.length === 0) {
        alert("Aucune souscription à exporter.");
        return;
      }

      const csvContent = this.convertToCSV(suscriptions);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "suscriptions.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  private convertToCSV(suscriptions: Suscription[]): string {
    if (!suscriptions.length) return "";


    const headers = ["Id", "Client", "Pack", "Date Début", "Date Fin", "Status"].join(",") + "\n";


    const rows = suscriptions.map(s => {
      const id = s.id;
      const client = `${s.customer.last_name} ${s.customer.first_name}`;
      const pack = s.pack.offer_name;
      const startDate = new Date(s.start_date).toLocaleString("fr-FR", {
        day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
      const endDate = new Date(this.getEndDate(s)).toLocaleString("fr-FR", {
        day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
      const status = s.active ? "Active" : "Inactive";

      return `"${id}","${client}","${pack}","${startDate}","${endDate}","${status}"`;
    }).join("\n");

    return "\ufeff" + headers + rows;
  }


}
