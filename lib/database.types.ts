export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      list_item: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          list_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          list_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          list_id?: string | null
        }
      }
      lists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          ordered: boolean
          ownerId: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          ordered?: boolean
          ownerId: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          ordered?: boolean
          ownerId?: string
        }
      }
      posts: {
        Row: {
          content: string | null
          created_at: string
          id: string
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          title?: string
        }
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
