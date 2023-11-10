import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Item} from "../shared/models/items.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private items = new BehaviorSubject<Item[]>([]);
    dataItems = this.items.asObservable();

    constructor() {
    }

    updateData(data: any) { // Replace 'any' with your data type
        this.items.next(data);
    }
}
