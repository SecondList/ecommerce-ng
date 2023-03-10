import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { login } from 'src/app/state/auth/auth.actions';
import { retrieveAuthError, retrieveToken } from 'src/app/state/auth/auth.selector';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  authError$: Observable<string> = this.store.pipe(select(retrieveAuthError));
  token$: Observable<string> = this.store.pipe(select(retrieveToken));

  constructor(private fb: FormBuilder, private store: Store<{ authState: AuthState }>, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.token$.pipe(filter(token => !!token)).subscribe(() => {
      // Check if the returnUrl query param is available
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];

      if (returnUrl) {
        // Redirect the user back to the previous page
        this.router.navigateByUrl(returnUrl);
      } else {
        // Redirect the user to the default page
        this.router.navigate(['']);
      }
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
