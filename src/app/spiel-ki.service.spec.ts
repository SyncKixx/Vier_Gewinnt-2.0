import { TestBed } from '@angular/core/testing';

import { SpielKiService } from './spiel-ki.service';

describe('SpielKiService', () => {
  let service: SpielKiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpielKiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
