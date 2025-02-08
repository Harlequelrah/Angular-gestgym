import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showHeader: boolean = false;
  showDashboard: boolean = false;
  showSidebar: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(
      () => {
        this.showHeader = this.router.url != "";
        this.showDashboard = this.router.url != "/";
        this.showSidebar = this.router.url != "/";

      }
    )
  }





}
