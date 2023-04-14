"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs"
import { useRouter, usePathname } from "next/navigation"

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: SupabaseSession
}

type SupabaseSession = Session | null

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [session, setSession] = useState<SupabaseSession>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async () => {
      const session = (await supabase.auth.getSession()).data.session
      setSession(session)
      if (session) {
        router.push(pathname)
      } else {
        router.push("/")
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [pathname, router, supabase])

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }

  return context
}
