"use client"

import { FormEvent } from "react"

export default function NewList() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, description } = Object.fromEntries(
      new FormData(e.currentTarget)
    )

    try {
      const response = await fetch("/api/lists", {
        method: "post",
        body: JSON.stringify({ name, description }),
      })
      console.log(response.statusText)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-slate-50 rounded"
    >
      <h3 className="font-bold">Create new list</h3>
      <label className="font-semibold text-sm flex flex-col gap-2">
        Name
        <input
          type="text"
          className="text-sm px-2 py-1 border border-slate-300 rounded"
          name="name"
        />
      </label>
      <label className="font-semibold text-sm flex flex-col gap-2">
        Description
        <input
          type="text"
          className="text-sm px-2 py-1 border border-slate-300 rounded"
          name="description"
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
