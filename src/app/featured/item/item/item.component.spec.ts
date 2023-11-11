import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../services/data.service";
import {ApiService} from "../../../services/api.service";
import {MatCardModule} from "@angular/material/card";

class Item {
}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let mockActivatedRoute, mockDataService, mockApiService;

  beforeEach(() => {
    mockActivatedRoute = {
      paramMap: of({ get: (key: string) => key === 'id' ? '123' : null })
    };
    mockDataService = { dataItems: of([]) };
    mockApiService = { getPhoto: () => of(new Item()) };
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [
        MatCardModule

      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DataService, useValue: mockDataService },
        { provide: ApiService, useValue: mockApiService }
      ]
    });
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
