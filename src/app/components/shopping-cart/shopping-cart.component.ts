import { Component, OnInit } from '@angular/core';
import { FruitCartService, Product } from '../../services/fruit-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[] = [];
  totalPrice = 0;

  constructor(private fruitcartSvc: FruitCartService) { }

  ngOnInit(): void {
    this.subscribe();
    this.initTableValues();
  }

  updateItem(product: Product, index: number): void {
    this.fruitcartSvc.updateProductForm(product, index);
  }

  deleteItem(index: number): void {
    this.fruitcartSvc.removeProduct(index);
  }

  private subscribe(): void {
    this.fruitcartSvc.onDataChange.subscribe(param => {
      this.initTableValues();
    });
  }

  private initTableValues(): void {
    this.products = this.fruitcartSvc.getProducts();
    this.totalPrice = this.fruitcartSvc.getTotalPrice();
  }

}
