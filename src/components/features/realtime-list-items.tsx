"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "../../../app/supabase-provider"
import type { Database } from "@/lib/database.types"
import NewListItem from "./new-list-item"

export type ListItem = Database["public"]["Tables"]["list_item"]["Row"]

export default function RealtimeListItems({
  list_id,
  serverListItems,
}: {
  serverListItems: ListItem[]
  list_id: string
}) {
  const [list_items, setListItems] = useState(serverListItems)
  const { supabase } = useSupabase()

  useEffect(() => {
    setListItems(serverListItems)
  }, [serverListItems])

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "list_item",
          filter: `list_id=eq.${list_id}`,
        },
        (payload) =>
          setListItems((list_items) => [...list_items, payload.new as ListItem])
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "list_item",
          filter: `list_id=eq.${list_id}`,
        },
        (payload) => {
          setListItems((list_items) => {
            return [...list_items.filter((item) => item.id !== payload.old.id)]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setListItems, list_items, list_id])

  return (
    <ul className="flex gap-4 flex-wrap">
      <li className="rounded shadow border border-slate-100 flex-1">
        <NewListItem list_id={list_id} />
      </li>
      {list_items.map((item) => (
        <li
          key={item.id}
          className="rounded shadow border border-slate-100 flex-1"
        >
          <div className="p-4 flex flex-col gap-2 hover:bg-slate-50 h-full">
            <p>{item.content}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
