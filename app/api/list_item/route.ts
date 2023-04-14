import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { headers, cookies } from "next/headers"

import type { Database } from "@/lib/database.types"

export async function POST(request: Request) {
  const { content, list_id } = await request.json()

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: session } = await supabase.auth.getSession()
  if (session.session?.user.id) {
    const { data, error } = await supabase.from("list_item").insert({ content, list_id, created_by: session.session?.user.id }).select()
    return NextResponse.json(data)

  }
  return NextResponse.json({ message: 'Failed' })

}

export async function PUT(request: Request) {
  const { id, content } = await request.json()

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data } = await supabase
    .from("list_item")
    .update({ content })
    .match({ id })
    .select()

  return NextResponse.json(data)
}