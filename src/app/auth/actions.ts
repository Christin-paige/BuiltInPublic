import supabaseClient  from "../../../utils/supabase/client";//once bugs are fixed, if code is breaking, it may be due to importing client, not server



export default async function loginWithEmail (email: string, password: string) {
   
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })  

   if (error) throw error
   return data

   
    }

