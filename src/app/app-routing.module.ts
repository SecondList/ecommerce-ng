import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutSuccessfulComponent } from './components/checkout-successful/checkout-successful.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UnauthGuardService } from './services/unauth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent, canActivate: [UnauthGuardService] },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:categoryId', component: ProductListComponent },
  { path: 'register', component: RegisterComponent, canActivate: [UnauthGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  { path: 'checkout/success/:orderId', component: CheckoutSuccessfulComponent, canActivate: [AuthGuardService] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotfoundComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }