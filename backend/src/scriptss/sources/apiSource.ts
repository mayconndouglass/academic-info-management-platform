import https from "node:https"

import axios from "axios"

import { Document, normalize } from "../utils/normalizer"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })


const BASE_URL = "https://uespi.br/wp-json/wp/v2/media"
const PER_PAGE = 100 // máximo permitido pela API do WordPress

const MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

// Busca todas as páginas de um mime type específico
async function fetchByMimeType(mimeType: string): Promise<Document[]> {
  const docs: Document[] = []

  console.log(`🔍 API: buscando mime type ${mimeType}...`)

  // Primeira requisição para descobrir quantas páginas existem
  let totalPages = 1
  try {
    const firstResponse = await axios.get(BASE_URL, {
      httpsAgent,
      params: {
        mime_type: mimeType,
        per_page: PER_PAGE,
        page: 1,
      },
      timeout: 15000,
    })

    totalPages = parseInt(firstResponse.headers["x-wp-totalpages"] ?? "1", 10)
    console.log(`   → ${firstResponse.headers["x-wp-total"]} documentos encontrados em ${totalPages} página(s)`)

    // Já aproveita os resultados da primeira página
    for (const item of firstResponse.data) {
      docs.push(normalize({
        title: item.title?.rendered ?? item.slug ?? null,
        url: item.source_url,
        mimeType: item.mime_type,
        date: item.date ?? null,
        pageOrigin: item.link ?? null,
      }))
    }
  } catch (error) {
    console.error(`   ⚠️  Erro na primeira página de ${mimeType}:`, axios.isAxiosError(error) ? error.message : error)
    // Se a primeira página já falhou, não tem como saber o total
    // retorna vazio para esse mime type
    return docs
  }

  // Busca as páginas restantes sequencialmente
  // sequencial em vez de Promise.all justamente para lidar com erros por página
  for (let page = 2; page <= totalPages; page++) {
    try {
      const response = await axios.get(BASE_URL, {
         httpsAgent,
        params: {
          mime_type: mimeType,
          per_page: PER_PAGE,
          page,
        },
        timeout: 15000,
      })

      for (const item of response.data) {
        docs.push(normalize({
          title: item.title?.rendered ?? item.slug ?? null,
          url: item.source_url,
          mimeType: item.mime_type,
          date: item.date ?? null,
          pageOrigin: item.link ?? null,
        }))
      }

      console.log(`   → Página ${page}/${totalPages} OK (${docs.length} docs acumulados)`)
    } catch (error) {
      // Registra o erro mas continua para a próxima página
      // exatamente para lidar com o problema que você descreveu
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        // 400 e 404 geralmente indicam que a página não existe de verdade
        // então podemos parar de tentar
        if (status === 400 || status === 404) {
          console.warn(`   ⚠️  Página ${page}/${totalPages} retornou ${status}, encerrando busca desse mime type`)
          break
        }
        console.warn(`   ⚠️  Página ${page}/${totalPages} falhou (${status ?? error.message}), pulando...`)
      } else {
        console.warn(`   ⚠️  Página ${page}/${totalPages} falhou, pulando...`)
      }
    }
  }

  return docs
}

export async function apiSource(): Promise<Document[]> {
  console.log("\n📡 Iniciando coleta via API do WordPress...")

  const allDocs: Document[] = []

  // Busca cada mime type sequencialmente também
  // para não sobrecarregar a API da instituição
  for (const mimeType of MIME_TYPES) {
    const docs = await fetchByMimeType(mimeType)
    allDocs.push(...docs)
  }

  console.log(`✅ API concluída: ${allDocs.length} documentos coletados\n`)
  return allDocs
}
