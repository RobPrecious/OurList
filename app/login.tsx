"use client"

import { Auth } from "@supabase/auth-ui-react"
import { useSupabase } from "./supabase-provider"
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared"

export default function Login() {
  const { supabase } = useSupabase()

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/"
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
    return url
  }

  return (
    <div className="bg-slate-800 text-white mx-auto w-[400px] rounded-xl p-8 shadow">
      <h2 className="font-bold text-xl">Login</h2>
      <Auth
        supabaseClient={supabase}
        redirectTo={getURL()}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        dark={true}
      />
    </div>
  )
}
