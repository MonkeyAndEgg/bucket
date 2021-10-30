import { createAction, props } from "@ngrx/store";
import { CartRequest } from "src/app/models/cart";

export const loadCartById = createAction('[Order] load cart with id', props<{ id: string }>());
export const loadCartByIdComplete = createAction('[Order] load cart with id complete', props<{ cart: any }>());
export const addToCart = createAction('[Order] add product to cart', props<{ cart: CartRequest, cartId?: string }>());
