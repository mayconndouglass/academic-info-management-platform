import https from "node:https"

import axios from "axios"
import * as cheerio from "cheerio"

import { Document, normalize } from "../utils/normalizer"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

const BASE_URL = "https://uespi.br"

const ALLOWED_DOMAINS = [
  "uespi.br",
]

// URLs ou padrões que o crawler NÃO deve entrar nem seguir filhos
const BLOCKED_PATTERNS = [
  "editora.uespi.br/index.php/editora",
  "uespi.br/eventos",
  "uespi.br/editais",
  "uespi.br/uespi",
  "sistemas2.uespi.br",
  "uespi.br/category/",
  "uespi.br/author/",
  "uespi.br/tag/",
]

// Extensões que indicam um documento
const DOCUMENT_EXTENSIONS = [".pdf", ".doc", ".docx"]

// Delay entre requisições para não sobrecarregar o servidor da instituição
const DELAY_MS = 500

const visited = new Set<string>()
const foundDocs: Document[] = []

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Verifica se a URL pertence a um dos domínios permitidos
// function isAllowedDomain(url: string): boolean {
//   try {
//     const hostname = new URL(url).hostname
//     return ALLOWED_DOMAINS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))
//   } catch {
//     return false
//   }
// }

function isAllowedDomain(url: string): boolean {
  try {
    const hostname = new URL(url).hostname
    return ALLOWED_DOMAINS.includes(hostname)
  } catch {
    return false
  }
}

// Verifica se a URL bate com algum padrão bloqueado
function isBlocked(url: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => url.includes(pattern))
}

// Verifica se a URL é um documento
function isDocument(url: string): boolean {
  const lower = url.toLowerCase().split("?")[0] // ignora query string
  return DOCUMENT_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

// Normaliza uma URL relativa para absoluta e remove fragments (#)
function resolveUrl(href: string, baseUrl: string): string | null {
  try {
    const resolved = new URL(href, baseUrl)
    resolved.hash = "" // remove #section
    return resolved.toString()
  } catch {
    return null
  }
}

// Visita uma página, captura documentos e retorna links internos para visitar
async function crawlPage(url: string): Promise<string[]> {
  if (visited.has(url)) return []
  visited.add(url)

  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        // Simula um navegador comum para evitar bloqueios
        "User-Agent": "Mozilla/5.0 (compatible; TCC-Crawler/1.0)",
      },
      httpsAgent,
    })

    const $ = cheerio.load(response.data)
    const internalLinks: string[] = []

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href")
      if (!href) return

      const resolved = resolveUrl(href, url)
      if (!resolved) return

      // Ignora domínios externos e URLs bloqueadas
      if (!isAllowedDomain(resolved)) return
      if (isBlocked(resolved)) return

      if (isDocument(resolved)) {
        // É um documento — captura ele
        if (!foundDocs.find((d) => d.url === resolved)) {
          const title = $(el).text().trim() || null
          foundDocs.push(normalize({
            title,
            url: resolved,
            mimeType: null, // será inferido pela extensão no normalizer
            date: null,
            pageOrigin: url,
          }))
        }
      } else {
        // É uma página interna — adiciona para visitar
        if (!visited.has(resolved)) {
          internalLinks.push(resolved)
        }
      }
    })

    console.log(`   ✓ ${url} (${foundDocs.length} docs encontrados até agora)`)
    return internalLinks
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(`   ⚠️  Falhou ${url} (${error.response?.status ?? error.message})`)
    } else {
      console.warn(`   ⚠️  Falhou ${url}`)
    }
    return []
  }
}

export async function htmlSource(): Promise<Document[]> {
  console.log("\n🕷️  Iniciando crawler HTML no site da UESPI...")

  // Fila de páginas para visitar, começa pela home
  const queue: string[] = [BASE_URL]

  while (queue.length > 0) {
    const url = queue.shift()!

    if (visited.has(url)) continue
    if (isBlocked(url)) {
      console.log(`   🚫 Bloqueado: ${url}`)
      continue
    }

    const newLinks = await crawlPage(url)
    queue.push(...newLinks)

    await sleep(DELAY_MS)
  }

  console.log(`\n✅ Crawler HTML concluído: ${foundDocs.length} documentos coletados`)
  console.log(`   → Páginas visitadas: ${visited.size}\n`)

  return foundDocs
}
