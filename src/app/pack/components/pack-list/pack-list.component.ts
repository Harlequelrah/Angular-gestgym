import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
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
  selectedPack?: Pack;
  isModalOpen = false;
  canSubscribe: boolean = false;
  customer_id: number | null = null;
searchTerm: string ='';

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
    const dialogRef = this.dialog.open(PackModalComponent, {
      width: '500px',
      data: pack ? { ...pack } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPacks();
      }
    });
  }




  editPack(pack: Pack): void {
    this.openPackModal(pack);
  }


  deletePack(id: number): void {

    this.packService.deletePack(id).subscribe(() => {
      this.loadPacks();
    });
  }


  closePackModal(): void {
    this.isModalOpen = false;
  }


  onPackSaved(pack: Pack): void {
    this.loadPacks();
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
  onSearch() {
    if (this.searchTerm === '') {
      this.loadPacks();
    } else {
      this.packs$ = this.packs$.pipe(
        map((packs) => packs.filter(pack => pack.offer_name === this.searchTerm))
      );
    }
  }


}
