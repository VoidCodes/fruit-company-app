import { TestBed } from '@angular/core/testing';

import { FruitCartService } from './fruit-cart.service';

describe('FruitCartService', () => {
  let service: FruitCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruitCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
