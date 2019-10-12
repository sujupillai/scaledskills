import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTplComponent } from './training-tpl.component';

describe('TrainingTplComponent', () => {
  let component: TrainingTplComponent;
  let fixture: ComponentFixture<TrainingTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
