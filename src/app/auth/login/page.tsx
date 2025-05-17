'use client';
import supabaseClient  from "../../../../utils/supabase/client";

export default async function signInUser() {
     const supabase = supabaseClient;
const { data, error } = await supabase.auth.signInWithPassword({
  email: '',
  password: '',
})
if(error) {
  console.log("Error signing in with email: ", error);  
} else {
  console.log("User signed in with email: ", data);
}

return (
    <div>
        <h1>Sign In</h1>
        <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
        </form>
    </div>
)
}