import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userLoginGuardGuard } from './user-login-guard.guard';

describe('userLoginGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLoginGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
