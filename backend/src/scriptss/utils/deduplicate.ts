import type { Document } from "./normalizer.ts"

// Recebe os arrays de documentos das três fontes e retorna um único array sem duplicatas
// A deduplicação é feita pela URL do documento — se dois documentos tiverem a mesma URL,
// independente de qual fonte veio, apenas um vai permanecer
// A prioridade é: API > HTML > Google Sites
// Pois a API tende a ter metadados mais completos (título, data)
export function deduplicate(
  apiDocs: Document[],
  htmlDocs: Document[],
  googleDocs: Document[]
): Document[] {
  const seen = new Map<string, Document>()

  // A ordem de inserção define a prioridade
  // O Map não sobrescreve uma chave que já existe,
  // então inserimos primeiro os de maior prioridade
  for (const doc of  [...htmlDocs, ...apiDocs, ...googleDocs]) {
    if (!seen.has(doc.url)) {
      seen.set(doc.url, doc)
    }
  }

  const result = Array.from(seen.values())

  console.log(`📦 Total após deduplicação: ${result.length} documentos`)
  console.log(`   → API: ${apiDocs.length}`)
  console.log(`   → HTML (UESPI): ${htmlDocs.length}`)
  console.log(`   → Google Sites: ${googleDocs.length}`)

  return result
}
