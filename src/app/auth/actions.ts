import supabaseClient  from "../../../utils/supabase/client";

export async function LoginWithEmail (email: string, password: string) {
   
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })  

   if (error) {
    console.log('Email login failed', error.message)
    throw error
   }
   return data.user

   
    }

