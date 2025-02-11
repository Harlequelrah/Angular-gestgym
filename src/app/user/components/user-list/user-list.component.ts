import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: false,
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  selectedUser?: User;  // Pour garder la référence au client sélectionné
  isModalOpen = false; // Pour gérer l'état de visibilité du modal

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.userService.getAllUsers();
  }

  openUserModal(user?: User): void {
    console.log('user to open', user);
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px',
      data: user ? { ...user } : null  // <-- Les données sont bien passées ici
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers(); // Rafraîchir la liste après ajout/modification
      }
    });
  }



  // Méthode pour éditer un client (ouvre le modal)
  editUser(user: User): void {
    console.log('user to edit', user);
    this.openUserModal(user);
  }

  // Méthode pour supprimer un client
  deleteUser(id: number): void {
    // Implémentation de la suppression
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Rafraîchir la liste après suppression
    });
  }

  // Ferme le modal
  closeUserModal(): void {
    this.isModalOpen = false;
  }

  // Gère l'enregistrement d'un client depuis le modal
  onUserSaved(user: User): void {
    this.loadUsers(); // Rafraîchir la liste après sauvegarde
  }
}
