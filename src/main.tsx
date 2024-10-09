import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import{createBrowserRouter, RouterProvider, BrowserRouter} from "react-router-dom";

const testRouter=createBrowserRouter([{
  path: "/pagetest",
}
])

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <RouterProvider router={testRouter}/>
  </BrowserRouter>,
)
