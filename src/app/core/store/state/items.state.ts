import {Item} from "../../../shared/models/items.model";

export interface ItemsState {
  items:Item[];
  appLoading: boolean;
}

export const initialItemsState: ItemsState = {
  items: [],
  appLoading: false,
};
