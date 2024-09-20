import { useClient } from "./useClient";

export const useAuthSignIn = () => {
  const user = ref(null);
  const error = ref(null);

  const { supabase } = useClient();
  const signIn = async (email, password) => {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      error.value = authError.message;
      throw error;
    } else {
      user.value = data.user;
    }
  };
  return {
    user,
    signIn,
    error,
  };
};
