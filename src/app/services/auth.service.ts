import {inject, Injectable} from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth, {optional: true});
  constructor(private router: Router) {}

  async signIn(email: string, password: string): Promise<void> {
    if (!this.auth) {
      throw new Error('Firebase Auth no está inicializado.');
    }
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    localStorage.setItem('currentUser', JSON.stringify(userCredential.user));
    const userEmail = userCredential.user.email;
    alert(`Inicio de sesión exitoso, bienvenido ${userEmail}`);
    this.router.navigate(['/personal-profile']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/sign-in']);
  }
}
