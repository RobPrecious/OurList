"use client"

import { Auth } from "@supabase/auth-ui-react"
import { useSupabase } from "./supabase-provider"
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared"

export default function Login() {
  const { supabase } = useSupabase()

  return (
    <div className="bg-slate-800 text-white mx-auto w-[400px] rounded-xl p-8 shadow">
      <h2 className="font-bold text-xl">Login</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        dark={true}
      />
    </div>
  )
}
