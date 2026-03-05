import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: '',
    email: '',
    password: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { username, email, password } = this.form;
    this.isLoading = true;

    this.authService.register({ username, email, password }).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = err.error.detail || 'Registration failed';
        this.isSignUpFailed = true;
        this.isLoading = false;
      }
    });
  }
}
