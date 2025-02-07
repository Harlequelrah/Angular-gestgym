import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from '../core/services/authService.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports:[AsyncPipe],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{

  constructor(private auth:AuthService){}
  
  ngOnInit(): void {


  }



}
