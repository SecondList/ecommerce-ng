import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutSuccessfulComponent } from './components/checkout-successful/checkout-successful.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:categoryId', component: ProductListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/success/:orderId', component: CheckoutSuccessfulComponent },
  { path: 'orders', component: OrderListComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }