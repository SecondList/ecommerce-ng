import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToRegisterComponent } from './go-to-register.component';

describe('GoToRegisterComponent', () => {
  let component: GoToRegisterComponent;
  let fixture: ComponentFixture<GoToRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoToRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoToRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
