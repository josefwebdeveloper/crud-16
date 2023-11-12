import {createReducer, on} from "@ngrx/store";
import {initialItemsState} from "../state/items.state";
import {itemsActions} from "../actions/items.actions";

export const itemsKey = 'items';
export const itemsReducer = createReducer(
  initialItemsState,
  on(itemsActions.successGetItems, (state, { payload }) => ({ ...state , items: payload })),
);
