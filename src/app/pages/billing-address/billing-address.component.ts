import { Component } from '@angular/core';
import {ShoppingProcessComponent} from '../../components/shopping-process/shopping-process.component';
import {ShoppingInfoComponent} from '../../components/shopping-info/shopping-info.component';

@Component({
  selector: 'app-billing-address',
  standalone: true,
  templateUrl: './billing-address.component.html',
  imports: [ShoppingProcessComponent, ShoppingInfoComponent],
  styleUrl: './billing-address.component.css'
})
export class BillingAddressComponent {

}
