import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(
      () => {
        this.showHeader = this.router.url!=""
      }
    )
  }

  showHeader: boolean = false;



}
