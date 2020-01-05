import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTempComponent } from './review-temp.component';

describe('ReviewTempComponent', () => {
  let component: ReviewTempComponent;
  let fixture: ComponentFixture<ReviewTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
