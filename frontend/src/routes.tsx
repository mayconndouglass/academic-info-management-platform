import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { PostDetails } from './pages/post-details'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/post/:id', element: <PostDetails /> },
])
