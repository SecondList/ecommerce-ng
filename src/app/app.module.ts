import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddCartButtonComponent } from './components/add-cart-button/add-cart-button.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { spinnerReducer } from './state/loading-spinner/loading-spinner.reducer';
import { ProductEffect } from './state/products/products.effect';
import { productReducer } from './state/products/products.reducer';
import { AuthEffect } from './state/auth/auth.effect';
import { authReducer } from './state/auth/auth.reducer';
import { ProductCategoryEffect } from './state/product-category/product-category.effect';
import { productCategoryReducer } from './state/product-category/product-category.reducer';
import { CartEffect } from './state/cart/cart.effect';
import { cartReducer } from './state/cart/cart.reducer';
import { checkoutReducer } from './state/checkout/checkout.reducer';
import { CheckoutEffect } from './state/checkout/checkout.effect';
import { GoToLoginComponent } from './components/go-to-login/go-to-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { GoToRegisterComponent } from './components/go-to-register/go-to-register.component';
import { CartComponent } from './components/cart/cart.component';
import { DeleteFromCartComponent } from './components/delete-from-cart/delete-from-cart.component';
import { UpdateOrderQuantityComponent } from './components/update-order-quantity/update-order-quantity.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ClearCartComponent } from './components/clear-cart/clear-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutCartComponent } from './components/checkout-cart/checkout-cart.component';
import { CheckoutSuccessfulComponent } from './components/checkout-successful/checkout-successful.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderComponent } from './components/order/order.component';
import { orderReducer } from './state/order/order.reducer';
import { OrderEffect } from './state/order/order.effect';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { jwtHelperFactory } from './services/jwt-helper.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddCartButtonComponent,
    ToolbarComponent,
    LoginFormComponent,
    GoToLoginComponent,
    RegisterComponent,
    GoToRegisterComponent,
    CartComponent,
    DeleteFromCartComponent,
    UpdateOrderQuantityComponent,
    ClearCartComponent,
    CheckoutComponent,
    CheckoutCartComponent,
    CheckoutSuccessfulComponent,
    OrderListComponent,
    OrderComponent,
    NotfoundComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ productState: productReducer, authState: authReducer, spinnerState: spinnerReducer, productCategoryState: productCategoryReducer, cartState: cartReducer, checkoutState: checkoutReducer, orderState: orderReducer }),
    EffectsModule.forRoot([ProductEffect, AuthEffect, ProductCategoryEffect, CartEffect, CheckoutEffect, OrderEffect]),
    StoreDevtoolsModule.instrument({ name: 'NgRx Store Ecommerce App', maxAge: 25, logOnly: !isDevMode() }),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: JwtHelperService, useFactory: jwtHelperFactory }, // add JwtHelperService provider
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
