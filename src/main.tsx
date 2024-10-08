import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import{
  createBrowserRouter, RouterProvider,} from "react-router-dom";

const router=createBrowserRouter([{
  path: "/",
},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <RouterProvider router={router}/>
  </StrictMode>,
)
