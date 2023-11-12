import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, of, Subscription, switchMap} from "rxjs";
import {Item} from "../../../shared/models/items.model";
import {IAppState} from "../../../core/store/state/app.state";
import {Store} from "@ngrx/store";
import {ItemsSelectors} from "../../../core/store/selectors/items.selectors";
import {itemsActions} from "../../../core/store/actions/items.actions";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  private subscription: any = new Subscription();
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) {
  }


  ngOnInit() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.subscription.add(this.store.select(ItemsSelectors.selectItemById(id)).subscribe((data: any) => {
      if (!data) {
        this.store.dispatch(itemsActions.startGetItems());
      } else {
        this.item = data;
      }
    }))

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
