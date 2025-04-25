import { Component } from '@angular/core';
import {ShoppingProcessComponent} from '../../components/shopping-process/shopping-process.component';
import {ShoppingInfoComponent} from '../../components/shopping-info/shopping-info.component';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  templateUrl: './payment-method.component.html',
  imports: [ShoppingProcessComponent, ShoppingInfoComponent],
  styleUrl: './payment-method.component.css'
})
export class PaymentMethodComponent {

}
