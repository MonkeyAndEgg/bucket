import { createAction, props } from "@ngrx/store";
import { Cart, CartRequest } from "src/app/models/cart";
import { Order } from "src/app/models/order";

export const loadCartById = createAction('[Order] load cart with id', props<{ id: string }>());
export const updateCart = createAction('[Order] update current cart', props<{ cart: Cart }>());
export const addToCart = createAction('[Order] add product to cart', props<{ cart: CartRequest, cartId?: string }>());

export const loadOrdersByUserId = createAction('[Order] load order with user id', props<{ userId: string }>());
export const updateOrders = createAction('[Order] update current orders', props<{ orders: Order[] }>());
export const loadOrderById = createAction('[Order] load an order with id', props<{ id: string }>());
export const loadOrderByIdComplete = createAction('[Order] load an order with id complete', props<{ order: Order }>());
