import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, withRouterConfig} from '@angular/router';
import { appRoutes } from './app/app.routes';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { environment } from './environments/environment.development';
import {getAuth, provideAuth} from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
}).catch(err => console.error(err));
