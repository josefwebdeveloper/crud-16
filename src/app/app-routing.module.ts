import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'heroes' } },
  { path: 'item', loadChildren: () => import('./featured/item/item.module').then(m => m.ItemModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
