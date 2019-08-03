import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFinalComponent } from './training-final.component';

describe('TrainingFinalComponent', () => {
  let component: TrainingFinalComponent;
  let fixture: ComponentFixture<TrainingFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
