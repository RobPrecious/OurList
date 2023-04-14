import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"

import type { Database } from "@/lib/database.types"
import NewListItem from "@/src/components/features/new-list-item"
import RealtimeListItems, {
  ListItem,
} from "@/src/components/features/realtime-list-items"

// do not cache this page
export const revalidate = 0

export default async function List({
  params,
}: {
  params: { list_id: string }
}) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: listResults } = await supabase
    .from("lists")
    .select("*")
    .eq("id", params.list_id)
  const { data: listItems } = await supabase
    .from("list_item")
    .select("*")
    .eq("list_id", params.list_id)

  if (listResults?.[0]) {
    const list = listResults[0]
    return (
      <div className="p-8">
        <h2>{list.name}</h2>
        <p>{list.description}</p>
        <RealtimeListItems
          list_id={list.id}
          serverListItems={listItems as ListItem[]}
        />
      </div>
    )
  } else {
    return null
  }
}
