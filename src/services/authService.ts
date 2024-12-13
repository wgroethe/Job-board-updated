import { supabase } from '../lib/supabase';

export async function signUp(email: string, password: string, userData: any) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });

  if (authError) throw authError;

  // Create profile record
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        user_id: authData.user.id,
        email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role,
        company: userData.company,
      }]);

    if (profileError) throw profileError;
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}