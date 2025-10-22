import { CategoryType } from '@/types/category-type'

export const getListTitle = (
  searchQuery: string,
  selectedCategory: CategoryType,
  nameCategories: Record<CategoryType, string>,
) => {
  if (searchQuery) {
    const categoryText =
      selectedCategory !== 'todos'
        ? ` na categoria ${nameCategories[selectedCategory]}`
        : ''

    return `Resultados para "${searchQuery}"${categoryText}`
  }

  if (selectedCategory !== 'todos') {
    return `Postagens na categoria ${nameCategories[selectedCategory]}`
  }

  return 'Últimas postagens'
}
