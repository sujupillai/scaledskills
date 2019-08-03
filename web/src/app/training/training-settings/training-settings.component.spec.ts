import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSettingsComponent } from './training-settings.component';

describe('TrainingSettingsComponent', () => {
  let component: TrainingSettingsComponent;
  let fixture: ComponentFixture<TrainingSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
