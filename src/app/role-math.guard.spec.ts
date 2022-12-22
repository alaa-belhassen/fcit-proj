import { TestBed } from '@angular/core/testing';

import { RoleMathGuard } from './role-math.guard';

describe('RoleMathGuard', () => {
  let guard: RoleMathGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleMathGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
