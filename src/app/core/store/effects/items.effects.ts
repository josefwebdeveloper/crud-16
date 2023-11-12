import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {IAppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {itemsActions} from "../actions/items.actions";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Injectable()
export class itemsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private apiService: ApiService,
    private router: Router
  ) {
  }

  getItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(itemsActions.startGetItems),
      switchMap(() => {
        return this.apiService.getPhotos().pipe(
          map((result) => {
            return itemsActions.successGetItems({payload: result})
          }),
          catchError((err) => {
            return of(itemsActions.errorGetItems({payload: err}))
          }),
        );
      }),
    );
  },);
  addItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(itemsActions.startAddItem),
      switchMap(({payload}) => {
        return this.apiService.addPhoto(payload).pipe(
          map((result) => {
            this.router.navigate(['/home']);
            return itemsActions.successAddItem({payload: result})
          }),
          catchError((err) => {
            return of(itemsActions.errorAddItem({payload: err}))
          }),
        );
      }),
    );
  }, {dispatch: false});
  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(itemsActions.startUpdateItem),
      switchMap(({payload}) => {
        return this.apiService.updatePhoto(payload.id,payload).pipe(
          map((result) => {

            this.router.navigate(['/home']);
            return  itemsActions.successUpdateItem({payload: result})
          }),
          catchError((err) => {
            return of(itemsActions.errorUpdateItem({payload: err}))
          }),
        );
      }),
    );
  }, {dispatch: false});
}
