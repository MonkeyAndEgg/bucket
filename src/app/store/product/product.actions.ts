import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product";

export const loadProducts = createAction('[Product] load products');
export const loadProductsComplete = createAction('[Product] load products complete', props<{ products: Product[] }>());
export const createNewProduct = createAction('[Product] create a new product', props<{ product: FormData }>());
export const loadProductById = createAction('[Product] load a product with id', props<{ id: string }>());
export const loadProductByIdComplete = createAction('[Product] load a product with id complete', props<{ product: Product }>());
export const deleteProduct = createAction('[Product] delete a product by id', props<{ id: string }>());
