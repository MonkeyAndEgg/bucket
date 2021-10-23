import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { createNewProduct } from "src/app/store/product/product.actions";

@Injectable({
  providedIn: 'root'
})
export class NewProductDialogService {
  constructor(private store: Store) {}

  createProuct(product: { name: string, price: number, description: string, numOfStocks: number, image: File }): void {
    // formdata allow passing the blob
    const productFormData = new FormData();
    productFormData.append('name', product.name);
    productFormData.append('price', product.price + '');
    productFormData.append('description', product.description);
    productFormData.append('numOfStocks', product.numOfStocks + '');
    productFormData.append('image', product.image);

    this.store.dispatch(createNewProduct({ product: productFormData }));
  }
}
