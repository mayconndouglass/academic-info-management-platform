import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { CategoryType } from '@/types/category-type'

export const nameCategories: Record<CategoryType, string> = {
  preg: '4',
  prex: '5',
  prad: '8',
  prop: '7',
  proplan: '6',
  todos: '4,5,8,7,6',
}

export function useCategorie() {
  const [selectedCategorie, setSelectedCategorie] =
    useState<CategoryType>('todos')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const categorieParam = searchParams.get('categorie') || 'todos'

    setSelectedCategorie(categorieParam as CategoryType)
  }, [searchParams])

  function handleCategorieChange(categorie: CategoryType) {
    setSelectedCategorie(categorie)

    setSearchParams((state) => {
      state.set('categorie', categorie)
      state.set('page', '1')
      return state
    })
  }

  return {
    selectedCategorie,
    searchParams,
    handleCategorieChange,
    nameCategories,
  }
}
