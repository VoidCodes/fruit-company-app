import { Component, OnInit } from '@angular/core';
import { Product, FruitCartService } from '../../services/fruit-cart.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  form: Product = {
    name: '',
    quantity: 0,
    price: 0
  };
  index = -1;

  backupProduct: Product = {
    name: '',
    quantity: 0,
    price: 0
  };

  constructor(private fruitcartSvc: FruitCartService) {

  }

  ngOnInit(): void {
    this.initFormValues();
    this.subscribe();
  }

  private subscribe(): void {
    this.fruitcartSvc.onUpdateProduct.subscribe(resp => {
      this.form = resp.product;
      this.index = resp.index;
      this.backupProduct = JSON.parse(JSON.stringify(resp.product));
    });
    this.fruitcartSvc.onDataChange.subscribe(
      resp => {
        this.initFormValues();
      });
  }

  addToCart(): void {
    this.fruitcartSvc.upsertProduct(this.form, this.index);
    this.initFormValues();
  }

  initFormValues(): void {
    this.form = {
      name: '',
      quantity: 0,
      price: 0
    };
    this.index = -1;
  }

  isAddToCartEnabled(): boolean {
    if (this.form && this.form.quantity && this.form.price) {
      return true;
    } else {
      return false;
    }
  }

  cancelUpdate(): void {
    this.form = this.backupProduct;
    this.addToCart();
  }

}
