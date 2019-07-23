import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAccountComponent } from './trainer-account.component';

describe('TrainerAccountComponent', () => {
  let component: TrainerAccountComponent;
  let fixture: ComponentFixture<TrainerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
