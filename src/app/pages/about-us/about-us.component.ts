import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  imports: [
    NgIf
  ],
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit {
  hardwareIconUrl: string = '';
  softwareIconUrl: string = '';
  supportIconUrl: string = '';
  aboutUs: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.hardwareIconUrl = await this.firebaseService.getImageUrl('images/icon-hardware.png');
    this.softwareIconUrl = await this.firebaseService.getImageUrl('images/icon-software.png');
    this.supportIconUrl = await this.firebaseService.getImageUrl('images/icon-support.png');
    this.aboutUs = await this.firebaseService.getImageUrl('images/about-us-history.png');
  }
}
