import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../shared/models/items.model";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getPhotos(): Observable<Item[]> {
        return this.http.get<Item[]>(environment.api);
    }

    getPhoto(id: number | null): Observable<Item> {
        return this.http.get<Item>(`${environment.api}/${id}`);
    }

    deletePhoto(id: number | null): Observable<Item> {
        return this.http.delete<Item>(`${environment.api}/${id}`);
    }
    addPhoto(data:Item): Observable<Item> {
        return this.http.post<Item>(`${environment.api}`,data);
    }
    updatePhoto(id:number | null,data:Item): Observable<Item> {
        return this.http.put<Item>(`${environment.api}/${id}`,data);
    }

}
