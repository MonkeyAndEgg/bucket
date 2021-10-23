import { Action, createReducer, on } from "@ngrx/store";
import { Product } from "src/app/models/product";
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: Product[],
  productInView: Product | undefined
}

export const initialState: ProductState = {
  products: [],
  productInView: undefined
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsComplete, (state, data) => {
    return ({
      ...state,
      products: data.products
    });
  }),
  on(ProductActions.loadProductByIdComplete, (state, data) => {
    return ({
      ...state,
      productInView: data.product
    });
  })
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
