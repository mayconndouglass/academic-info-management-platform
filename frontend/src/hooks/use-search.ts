import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { searchPosts } from '@/api/search'

export function useSearch(debounceMs = 500) {
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
    queryKey: ['searchPosts', debouncedQuery],
    queryFn: () => searchPosts(debouncedQuery),
    enabled: debouncedQuery.length > 0, // só busca se houver texto
    // placeholderData: (previousData) => previousData, // mantém os resultados antigos enquanto busca
    staleTime: 1000 * 60 * 5, // cache 5 minutos
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
