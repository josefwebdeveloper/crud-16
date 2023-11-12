import {IAppState} from "../state/app.state";
import {ActionReducerMap} from "@ngrx/store";
import {itemsKey, itemsReducer} from "./items.reducer";

export const appReducer: ActionReducerMap<IAppState, any> = {
  [itemsKey]: itemsReducer
};
