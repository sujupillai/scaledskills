import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWorkshopComponent } from './home-workshop.component';

describe('HomeWorkshopComponent', () => {
  let component: HomeWorkshopComponent;
  let fixture: ComponentFixture<HomeWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
