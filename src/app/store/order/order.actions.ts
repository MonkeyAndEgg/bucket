import { createAction, props } from "@ngrx/store";

export const loadCartById = createAction('[Order] load cart with id', props<{ id: string }>());
export const loadCartByIdComplete = createAction('[Order] load cart with id complete', props<{ cart: any }>());
