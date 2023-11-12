import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {DataService} from "../../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../../../shared/models/items.model";
import {IAppState} from "../../../core/store/state/app.state";
import {Store} from "@ngrx/store";
import {ItemsSelectors} from "../../../core/store/selectors/items.selectors";
import {itemsActions} from "../../../core/store/actions/items.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  submitted = false;
  subscription = new Subscription()
  route: ActivatedRoute = inject(ActivatedRoute);
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    url: new FormControl(''),
    thumbnailUrl: new FormControl(''),
  });
  item!: Item

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private dataService: DataService,
              private router: Router,
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
        this.form = this.formBuilder.group(
          {
            title: [data.title, Validators.required],
            url: [data.url, Validators.required],
            thumbnailUrl: [data.thumbnailUrl, Validators.required],
          },
        );
      }
    }))


  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = {
      ...this.form.value,
      id: this.item.id,
      albumId: this.item.albumId
    }
    this.store.dispatch(itemsActions.startUpdateItem({payload: data}));


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
