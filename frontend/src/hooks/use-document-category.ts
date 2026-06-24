import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// Categorias de documentos — string direta, sem mapeamento para IDs numéricos
// Diferente do useCategory original que mapeava slugs para IDs do WordPress
export type DocumentCategoryType =
  | 'todos'
  | 'Editais'
  | 'Resoluções'
  | 'Formulários'
  | 'Manuais'
  | 'Relatórios'
  | 'Regimentos'
  | 'Regulamentos'
  | 'Requerimentos'
  | 'Portarias'
  | 'Tutoriais'
  | 'Cronogramas'
  | 'Resultados'
  | 'Outros'

export const DOCUMENT_CATEGORIES: DocumentCategoryType[] = [
  'todos',
  'Editais',
  'Resoluções',
  'Formulários',
  'Manuais',
  'Relatórios',
  'Regimentos',
  'Regulamentos',
  'Requerimentos',
  'Portarias',
  'Tutoriais',
  'Cronogramas',
  'Resultados',
  'Outros',
]

export function useDocumentCategory() {
  const [selectedCategory, setSelectedCategory] =
    useState<DocumentCategoryType>('todos')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'todos'
    setSelectedCategory(categoryParam as DocumentCategoryType)
  }, [searchParams])

  function handleCategoryChange(category: DocumentCategoryType) {
    setSelectedCategory(category)

    setSearchParams((state) => {
      state.set('category', category)
      state.set('page', '1')
      return state
    })
  }

  // Retorna a categoria para o filtro da API
  // "todos" significa sem filtro — retorna undefined para não passar o parâmetro
  function getCategoryFilter(): string | undefined {
    return selectedCategory === 'todos' ? undefined : selectedCategory
  }

  return {
    selectedCategory,
    searchParams,
    setSearchParams,
    handleCategoryChange,
    getCategoryFilter,
    categories: DOCUMENT_CATEGORIES,
  }
}
