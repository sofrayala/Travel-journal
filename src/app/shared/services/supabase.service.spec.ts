import { TestBed } from '@angular/core/testing';

import { SupabaseService } from './supabase.service';
import { environment } from '../../../environments/environment.development';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseService);
  });

  it('should initialize supabaseClient with correct URL and key', () => {
    expect(service.supabaseClient).toBeTruthy();
    expect(service.supabaseClient.constructor.name).toBe('SupabaseClient');
  });
});
