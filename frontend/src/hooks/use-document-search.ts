import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { SearchDocumentsInstant } from '@/api'

// Equivalente ao useSearch, mas para documentos
// A única diferença real é a função de busca — SearchDocumentsInstant
// em vez de searchPosts. Toda a lógica de debounce e estado é igual.
export function useDocumentSearch(debounceMs = 500) {
  const [input, setInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value.trim())
  }, debounceMs)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInput(value)
      debounced(value)
    },
    [debounced],
  )

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['searchDocuments', debouncedQuery],
    queryFn: () => SearchDocumentsInstant(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60 * 5,
  })

  const loading = isLoading || (input.length > 0 && debouncedQuery.length === 0)

  return {
    input,
    handleChange,
    results: data?.hits ?? [],
    total: data?.total ?? 0,
    loading,
    error,
    isError,
  }
}
