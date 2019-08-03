import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLocationComponent } from './training-location.component';

describe('TrainingLocationComponent', () => {
  let component: TrainingLocationComponent;
  let fixture: ComponentFixture<TrainingLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
