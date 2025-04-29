import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-profile',
  standalone: true,
  templateUrl: './personal-profile.component.html',
  styleUrl: './personal-profile.component.css'
})
export class PersonalProfileComponent {
  private router: Router = inject(Router);
    ngOnInit() {
      if (localStorage.getItem("user") === null) {
        this.router.navigate(['sign-in'])
      }
    }
}
