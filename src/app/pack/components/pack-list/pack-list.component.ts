import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pack } from '../../models/Pack';
import { PackService } from '../../services/pack.service';
import { Observable } from 'rxjs';
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

  constructor(
    private packService: PackService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPacks();
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
}
