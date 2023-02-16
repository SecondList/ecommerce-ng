import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<{ authState: AuthState }>) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    const payload = {
      email: this.loginForm?.value.email,
      password: this.loginForm?.value.password
    };

    this.store.dispatch(login(payload));
  }
}
