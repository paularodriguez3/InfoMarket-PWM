import {Component, OnInit} from '@angular/core';
import {ProductComponent} from '../../components/product/product.component';
import {NgForOf} from '@angular/common';
import {Product} from '../../models/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [
    ProductComponent,
    NgForOf
  ],
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  titulo= '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  async ngOnInit(): Promise<void> {
    const categoria = this.route.snapshot.paramMap.get('categoria');
    console.log(categoria);
    if (!categoria) return;

    const doc = await this.productService.readDoc('productos', categoria);
    this.titulo = doc.Nombre;

    const productos = await this.productService.getCategory(categoria);
    for (const [id, productoData] of Object.entries(productos)) {
      const data = productoData as Product;
      const imageUrl = await this.productService.getImageUrl(data.Imagen);
      this.products.push({ id, ...data, Imagen: imageUrl });
    }
  }

  onSee(product: Product) {
    localStorage.setItem("productoSeleccionado", JSON.stringify({ id: product.id, data: product, quantity: null }));
    this.router.navigate(['/product-details']); // asegúrate de tener esta ruta
  }

}



