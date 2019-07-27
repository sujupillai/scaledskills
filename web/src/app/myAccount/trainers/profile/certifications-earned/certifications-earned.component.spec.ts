import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsEarnedComponent } from './certifications-earned.component';

describe('CertificationsEarnedComponent', () => {
  let component: CertificationsEarnedComponent;
  let fixture: ComponentFixture<CertificationsEarnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationsEarnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationsEarnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
