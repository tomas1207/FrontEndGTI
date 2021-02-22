import { TestBed } from '@angular/core/testing';

import { NormalEndpointService } from './normal-endpoint.service';

describe('NormalEndpointService', () => {
  let service: NormalEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
