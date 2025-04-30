import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  imageUrl: string = '';
  quantity = 1;
  finalPrice = 0;
  caracteristicas: { clave: string; valor: any }[] = [];

  constructor(private shoppingCartService: ShoppingCartService,
  private firebaseService: FirebaseService) {}

  async ngOnInit() {
    const productoStr = localStorage.getItem('productoSeleccionado');
    if (!productoStr) return;
    const producto = JSON.parse(productoStr);
    this.product = producto.data;
    this.imageUrl = await this.firebaseService.getImageUrl(this.product.Imagen);
    this.finalPrice = this.product.Precio;

    this.caracteristicas = Object.entries(this.product.Caracteristicas).map(([clave, valor]) => ({ clave, valor }));
  }

  incrementQuantity() {
    this.quantity++;
    this.updatePrice();
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updatePrice();
    }
  }

  updatePrice() {
    this.finalPrice = Math.round(this.product.Precio * this.quantity * 100) / 100;
  }

  addToCart() {
    this.shoppingCartService.addToCart({ ...this.product }, this.quantity);
  }
}
