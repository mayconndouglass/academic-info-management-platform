import { Menu } from 'lucide-react'

import {
  DOCUMENT_CATEGORIES,
  DocumentCategoryType,
} from '@/hooks/use-document-category'

import logo from '../../public/uespi-logo.webp'
// import { ThemeToggle } from './theme/theme-toggle'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

type MainHeaderProps = {
  selectedCategory: DocumentCategoryType
  onCategoryChange: (category: DocumentCategoryType) => void
}

export const MainHeader = ({
  onCategoryChange,
  selectedCategory,
}: MainHeaderProps) => {
  return (
    <header className="w-full">
      {/* Linha 1 — igual ao original */}
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
        <div className="flex items-center">
          <img src={logo} alt="Uespi" className="h-20 w-20" />
          <span className="hidden text-xl font-medium text-foreground sm:block">
            Universidade Estadual do Piauí
          </span>
        </div>

        <div className="flex gap-4">
          {/* <ThemeToggle /> */}

          <Sheet>
            <SheetTrigger className="block md:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Categorias</SheetTitle>
              </SheetHeader>
              <ul className="mt-6 flex flex-col gap-4">
                {DOCUMENT_CATEGORIES.map((category) => (
                  <li
                    key={category}
                    role="button"
                    tabIndex={0}
                    className={`text-sm font-medium hover:cursor-pointer ${
                      selectedCategory === category
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => onCategoryChange(category)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onCategoryChange(category)
                      }
                    }}
                  >
                    {category === 'todos' ? 'Todos' : category}
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Linha 2 — menu */}
      <nav className="container mx-auto hidden border-b px-4 pb-4 md:block">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {DOCUMENT_CATEGORIES.map((category) => (
            <li
              key={category}
              role="button"
              tabIndex={0}
              className={`text-sm font-medium hover:cursor-pointer ${
                selectedCategory === category
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onCategoryChange(category)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onCategoryChange(category)
                }
              }}
            >
              {category === 'todos' ? 'Todos' : category}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
