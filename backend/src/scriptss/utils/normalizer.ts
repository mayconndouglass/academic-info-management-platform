import crypto from "node:crypto"

export interface Document {
  id: string
  title: string
  url: string
  type: string
  date: string | null
  slug: string
  pageOrigin: string
  category: string
}

// Decodifica entidades HTML comuns que vêm da API do WordPress
// Ex: "&#8211;" → "–", "&amp;" → "&"
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

// Extrai o tipo do documento pela URL ou mime type
function extractType(urlOrMime: string): string {
  const lower = urlOrMime.toLowerCase()
  if (lower.includes("pdf")) return "pdf"
  if (lower.includes("msword") || lower.endsWith(".doc")) return "doc"
  if (lower.includes("wordprocessingml") || lower.endsWith(".docx")) return "docx"
  return "outro"
}

// Extrai o slug a partir da URL do arquivo
// Ex: "https://uespi.br/docs/resolucao-001-2024.pdf" → "resolucao-001-2024"
function extractSlug(url: string): string {
  try {
    const pathname = new URL(url).pathname
    const filename = pathname.split("/").pop() ?? ""
    return filename.replace(/\.[^/.]+$/, "") // remove a extensão
  } catch {
    return ""
  }
}

// Gera um ID único e estável baseado na URL do documento
// Assim o mesmo documento vindo de fontes diferentes sempre terá o mesmo ID
function generateId(url: string): string {
  return crypto.createHash("md5").update(url).digest("hex")
}

export function normalize(raw: {
  title?: string | null
  url: string
  mimeType?: string | null
  date?: string | null
  pageOrigin?: string | null
}): Document {
  const url = raw.url.trim()

  return {
    id: generateId(url),
    title: raw.title?.trim() ? decodeHtmlEntities(raw.title.trim()) : (extractSlug(url) || "Sem título"),
    url,
    type: extractType(raw.mimeType || url),
    date: raw.date ?? null,
    slug: extractSlug(url),
    pageOrigin: raw.pageOrigin?.trim() ?? "",
    category: "" // será preenchido pelo categorize.ts
  }
}
