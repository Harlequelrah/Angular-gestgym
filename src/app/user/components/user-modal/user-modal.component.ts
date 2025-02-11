import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  standalone: false,
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>(); // Événement après soumission

  userForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any  // <---- Récupérer les données passées
  ) { }

  ngOnInit(): void {
    console.log('Données du client dans le modal:', this.userData); // Vérification dans la console
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: [this.userData?.firstName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [this.userData?.lastName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(50), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$")
      ]],
      active: [this.userData?.active || false],
      username: [this.userData?.username || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const formData = this.userForm.value;

      if (this.userData) {
        // Mode modification
        this.userService.updateUser(this.userData.id, formData).subscribe(
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
        this.userService.createUser(formData).subscribe(
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
  isPasswordVisible = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
