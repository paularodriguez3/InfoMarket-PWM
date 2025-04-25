import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  async signIn(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    localStorage.setItem('currentUser', JSON.stringify(userCredential.user));
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
