import type { Document } from "./normalizer.ts"

// Remove acentos e coloca em minúsculo para a comparação não depender de acentuação
// Ex: "Resoluções" → "resolucoes", "Edital" → "edital"
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

// Verifica se alguma das palavras-chave está contida no texto normalizado
function matches(text: string, keywords: string[]): boolean {
  const normalizedText = normalize(text)
  return keywords.some((keyword) => normalizedText.includes(normalize(keyword)))
}

// Para cada categoria, listamos as palavras-chave que podem aparecer
// tanto na URL quanto no título do documento
const CATEGORY_RULES: { category: string; keywords: string[] }[] = [
  {
    category: "Resoluções",
    keywords: ["resolucao", "resolucoes", "resolução", "resoluções"],
  },
  {
    category: "Editais",
    keywords: ["edital", "editais"],
  },
  {
    category: "Formulários",
    keywords: ["formulario", "formularios", "formulário", "formulários"],
  },
  {
    category: "Manuais",
    keywords: ["manual", "manuais"],
  },
  {
    category: "Relatórios",
    keywords: ["relatorio", "relatorios", "relatório", "relatórios"],
  },
  {
    category: "Regimentos",
    keywords: ["regimento", "regimentos"],
  },
  {
    category: "Regulamentos",
    keywords: ["regulamento", "regulamentos"],
  },
  {
    category: "Requerimentos",
    keywords: ["requerimento", "requerimentos"],
  },
  {
    category: "Tutoriais",
    keywords: ["tutorial", "tutoriais"],
  },
  {
    category: "Cronogramas",
    keywords: ["cronograma", "cronogramas"],
  },
  {
    category: "Portarias",
    keywords: ["portaria", "portarias"],
  },
  {
    category: "Resultados",
    keywords: ["resultado", "resultados"],
  },
]

// Tenta categorizar pelo título primeiro, depois pela URL, depois pela página de origem
// Se nenhuma regra bater, cai em "Outros"
export function categorize(doc: Document): Document {
  const textsToCheck = [doc.title, doc.url, doc.slug, doc.pageOrigin]

  for (const rule of CATEGORY_RULES) {
    for (const text of textsToCheck) {
      if (text && matches(text, rule.keywords)) {
        return { ...doc, category: rule.category }
      }
    }
  }

  return { ...doc, category: "Outros" }
}
