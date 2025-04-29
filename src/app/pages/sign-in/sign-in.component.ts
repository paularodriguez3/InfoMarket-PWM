import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(event: Event) {
    event.preventDefault();

    try {
      await this.authService.signIn(this.email, this.password);
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      } else if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado');
      } else {
        alert('Error al iniciar sesión: ' + error.message);
      }
    }
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
