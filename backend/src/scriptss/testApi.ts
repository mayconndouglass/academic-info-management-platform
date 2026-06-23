import "dotenv/config"

import { apiSource } from "./sources/apiSource"

async function main() {
  console.log("🧪 Testando apenas a API...\n")
  const docs = await apiSource()

  console.log(`\nTotal: ${docs.length} documentos`)
  console.log("\nPrimeiros 5 documentos:")
  console.log(JSON.stringify(docs.slice(0, 5), null, 2))
}

main().catch(console.error)
