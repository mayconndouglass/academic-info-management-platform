import { CategoryType } from '@/types/category-type'

import logo from '../../public/uespi-logo.webp'
import { ThemeToggle } from './theme/theme-toggle'

type MainHeaderProps = {
  selectedCategorie: CategoryType
  onCategorieChange: (categorie: CategoryType) => void
}

export const MainHeader = ({
  onCategorieChange,
  selectedCategorie,
}: MainHeaderProps) => {
  const categories: CategoryType[] = [
    'todos',
    'prex',
    'preg',
    'prad',
    'prop',
    'proplan',
  ]

  return (
    <header className="w-full">
      <div className="container mx-auto flex items-center justify-between gap-6 border-b px-4 py-4">
        <div className="flex items-center">
          <img src={logo} alt="Uespi" className="h-20 w-20" />
          <span className="text-xl font-medium text-foreground">
            Universidade Estadual do Piauí
          </span>
        </div>

        <nav className="absolute left-1/2 flex h-6 -translate-x-1/2 transform justify-around space-x-4 lg:space-x-6">
          <ul className="flex gap-6">
            {categories.map((categorie) => (
              <li
                key={categorie}
                role="button"
                tabIndex={0}
                className={`text-sm font-medium hover:cursor-pointer ${
                  selectedCategorie === categorie
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => onCategorieChange(categorie)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onCategorieChange(categorie)
                  }
                }}
              >
                {categorie.toUpperCase()}
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
