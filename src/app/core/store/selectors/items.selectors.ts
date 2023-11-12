import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ItemsState} from "../state/items.state";
import {itemsKey} from "../reducers/items.reducer";
import {Item} from "../../../shared/models/items.model";
import {state} from "@angular/animations";

export namespace ItemsSelectors {
  const itemsSelector = createFeatureSelector<ItemsState>(itemsKey);
  export const selectItems = createSelector(itemsSelector, state => state.items);
  export const selectItemById = (id: number) => createSelector(itemsSelector, state =>
    state.items?.find(item => item.id === id));


}
