import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-to-login',
  templateUrl: './go-to-login.component.html',
  styleUrls: ['./go-to-login.component.css']
})
export class GoToLoginComponent {
  getCurrentUrl(): string {
    return this.router.url;
  }

  constructor(private router: Router) { }
}
