import { Action, createReducer, on } from "@ngrx/store";
import * as ProductActions from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: any[]
}

export const initialState: ProductState = {
  products: []
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsComplete, (state, data) => {
    return ({
      ...state,
      products: data.products
    });
  })
);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
