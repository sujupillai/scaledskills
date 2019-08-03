import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPromotiionnsComponent } from './training-promotiionns.component';

describe('TrainingPromotiionnsComponent', () => {
  let component: TrainingPromotiionnsComponent;
  let fixture: ComponentFixture<TrainingPromotiionnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPromotiionnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPromotiionnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
