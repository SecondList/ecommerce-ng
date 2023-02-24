import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-checkout-successful',
  templateUrl: './checkout-successful.component.html',
  styleUrls: ['./checkout-successful.component.css']
})
export class CheckoutSuccessfulComponent {
  orderId!: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('orderId')!;
  }
}
