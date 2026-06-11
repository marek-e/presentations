declare module 'virtual:decks' {
  export interface DeckMeta {
    slug: string
    title: string
    subtitle?: string
    description?: string
    date?: string
    tags?: string[]
    accent?: string
    emoji?: string
  }
  export const decks: DeckMeta[]
}
