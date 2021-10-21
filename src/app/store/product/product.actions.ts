import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product";

export const loadProducts = createAction('[Product] load products');
export const loadProductsComplete = createAction('[Product] load products complete', props<{ products: Product[] }>());
export const createNewProduct = createAction('[Product] create a new product', props<{ product: FormData }>());
