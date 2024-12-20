import { Facebook, Linkedin, Youtube } from 'lucide-react'

import { Button } from '@/components/ui/button'

import logo from '../../public/uespi-logo.webp'

export function Footer() {
  return (
    <footer className="mt-20 w-full">
      <div className="container relative mx-auto border-t px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center gap-2 md:mb-0">
            <img src={logo} alt="UESPI" className="h-20 w-20" />
          </div>

          <nav className="absolute left-1/2 -translate-x-1/2 transform">
            <ul className="flex gap-6">
              <li className="cursor-pointer text-sm text-slate-600 hover:text-slate-900">
                Todos
              </li>
              <li className="cursor-pointer text-sm text-slate-600 hover:text-slate-900">
                Preg
              </li>
              <li className="cursor-pointer text-sm text-slate-600 hover:text-slate-900">
                Prex
              </li>
              <li className="cursor-pointer text-sm text-slate-600 hover:text-slate-900">
                Prad
              </li>
              <li className="cursor-pointer text-sm text-slate-600 hover:text-slate-900">
                Prop
              </li>
              <li className="cursor-pointer text-sm text-slate-600 hover:text-slate-900">
                Proplan
              </li>
            </ul>
          </nav>

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

        <div className="mt-8 text-center text-sm text-slate-600">
          © 2024 UESPI | Todos os Direitos Reservados
        </div>
      </div>
    </footer>
  )
}
