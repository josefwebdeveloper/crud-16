import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemRoutingModule} from "./item-routing.module";
import { ItemComponent } from './item/item.component';
import {MaterialModule} from "../../shared/material/material.module";
import { AddItemComponent } from './add-item/add-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UpdateComponent } from './update/update.component';



@NgModule({
  declarations: [
    ItemComponent,
    AddItemComponent,
    UpdateComponent,
  ],
    imports: [
        CommonModule,
        ItemRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ItemModule { }
