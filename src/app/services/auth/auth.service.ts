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
  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() {
    this._supabaseClient.auth.onAuthStateChange((session) => {
      console.log(session);
    });
  }

  session() {
    return this._supabaseClient.auth.getSession();
  }

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignInWithPasswordCredentials) {
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }
}
