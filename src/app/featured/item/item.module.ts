import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemRoutingModule} from "./item-routing.module";
import { ItemComponent } from './item/item.component';
import {MaterialModule} from "../../shared/material/material.module";



@NgModule({
  declarations: [
    ItemComponent,
  ],
    imports: [
        CommonModule,
        ItemRoutingModule,
        MaterialModule
    ]
})
export class ItemModule { }
