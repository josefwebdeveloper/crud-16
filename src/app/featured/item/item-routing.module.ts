import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {ItemComponent} from "./item/item.component";


let routes:Routes = [
  {path: ':id', component: ItemComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
