import { supabase } from "~/utils/supabaseClient";

export const useAuthSignIn = () => {
  const user = ref(null);
  const error = ref(null);

  const signIn = async (email, password) => {
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );
      if (error) {
        error.value = authError.message;
        throw error;
      } else {
        user.value = data.user;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    user,
    signIn,
    error,
  };
};
