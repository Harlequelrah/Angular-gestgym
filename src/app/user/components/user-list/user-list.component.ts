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
  selectedUser?: User;
  isModalOpen = false;

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
      data: user ? { ...user } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }




  editUser(user: User): void {
    this.openUserModal(user);
  }


  deleteUser(id: number): void {

    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }


  closeUserModal(): void {
    this.isModalOpen = false;
  }


  onUserSaved(user: User): void {
    this.loadUsers();
  }
}
