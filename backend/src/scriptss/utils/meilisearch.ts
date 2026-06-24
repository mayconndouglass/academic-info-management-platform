import { MeiliSearch } from "meilisearch"

import type { Document } from "./normalizer.ts"

const INDEX_NAME = "documents"

const client = new MeiliSearch({
  host: process.env.MEILI_HOST ?? "http://localhost:7700",
  apiKey: process.env.MEILI_MASTER_KEY,
})

// Configura o índice com os atributos corretos para o nosso modelo
async function setupIndex() {
  console.log("🔧 Configurando índice no Meilisearch...")

  try {
    await client.deleteIndex(INDEX_NAME)
    console.log("🗑️  Índice anterior apagado")
  } catch {
    console.log("ℹ️  Índice não existia ainda, criando do zero...")
  }

  await client.createIndex(INDEX_NAME, { primaryKey: "id" })

  const index = client.index<Document>(INDEX_NAME)

  await index.updateSettings({
    // Campos que o Meilisearch vai usar para busca textual
    searchableAttributes: ["title", "slug", "category", "pageOrigin"],

    // Campos que poderão ser usados como filtro no front
    // Ex: filtrar só PDFs, ou só Resoluções
    filterableAttributes: ["type", "category", "date"],

    // Campos que poderão ser usados para ordenação
    sortableAttributes: ["date"],

    pagination: {
      maxTotalHits: 10000,
    },

    // Palavras irrelevantes para busca em português
    stopWords: [
      "no", "na", "nos", "nas",
      "de", "do", "da", "dos", "das",
      "em", "para", "por", "a", "o", "e", "é", "ao", "aos",
    ],

    rankingRules: [
      "exactness",
      "words",
      "proximity",
      "attribute",
      "typo",
      "sort",
    ],
  })

  console.log("✅ Índice configurado!")
  return index
}

export async function indexDocuments(docs: Document[]): Promise<void> {
  if (docs.length === 0) {
    console.log("⚠️  Nenhum documento para indexar")
    return
  }

  const index = await setupIndex()

  console.log(`📤 Indexando ${docs.length} documentos...`)

  // Meilisearch aceita até 1000 documentos por vez
  // então enviamos em lotes para não sobrecarregar
  const BATCH_SIZE = 500
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = docs.slice(i, i + BATCH_SIZE)
    await index.addDocuments(batch)
    console.log(`   → Lote ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} documentos enviados`)
  }

  console.log("✅ Indexação concluída!")
}
