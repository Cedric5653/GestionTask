
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    const userData = {
      name: this.name, // Ajoutez une variable `name` si nécessaire
      email: this.email,
      password: this.password
    };

    this.authService.signup(this.name, this.email, this.password, userData).subscribe({
      next: (response) => {
        // Rediriger après une inscription réussie
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Signup failed. Please try again.';
      }
    });
  }
}
