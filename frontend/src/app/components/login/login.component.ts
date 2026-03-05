import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.isLoading = true;

    this.authService.login({ username, password }).subscribe({
      next: data => {
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.isLoading = false;
        // Fetch user object
        this.authService.user$.subscribe(user => {
          if (user) {
            this.router.navigate(['/tutorials']);
          }
        });
      },
      error: err => {
        this.errorMessage = err.error.detail || 'Login Failed';
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
