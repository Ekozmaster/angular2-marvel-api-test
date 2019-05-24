import { TestBed } from '@angular/core/testing';

import { CharactersRequesterService } from './characters-requester.service';

describe('CharactersRequesterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharactersRequesterService = TestBed.get(CharactersRequesterService);
    expect(service).toBeTruthy();
  });
});
