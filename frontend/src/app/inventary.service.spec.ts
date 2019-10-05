import { TestBed } from '@angular/core/testing';

import { InventaryService } from './inventary.service';

describe('InventaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventaryService = TestBed.get(InventaryService);
    expect(service).toBeTruthy();
  });
});
