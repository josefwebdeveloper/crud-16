import {createAction, props} from "@ngrx/store";
import {Item} from "../../../shared/models/items.model";

const startGetItems  = createAction('[Items] Start Get Items');
const successGetItems = createAction('[Items] Success Get Items',props<{ payload: Item[] }>());
const errorGetItems = createAction('[Items] Error Get Items', props<{ payload: any }>());
const startAddItem = createAction('[Items] Start Add Item', props<{ payload: Item }>());
const successAddItem = createAction('[Items] Success Add Item', props<{ payload: Item }>());
const errorAddItem = createAction('[Items] Error Add Item', props<{ payload: any }>());
const startUpdateItem = createAction('[Items] Start Update Item', props<{ payload: Item }>());
const successUpdateItem = createAction('[Items] Success Update Item', props<{ payload: Item }>());
const errorUpdateItem = createAction('[Items] Error Update Item', props<{ payload: any }>());


export const itemsActions = {
  startGetItems,
  successGetItems,
  errorGetItems,
  startAddItem,
  successAddItem,
  errorAddItem,
  startUpdateItem,
  successUpdateItem,
  errorUpdateItem
}
