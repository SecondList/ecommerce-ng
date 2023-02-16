import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddCartButtonComponent } from './components/add-cart-button/add-cart-button.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { productReducer } from './state/products/products.reducer';
import { authReducer } from './state/auth/auth.reducer';
import { ProductEffects } from './state/products/products.effect';
import { AuthEffect } from './state/auth/auth.effect';
import { GoToLoginComponent } from './components/go-to-login/go-to-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddCartButtonComponent,
    ToolbarComponent,
    LoginFormComponent,
    GoToLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ productState: productReducer, authState: authReducer }),
    EffectsModule.forRoot([ProductEffects, AuthEffect, ]),
    StoreDevtoolsModule.instrument({ name: 'NgRx Store Ecommerce App', maxAge: 25, logOnly: !isDevMode() }),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
