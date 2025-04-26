import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, withRouterConfig} from '@angular/router';
import { appRoutes } from './app/app.routes';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { environment } from './environments/environment.development';
import {getAuth, provideAuth} from '@angular/fire/auth';

function isFirebaseConfigValid(config: any): boolean {
  return config && config.apiKey && config.authDomain && config.projectId;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    ...(isFirebaseConfigValid(environment.firebaseConfig)
      ? [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth())
      ]
      : [])
  ],
}).catch(err => console.error(err));
