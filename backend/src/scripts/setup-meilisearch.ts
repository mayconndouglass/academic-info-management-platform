/* eslint-disable no-console */
import { meiliClient } from "../libs/meili"
import { Post } from "../types"

async function setupMeilisearch() {
  const index = meiliClient.index<Post>("posts")

  try {
    console.log("Atualizando searchableAttributes...")
    await index.updateSearchableAttributes(["title", "content"])

    console.log("Atualizando stopWords...")
    await index.updateStopWords([
      "no", "na", "nos", "nas",
      "de", "do", "da", "dos", "das",
      "em", "para", "por", "a", "o", "e", "é", "ao",
      "aos"
    ])

    console.log("Atualizando sortableAttributes...")
    await index.updateSortableAttributes(["date"])

    console.log("Atualizando rankingRules...")
    await index.updateRankingRules([
      "words",
      "typo",
      "attribute",
      "proximity",
      "exactness",
      "sort"
    ])

    console.log("Configuração do Meilisearch finalizada com sucesso!")
  } catch (error) {
    console.error("Erro ao configurar Meilisearch:", error)
  }
}

setupMeilisearch()

// const result = await meili.search("projeto premiado nordeste", {
//   limit: 20,
//   attributesToHighlight: ["title", "content"],
//   attributesToCrop: ["content"],
//   cropLength: 100,
//   showMatchesPosition: true
// })
