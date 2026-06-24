import { Facebook, Linkedin, Youtube } from 'lucide-react'

import { Button } from '@/components/ui/button'

import logo from '../../public/uespi-logo.webp'

export function Footer() {
  return (
    <footer className="mt-16 flex w-full flex-1 flex-col justify-end">
      <div className="container relative mx-auto border-t px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center gap-2 md:mb-0">
            <img src={logo} alt="UESPI" className="h-20 w-20" />
          </div>

          {/* <nav>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {DOCUMENT_CATEGORIES.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer text-sm text-slate-600 hover:text-slate-900"
                >
                  {category === 'todos' ? 'Todos' : category}
                </li>
              ))}
            </ul>
          </nav> */}

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Linkedin</span>
            </Button>
            <Button variant="outline" size="icon">
              <Youtube className="h-4 w-4" />
              <span className="sr-only">Youtube</span>
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-slate-600 md:mt-0">
          © 2026 UESPI | Todos os Direitos Reservados
        </div>
      </div>
    </footer>
  )
}
