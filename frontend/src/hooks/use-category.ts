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
  geral: '19',
  sisu: '923',
}

export function useCategory() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('todos')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const categorieParam = searchParams.get('category') || 'todos'

    setSelectedCategory(categorieParam as CategoryType)
  }, [searchParams])

  function handleCategoryChange(category: CategoryType) {
    setSelectedCategory(category)

    setSearchParams((state) => {
      state.set('category', category)
      state.set('page', '1')
      return state
    })
  }

  return {
    selectedCategory,
    searchParams,
    setSearchParams,
    handleCategoryChange,
    nameCategories,
  }
}
