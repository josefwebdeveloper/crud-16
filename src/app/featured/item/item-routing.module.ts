import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ItemComponent} from "./item/item.component";
import {AddItemComponent} from "./add-item/add-item.component";
import {EditComponent} from "./edit/edit.component";
import {ItemLayoutComponent} from "./item-layout/item-layout.component";


let routes: Routes = [
    {
        path: '', component: ItemLayoutComponent,
        children: [
            {path: 'add', component: AddItemComponent},
            {path: 'edit/:id', component: EditComponent},
            {path: ':id', component: ItemComponent},
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ItemRoutingModule {
}
