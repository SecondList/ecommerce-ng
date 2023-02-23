import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/base-response';
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

  constructor(private fb: FormBuilder, private store: Store<{ checkoutState: CheckoutState }>) { }

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax1)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax1)])],
      receiptEmail: ['', [Validators.email]],
      address: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax2)])],
      city: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax3)])],
      state: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax3)])],
      postalCode: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax4)])],
      country: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax1)])],
      carrier: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax3)])],
      cardNumber: ['', Validators.compose([Validators.required, this.creditCardValidator])],
      cardName: ['', Validators.compose([Validators.required, Validators.maxLength(this.charMax1)])],
      expiryMonth: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(12)])],
      expiryYear: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(99)])],
      cvc: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{3,4}$')])],
    });
  }

  onSubmit() {
    const payload = {
      firstName: this.checkoutForm?.value.firstName,
      lastName: this.checkoutForm?.value.lastName,
      receiptEmail: this.checkoutForm?.value.receiptEmail,
      address: this.checkoutForm?.value.address,
      city: this.checkoutForm?.value.city,
      state: this.checkoutForm?.value.state,
      postalCode: this.checkoutForm?.value.postalCode,
      country: this.checkoutForm?.value.country,
      carrier: this.checkoutForm?.value.carrier,
      cardNumber: this.checkoutForm?.value.cardNumber,
      cardName: this.checkoutForm?.value.cardName,
      expiryMonth: this.checkoutForm?.value.expiryMonth,
      expiryYear: this.checkoutForm?.value.expiryYear,
      cvc: this.checkoutForm?.value.cvc,
    };

    console.log(payload);
    // this.store.dispatch(register(payload));
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
}
