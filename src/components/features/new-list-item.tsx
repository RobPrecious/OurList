"use client"

import { FormEvent } from "react"

export default function NewListItem({ list_id }: { list_id: string }) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { content, list_id } = Object.fromEntries(
      new FormData(e.currentTarget)
    )

    await fetch("/api/list_item", {
      method: "post",
      body: JSON.stringify({ content, list_id }),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-slate-50 rounded"
    >
      <h3 className="font-bold">Create item</h3>
      <input type="hidden" name="list_id" value={list_id} />
      <label className="font-semibold text-sm flex flex-col gap-2">
        Item
        <input
          type="text"
          className="text-sm px-2 py-1 border border-slate-300 rounded"
          name="content"
        />
      </label>

      <button
        type="submit"
        className="p-4 bg-green-100 rounded hover:bg-green-300"
      >
        Add
      </button>
    </form>
  )
}
