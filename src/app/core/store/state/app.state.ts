import {itemsKey} from "../reducers/items.reducer";
import {initialItemsState, ItemsState} from "./items.state";

export interface IAppState {
  [itemsKey]: ItemsState;

}
export const initialAppState: IAppState = {
  [itemsKey]: initialItemsState,

};
