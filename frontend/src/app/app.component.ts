import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  isLoggedIn = false;
  username?: string;

  constructor(private authService: AuthService) {
    this.initializeTheme();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.username = user.username;
      }
    });

    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      const user = this.authService.getUserFromStorage();
      if (user) {
        this.username = user.username;
      }
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
