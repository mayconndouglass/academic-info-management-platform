import "dotenv/config"

import { apiSource } from "./sources/apiSource"
import { htmlSource } from "./sources/htmlSource"
import { categorize } from "./utils/categorize"
import { deduplicate } from "./utils/deduplicate"
import { indexDocuments } from "./utils/meilisearch"
  
export { main }

async function main() {
  console.log("🚀 Iniciando crawler...\n")
  const startTime = Date.now()

  // Roda as duas fontes em paralelo
  const [apiDocs, htmlDocs] = await Promise.all([
    apiSource(),
    htmlSource(),
  ])

  // Mescla e remove duplicatas
  const deduplicated = deduplicate(apiDocs, htmlDocs, [])

  // Aplica categoria em cada documento
  console.log("🏷️  Categorizando documentos...")
  const categorized = deduplicated.map(categorize)

  // Resumo das categorias encontradas
  const categorySummary = categorized.reduce<Record<string, number>>((acc, doc) => {
    acc[doc.category] = (acc[doc.category] ?? 0) + 1
    return acc
  }, {})
  console.log("📊 Categorias:")
  for (const [category, count] of Object.entries(categorySummary)) {
    console.log(`   → ${category}: ${count}`)
  }

  // Indexa no Meilisearch
  await indexDocuments(categorized)

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1)
  console.log(`\n🎉 Tudo pronto! Tempo total: ${elapsed} minutos`)
}

main().catch((error) => {
  console.error("❌ Erro fatal no crawler:", error)
  process.exit(1)
})
