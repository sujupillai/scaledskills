import { TestBed } from '@angular/core/testing';

import { TitleServiceService } from './title-service.service';

describe('TitleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleServiceService = TestBed.get(TitleServiceService);
    expect(service).toBeTruthy();
  });
});
