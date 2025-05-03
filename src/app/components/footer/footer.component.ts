import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgIf} from '@angular/common';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [RouterModule, NgIf],
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  logoUrl: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.logoUrl = await this.firebaseService.getImageUrl('logo/infomarket_logo.png');
  }
}
