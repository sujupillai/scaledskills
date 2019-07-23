import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFullComponent } from './header-full.component';

describe('HeaderFullComponent', () => {
  let component: HeaderFullComponent;
  let fixture: ComponentFixture<HeaderFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
