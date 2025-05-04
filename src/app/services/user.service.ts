import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import {User} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore, { optional: true });

  constructor() {}

  async saveUserData(user: User): Promise<void> {
    if (!this.firestore) {
      throw new Error('Firestore no está funcionando correctamente.');
    }

    const userRef = doc(this.firestore, 'users', user.uid);

    await setDoc(userRef, {
      email: user.email,
      username: user.username,
      emailVerified: user.emailVerified
    });
  }

}
