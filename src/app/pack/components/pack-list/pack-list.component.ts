import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SuscriptionService } from '../../../suscription/services/suscription.service';
import { suscriptionForm } from '../../../suscription/types/suscriptionForm.type';
import { Pack } from '../../models/Pack';
import { PackService } from '../../services/pack.service';
import { PackModalComponent } from '../pack-modal/pack-modal.component';

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  standalone: false,
  styleUrl: './pack-list.component.scss'
})
export class PackListComponent implements OnInit {


  packs$!: Observable<Pack[]>;
  selectedPack?: Pack;  // Pour garder la référence au client sélectionné
  isModalOpen = false; // Pour gérer l'état de visibilité du modal
  canSubscribe: boolean = false;
  customer_id: number | null = null;

  constructor(
    private packService: PackService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private suscriptionService:SuscriptionService
  ) { }

  prepareSuscription(): void {
    const id = this.route.snapshot.paramMap.get('customer_id');
    if (id) {
      this.customer_id = Number(id);
      this.canSubscribe = true;
    }

  }
  ngOnInit(): void {
    this.loadPacks();
    this.prepareSuscription();
  }

  loadPacks(): void {
    this.packs$ = this.packService.getAllPacks();
  }

  openPackModal(pack?: Pack): void {
    console.log('pack to open', pack);
    const dialogRef = this.dialog.open(PackModalComponent, {
      width: '500px',
      data: pack ? { ...pack } : null  // <-- Les données sont bien passées ici
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPacks(); // Rafraîchir la liste après ajout/modification
      }
    });
  }



  // Méthode pour éditer un client (ouvre le modal)
  editPack(pack: Pack): void {
    console.log('pack to edit', pack);
    this.openPackModal(pack);
  }

  // Méthode pour supprimer un client
  deletePack(id: number): void {
    // Implémentation de la suppression
    this.packService.deletePack(id).subscribe(() => {
      this.loadPacks(); // Rafraîchir la liste après suppression
    });
  }

  // Ferme le modal
  closePackModal(): void {
    this.isModalOpen = false;
  }

  // Gère l'enregistrement d'un client depuis le modal
  onPackSaved(pack: Pack): void {
    this.loadPacks(); // Rafraîchir la liste après sauvegarde
  }

  subscribePack(pack_id: number): void{
    if (this.canSubscribe && this.customer_id) {
      const suscription: suscriptionForm = {
        customer_id: this.customer_id,
        pack_id: pack_id
      };
      this.suscriptionService.createSuscription(suscription).pipe(
        tap(
          () => {
            this.router.navigateByUrl(`suscriptions/customer/${this.customer_id}`);
          }
        )
      ).subscribe();
    }
  }
  viewSuscription(pack_id: number) {
    this.router.navigateByUrl(`suscriptions/pack/${pack_id}`);
  }

}
