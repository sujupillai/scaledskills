import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPromotionsComponent } from './training-promotions.component';

describe('TrainingPromotionsComponent', () => {
  let component: TrainingPromotionsComponent;
  let fixture: ComponentFixture<TrainingPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
