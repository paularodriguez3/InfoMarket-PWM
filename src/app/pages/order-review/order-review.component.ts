import { Component } from '@angular/core';
import {ShoppingProcessComponent} from '../../components/shopping-process/shopping-process.component';
import {ShoppingInfoComponent} from '../../components/shopping-info/shopping-info.component';
import {OrderReviewTemplateComponent} from '../../components/order-review-template/order-review-template.component';

@Component({
  selector: 'app-order-review',
  standalone: true,
  templateUrl: './order-review.component.html',
  imports: [ShoppingProcessComponent, ShoppingInfoComponent, OrderReviewTemplateComponent],
  styleUrl: './order-review.component.css'
})
export class OrderReviewComponent {

}
