import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"

import type { Database } from "@/lib/database.types"
import Login from "./login"
import NewList from "../src/components/features/new-list"
import RealtimeLists from "../src/components/features/realtime-lists"

// do not cache this page
export const revalidate = 0

export default async function ServerComponent() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data } = await supabase.from("lists").select("*")
  const { data: session } = await supabase.auth.getSession()

  if (session.session) {
    return (
      <div className="p-8">
        <RealtimeLists serverLists={data ?? []} />
      </div>
    )
  } else {
    return <Login />
  }
}
