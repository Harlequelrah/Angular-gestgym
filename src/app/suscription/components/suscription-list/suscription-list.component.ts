import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Suscription } from '../../models/Suscription';
import { SuscriptionService } from '../../services/suscription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suscription-list',
  templateUrl: './suscription-list.component.html',
  standalone: false,
  styleUrl: './suscription-list.component.scss'
})
export class SuscriptionListComponent implements OnInit {
  suscriptions$!: Observable<Suscription[]>;
  customer_id: number | null = null;
  pack_id: number | null=null;

  constructor(
    private suscriptionService: SuscriptionService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.prepareScreen();
    this.loadSuscriptions();
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

  loadSuscriptions(): void {
    if (this.customer_id) {
      console.log(`there is customer id ${this.customer_id}`);
      this.suscriptions$ = this.suscriptionService.getSuscriptionsByCustomerId(this.customer_id);
    }
    else if (this.pack_id) {
      console.log(`there is pack id ${this.pack_id}`);
      this.suscriptions$ = this.suscriptionService.getSuscriptionsByPackId(this.pack_id);
    }
    else {
      console.log("no id bro");
      this.suscriptions$ = this.suscriptionService.getAllSuscriptions();
    }

  }

  deleteSuscription(id: number): void {
    // Implémentation de la suppression
    this.suscriptionService.deleteSuscription(id).subscribe(() => {
      this.loadSuscriptions(); // Rafraîchir la liste après suppression
    });
  }

  // Gère l'enregistrement d'un client depuis le modal
  onSuscriptionSaved(suscription: Suscription): void {
    this.loadSuscriptions(); // Rafraîchir la liste après sauvegarde
  }
}
