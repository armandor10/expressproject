import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path: 'client', component: ClientComponent},
  {path: 'product', component: ProductComponent},
  {path: 'order', component: OrderComponent},
  {path: '', pathMatch:'full', redirectTo:'client'},
  {path: '**',  pathMatch:'full', redirectTo:'client'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
