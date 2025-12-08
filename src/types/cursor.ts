export interface CursorPaginated<Item> {
  data: Item[]
  links: PaginationLinks
  meta: PaginationMeta
}

export interface PaginationLinks {
  first?: string | null
  last?: string | null
  prev?: string | null
  next?: string | null
}

export interface PaginationMeta {
  path: string
  per_page: number
  next_cursor?: string | null
  prev_cursor?: string | null
}
