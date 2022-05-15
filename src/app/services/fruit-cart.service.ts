import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class FruitCartService {

  private products: Product[] = [
    /*{
      name: 'Apple', price: 1.5, quantity: 7
    },
    {
      name: 'Orange', price: 1.0, quantity: 2
    },
    {
      name: 'Durian', price: 24, quantity: 2
    },*/
  ];

  onUpdateProduct: Subject<any> = new Subject<any>();
  onDataChange: Subject<null> = new Subject<null>();

  constructor() { }

  upsertProduct(product: Product, index: number): void {
    if (index > -1) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }
    this.onDataChange.next(null);
  }

  removeProduct(index: number): void {
    const arr1 = this.products.slice(0, index);
    const arr2 = this.products.slice(index + 1, this.products.length);
    this.products = arr1.concat(arr2);
    this.onDataChange.next(null);
  }

  updateProductForm(product: Product, index: number): void {
    this.onUpdateProduct.next({ product, index });
  }

  getTotalPrice(): number {
    const prices = this.products.map(obj => obj.price * obj.quantity);
    const totalPrice = prices.reduce((a, b) => a + b, 0);
    return totalPrice;
  }

  getProducts(): Product[] {
    return this.products;
  }

}
