import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/authService.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }
  loginForm!: FormGroup;

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        stayLoggedIn: [false]
      }
    );
  }
  onSubmitLoginForm() {
    this.auth.login(this.loginForm.value).pipe(
      tap(
        () => {
          this.router.navigateByUrl("/accueil")
        }
      )
    ).subscribe();

  }

}
