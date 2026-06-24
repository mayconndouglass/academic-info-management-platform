export type Document = {
  id: string // hash MD5 — diferente do Post que era number
  title: string
  url: string // link direto para o arquivo PDF/DOC
  type: string // "pdf", "doc", "docx"
  date: string | null
  slug: string
  pageOrigin: string // URL da página onde o documento foi encontrado
  category: string // string legível — diferente do Post que usava number[]
}
