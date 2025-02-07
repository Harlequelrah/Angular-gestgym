import { Component } from '@angular/core';
import { AuthService } from '../../services/authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private auth:AuthService,private router:Router){}
  onLogOut() {
    this.auth.logout();
    this.router.navigateByUrl("/");
}

}
