const numberCategories: Record<number, string> = {
  4: 'PREG',
  5: 'PREX',
  8: 'PRAD',
  7: 'PROP',
  6: 'PROPLAN',
  11: 'PRAD',
}

export function getNameCategorysByNumber(categories: number[]) {
  const key = categories.find(
    (category) => numberCategories[category] !== undefined,
  )

  return key ? numberCategories[key] : undefined
}
