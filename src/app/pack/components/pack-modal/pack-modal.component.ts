import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackService } from '../../services/pack.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pack-modal',
  templateUrl: './pack-modal.component.html',
  standalone: false,
  styleUrls: ['./pack-modal.component.scss']
})
export class PackModalComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>(); // Événement après soumission

  packForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private packService: PackService,
    private dialogRef: MatDialogRef<PackModalComponent>,
    @Inject(MAT_DIALOG_DATA) public packData: any  // <---- Récupérer les données passées
  ) { }

  ngOnInit(): void {
    console.log('Données du client dans le modal:', this.packData); // Vérification dans la console
    this.initializeForm();
  }

  initializeForm(): void {
    this.packForm = this.fb.group({
      offer_name: [this.packData?.offer_name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      duration_months: [this.packData?.duration_months || 1, [Validators.required, Validators.min(1)]],
      monthly_price: [this.packData?.duration_months || 0.00,[Validators.required, Validators.min(0.00)]]

    });
  }

  onSubmit(): void {
    if (this.packForm.valid) {
      this.isLoading = true;
      const formData = this.packForm.value;

      if (this.packData) {
        // Mode modification
        this.packService.updatePack(this.packData.id, formData).subscribe(
          () => {
            this.isLoading = false;
            this.formSubmitted.emit();
            this.dialogRef.close(true);
          },
          error => {
            this.isLoading = false;
            alert('Erreur lors de la mise à jour du client.');
          }
        );
      } else {
        // Mode création
        this.packService.createPack(formData).subscribe(
          () => {
            this.isLoading = false;
            this.formSubmitted.emit();
            this.dialogRef.close(true);
          },
          error => {
            this.isLoading = false;
            alert('Erreur lors de la création du client.');
          }
        );
      }
    } else {
      alert('Formulaire invalide');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
