import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() {
    this.supabaseClient.auth.onAuthStateChange((session) => {
      console.log(session);
    });
  }

  session() {
    return this.supabaseClient.auth.getSession();
  }

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this.supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignInWithPasswordCredentials) {
    return this.supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this.supabaseClient.auth.signOut();
  }
}
