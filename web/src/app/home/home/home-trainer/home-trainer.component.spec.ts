import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrainerComponent } from './home-trainer.component';

describe('HomeTrainerComponent', () => {
  let component: HomeTrainerComponent;
  let fixture: ComponentFixture<HomeTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
