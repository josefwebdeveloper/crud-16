import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemRoutingModule} from "./item-routing.module";
import { ItemComponent } from './item/item.component';
import {MaterialModule} from "../../shared/material/material.module";
import { AddItemComponent } from './add-item/add-item.component';
import { EditComponent } from './edit/edit.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ItemComponent,
    AddItemComponent,
    EditComponent,
  ],
    imports: [
        CommonModule,
        ItemRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ItemModule { }
