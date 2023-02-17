import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { register } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  authError$: Observable<string> = this.store.pipe(
    select((state) => state.authState.error)
  );
  registered$: Observable<boolean> = this.store.pipe(
    select((state) => state.authState.registered)
  );

  constructor(private fb: FormBuilder, private store: Store<{ authState: AuthState }>) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.matchPassword
    });
  }

  onSubmit() {
    const payload = {
      email: this.registrationForm?.value.email,
      password: this.registrationForm?.value.password,
      confirmPassword: this.registrationForm?.value.confirmPassword
    };

    this.store.dispatch(register(payload));
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return { 'passwordMismatch': true };
    }

    if (password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}
