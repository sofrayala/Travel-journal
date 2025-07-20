import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth.service';

describe('AuthService', () => {
  let service: AuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a signOut method', () => {
    expect(typeof service.signOut).toBe('function');
  });

  it('should have a session method', () => {
    expect(typeof service.session).toBe('function');
  });
});
