import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderQuantityComponent } from './update-order-quantity.component';

describe('UpdateOrderQuantityComponent', () => {
  let component: UpdateOrderQuantityComponent;
  let fixture: ComponentFixture<UpdateOrderQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrderQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
