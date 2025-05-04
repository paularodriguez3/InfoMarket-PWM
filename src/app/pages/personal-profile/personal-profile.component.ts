import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, signOut } from '@angular/fire/auth';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-personal-profile',
  standalone: true,
  templateUrl: './personal-profile.component.html',
  styleUrl: './personal-profile.component.css',
  imports: [CommonModule, FormsModule]
})
export class PersonalProfileComponent implements OnInit {
  user: User = {
    uid: '',
    email: '',
    username: '',
    emailVerified: false,
    firstName: '',
    lastName: '',
    phone: ''
  };

  private router = inject(Router);
  private firestore = inject(Firestore, { optional: true });
  private auth = inject(Auth, { optional: true });

  ngOnInit() {
    if (!this.firestore) {
      console.warn('Firestore no está disponible. Perfil desactivado.');
      return;
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/sign-in']);
      return;
    }

    const localUser = JSON.parse(userData);
    this.user.uid = localUser.uid;
    this.user.email = localUser.email;
    this.user.emailVerified = localUser.emailVerified;

    this.loadUserData();
  }

  async loadUserData() {
    if (!this.firestore) return;

    try {
      const userRef = doc(this.firestore, 'users', this.user.uid);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<User>;
        this.user = {
          ...this.user,
          ...data
        };
      } else {
        alert('No se encontraron datos del usuario.');
      }
    } catch (err) {
      console.error('Error al cargar el perfil:', err);
    }
  }

  async onSave() {
    if (!this.firestore) {
      alert('No se puede guardar: Firestore no está disponible.');
      return;
    }

    try {
      const userRef = doc(this.firestore, 'users', this.user.uid);
      await updateDoc(userRef, {
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phone: this.user.phone
      });

      alert('Datos de perfil actualizados.');
    } catch (err) {
      console.error('Error al guardar el perfil:', err);
    }
  }

  async logout() {
    try {
      if (this.auth) await signOut(this.auth);
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  }
}
