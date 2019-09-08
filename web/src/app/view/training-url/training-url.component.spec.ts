import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingUrlComponent } from './training-url.component';

describe('TrainingUrlComponent', () => {
  let component: TrainingUrlComponent;
  let fixture: ComponentFixture<TrainingUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
