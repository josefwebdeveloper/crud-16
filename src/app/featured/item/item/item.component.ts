import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {of, Subscription, switchMap} from "rxjs";
import {DataService} from "../../../services/data.service";
import {ApiService} from "../../../services/api.service";
import {Item} from "../../../shared/models/items.model";


@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
    private subscription: any = new Subscription();
    itemId!: number | null;
    item!: Item;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private apiService: ApiService
    ) {
    }

    ngOnInit() {
        this.subscription.add(this.route.paramMap.pipe(
                switchMap(params => {
                    const id = params.get('id');
                    this.itemId = id ? +id : null;
                    if (this.itemId) {
                        return this.dataService.dataItems.pipe(
                            switchMap(items => {
                                if (!items.length) {
                                    return this.apiService.getPhoto(this.itemId);
                                }
                                console.log(items)
                                const item = items.find(i => i.id === this.itemId);
                                console.log(item)
                                return of(item);
                            })
                        );
                    }
                    return of(null);
                    // Now you can use this.itemId to get data for the item
                })
            ).subscribe(item => {
                if (item) {
                    this.item = item;
                    console.log(item)
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }


}
