import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerUrlComponent } from './trainer-url.component';

describe('TrainerUrlComponent', () => {
  let component: TrainerUrlComponent;
  let fixture: ComponentFixture<TrainerUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
