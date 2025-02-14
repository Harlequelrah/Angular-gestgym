import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwtService.service';
import { AuthService } from '../../services/authService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  username: string | null = null;
  constructor(private jwtService: JwtService, private auth: AuthService) {
        this.username = this.jwtService.getUsername();
  }

  isSidebarOpen: boolean = true;
  isDropdownOpen: boolean = false;

  onLogOut(): void{
    this.auth.logout();
  }
  openSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
