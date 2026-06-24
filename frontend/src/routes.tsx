import { createBrowserRouter } from 'react-router-dom'

import { DocumentDetails } from './pages/document-details'
import { Home } from './pages/home'
import { PostDetails } from './pages/post-details'
import { Teste } from './pages/teste'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/post/:id', element: <PostDetails /> },
  { path: '/document/:id', element: <DocumentDetails /> },
  { path: '/teste', element: <Teste /> },
])
