import { createAction, props } from "@ngrx/store";
import { Cart, CartRequest } from "src/app/models/cart";

export const loadCartById = createAction('[Order] load cart with id', props<{ id: string }>());
export const updateCart = createAction('[Order] update current cart', props<{ cart: Cart }>());
export const addToCart = createAction('[Order] add product to cart', props<{ cart: CartRequest, cartId?: string }>());
