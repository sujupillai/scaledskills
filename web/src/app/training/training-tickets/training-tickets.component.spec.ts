import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTicketsComponent } from './training-tickets.component';

describe('TrainingTicketsComponent', () => {
  let component: TrainingTicketsComponent;
  let fixture: ComponentFixture<TrainingTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
