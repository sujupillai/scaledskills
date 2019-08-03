import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTagsComponent } from './training-tags.component';

describe('TrainingTagsComponent', () => {
  let component: TrainingTagsComponent;
  let fixture: ComponentFixture<TrainingTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
