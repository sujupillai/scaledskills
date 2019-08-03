import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingImageComponent } from './training-image.component';

describe('TrainingImageComponent', () => {
  let component: TrainingImageComponent;
  let fixture: ComponentFixture<TrainingImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
