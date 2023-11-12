import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {Item} from "../../shared/models/items.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../store/state/app.state";
import {itemsActions} from "../store/actions/items.actions";
import {ItemsSelectors} from "../store/selectors/items.selectors";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    displayedColumns: string[] = ['id', 'title', 'thumbnailUrl', 'action'];
    dataSource!: MatTableDataSource<Item>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private dataService: DataService,
        private store: Store< IAppState>
    ) {
    }

    ngOnInit(): void {
        this.getPhotos()
        this.subscription.add(this.store.select(ItemsSelectors.selectItems).subscribe((data: Item[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }))

    }

    getPhotos() {

             this.update()

    }
    update(){
      this.store.dispatch(itemsActions.startGetItems());

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    gotoItem(row: Item) {
        this.router.navigate(['/item', row.id]);
    }

    delete(id: number, event: Event) {
        event.stopPropagation();
        this.apiService.deletePhoto(id).subscribe((data) => {
            const newData = this.dataSource.data.filter((item) => item.id !== id);
            // this.update(newData)
        })
    }

    gotoAdd() {
        this.router.navigate(['item/add']);
    }

    edit(id:number, $event: MouseEvent) {
        $event.stopPropagation();
        this.router.navigate(['item/edit', id]);


    }
}
