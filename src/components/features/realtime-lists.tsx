"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "../../../app/supabase-provider"

import type { Database } from "@/lib/database.types"
import Link from "next/link"
import NewList from "./new-list"

type Post = Database["public"]["Tables"]["lists"]["Row"]

export default function RealtimeLists({
  serverLists,
}: {
  serverLists: Post[]
}) {
  const [lists, setLists] = useState(serverLists)
  const { supabase } = useSupabase()

  useEffect(() => {
    setLists(serverLists)
  }, [serverLists])

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lists" },
        (payload) => setLists((lists) => [...lists, payload.new as Post])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setLists, lists])

  return (
    <ul className="flex gap-4 flex-wrap">
      <li className="rounded shadow border border-slate-100 flex-1">
        <NewList />
      </li>
      {lists.map((list) => (
        <li
          key={list.id}
          className="rounded shadow border border-slate-100 flex-1"
        >
          <Link
            href={`/lists/${list.id}`}
            className="p-4 flex flex-col gap-2 hover:bg-slate-50 h-full"
          >
            <h3 className="font-bold">{list.name}</h3>
            <p>{list.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
