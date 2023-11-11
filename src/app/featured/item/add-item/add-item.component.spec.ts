import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import {of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../services/data.service";
import {ApiService} from "../../../services/api.service";
import {FormBuilder} from "@angular/forms";

class Item {
}

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let mockFormBuilder: any,mockRouter: any, mockDataService, mockApiService;

  beforeEach(() => {
    mockDataService = { dataItems: of([]) };
    mockApiService = { addPhoto: () => of(new Item()) };
    TestBed.configureTestingModule({
      declarations: [AddItemComponent],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: Router, useValue: mockRouter },
        { provide: DataService, useValue: mockDataService },
        { provide: ApiService, useValue: mockApiService }
      ]
    });
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
