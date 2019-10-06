import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConfirmComponent } from './login-confirm.component';

describe('LoginConfirmComponent', () => {
  let component: LoginConfirmComponent;
  let fixture: ComponentFixture<LoginConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
