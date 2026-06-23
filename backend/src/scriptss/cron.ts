import "dotenv/config"

import { exec } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"

const execAsync = promisify(exec)

// Necessário para ESM — equivalente ao __dirname do CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CRAWLER_PATH = path.join(__dirname, "crawler.ts")

// Intervalo em horas — a cada 12 horas
// Ajuste conforme necessário
const INTERVAL_HOURS = 12
const INTERVAL_MS = INTERVAL_HOURS * 60 * 60 * 1000

async function runCrawler() {
  const now = new Date().toLocaleString("pt-BR")
  console.log(`\n⏰ [${now}] Iniciando rodada agendada do crawler...`)

  try {
    const { stdout, stderr } = await execAsync(`tsx ${CRAWLER_PATH}`)
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
    console.log("✅ Rodada concluída com sucesso")
  } catch (error) {
    console.error("❌ Erro na rodada agendada:", error)
    // Não relança o erro — o cron continua rodando mesmo se uma rodada falhar
  }
}

async function main() {
  console.log(`🕐 Cron iniciado — crawler vai rodar a cada ${INTERVAL_HOURS} horas`)
  console.log("   Próxima execução: agora\n")

  // Roda imediatamente na primeira vez
  await runCrawler()

  // Depois agenda para rodar a cada INTERVAL_MS
  setInterval(runCrawler, INTERVAL_MS)
}

main().catch((error) => {
  console.error("❌ Erro fatal no cron:", error)
  process.exit(1)
})
