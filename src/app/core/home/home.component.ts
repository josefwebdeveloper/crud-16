import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {Item} from "../../shared/models/items.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data.service";

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
        private dataService: DataService
    ) {
    }

    ngOnInit(): void {
        this.getPhotos()
    }

    getPhotos() {
        this.apiService.getPhotos().subscribe((data) => {
            if (data) {
             this.update(data)
            }
        })
    }
    update(data:Item[]){
        this.dataService.updateData(data);
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
            this.update(newData)
        })
    }
}
