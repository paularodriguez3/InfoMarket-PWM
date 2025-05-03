// src/app/components/order-review-template/order-review-template.component.ts

import {Component, Input, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-order-review-template',
  templateUrl: './order-review-template.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./order-review-template.component.css']
})
export class OrderReviewTemplateComponent implements OnInit {
  @Input() paymentMethod: string = '';
  @Input() arrivalDate: string = '';

  mapImageUrl: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.mapImageUrl = await this.firebaseService.getImageUrl('images/Tiendas-en-las-que-operamos.png');
  }
}
