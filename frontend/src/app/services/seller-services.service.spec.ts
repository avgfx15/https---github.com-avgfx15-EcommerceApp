import { TestBed } from '@angular/core/testing';

import { SellerServicesService } from './seller-services.service';

describe('SellerServicesService', () => {
  let service: SellerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
