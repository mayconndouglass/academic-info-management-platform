import "dotenv/config"

import { main as runCrawler } from "./crawler.js"

const INTERVAL_HOURS = 12
const INTERVAL_MS = INTERVAL_HOURS * 60 * 60 * 1000

async function run() {
  const now = new Date().toLocaleString("pt-BR")
  console.log(`\n⏰ [${now}] Iniciando rodada agendada do crawler...`)

  try {
    await runCrawler()
    console.log("✅ Rodada concluída com sucesso")
  } catch (error) {
    console.error("❌ Erro na rodada agendada:", error)
  }
}

async function main() {
  console.log(`🕐 Cron iniciado — crawler vai rodar a cada ${INTERVAL_HOURS} horas`)
  console.log("   Próxima execução: agora\n")

  await run()
  setInterval(run, INTERVAL_MS)
}

main().catch((error) => {
  console.error("❌ Erro fatal no cron:", error)
  process.exit(1)
})
