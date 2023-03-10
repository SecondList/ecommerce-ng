import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response';
import { Cart } from 'src/app/models/cart';
import { checkout } from 'src/app/state/checkout/checkout.actions';
import { retrieveCheckoutBaseResponse, retrieveCheckoutError } from 'src/app/state/checkout/checkout.selector';
import { CheckoutState } from 'src/app/state/checkout/checkout.state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm!: FormGroup;
  checkoutError$: Observable<string> = this.store.pipe(select(retrieveCheckoutError));
  checkout$: Observable<BaseResponse> = this.store.pipe(select(retrieveCheckoutBaseResponse));
  charMax1: number = 160;
  charMax2: number = 100;
  charMax3: number = 50;
  charMax4: number = 16;
  checkOutCart!: Cart[];

  constructor(private fb: FormBuilder, private store: Store<{ checkoutState: CheckoutState }>) { }

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(this.charMax1)]],
      lastName: ['', [Validators.required, Validators.maxLength(this.charMax1)]],
      receiptEmail: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(this.charMax2)]],
      city: ['', [Validators.required, Validators.maxLength(this.charMax3)]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.maxLength(this.charMax4)]],
      country: ['Malaysia', [Validators.required]],
      carrier: ['POS Laju', [Validators.required]],
      cardNumber: ['', [Validators.required, this.creditCardValidator]],
      cardName: ['', [Validators.required, Validators.maxLength(this.charMax1)]],
      expiryMonth: ['', [Validators.required, Validators.pattern('^(1[0-2])|([1-9])$')]],
      expiryYear: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });

    // this.checkoutForm = this.fb.group({
    //   firstName: ['SK'],
    //   lastName: ['Low'],
    //   receiptEmail: ['sklow34@example.com'],
    //   address: ['ABC'],
    //   city: ['DEF'],
    //   state: ['Kuala Lumpur'],
    //   postalCode: ['68000'],
    //   country: ['Malaysia', [Validators.required]],
    //   carrier: ['POS Laju', [Validators.required]],
    //   cardNumber: ['42'],
    //   cardName: ['VISA TEST VARD'],
    //   expiryMonth: ['1'],
    //   expiryYear: ['2'],
    //   cvc: ['343'],
    // });
  }

  onSubmit() {
    const payload = {
      productIds: this.checkOutCart.map(cart => cart.productId),
      firstName: this.checkoutForm?.value.firstName,
      lastName: this.checkoutForm?.value.lastName,
      receiptEmail: this.checkoutForm?.value.receiptEmail,
      address1: this.checkoutForm?.value.address,
      city: this.checkoutForm?.value.city,
      state: this.checkoutForm?.value.state,
      postalCode: this.checkoutForm?.value.postalCode,
      country: this.checkoutForm?.value.country,
      carrier: this.checkoutForm?.value.carrier,
      card: {
        cardNumber: this.checkoutForm?.value.cardNumber,
        cardName: this.checkoutForm?.value.cardName,
        expMonth: this.checkoutForm?.value.expiryMonth,
        expYear: this.checkoutForm?.value.expiryYear,
        cvc: this.checkoutForm?.value.cvc
      }
    };

    this.store.dispatch(checkout(payload));
  }

  creditCardValidator(control: AbstractControl): ValidationErrors | null {
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexRegEx = /^(?:3[47][0-9]{13})$/;
    const discoverRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    const value = control.value;

    if (value === null || value === '') {
      return null;
    }

    if (visaRegEx.test(value) ||
      mastercardRegEx.test(value) ||
      amexRegEx.test(value) ||
      discoverRegEx.test(value)) {
      return null;
    } else {
      return { 'invalidCardNumber': true };
    }
  }

  onCart(carts: Cart[]) {
    this.checkOutCart = carts;
  }
}
