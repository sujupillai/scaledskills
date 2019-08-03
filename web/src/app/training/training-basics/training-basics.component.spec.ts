import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingBasicsComponent } from './training-basics.component';

describe('TrainingBasicsComponent', () => {
  let component: TrainingBasicsComponent;
  let fixture: ComponentFixture<TrainingBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
