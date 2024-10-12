import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import TestPage from './Pages/pagetest.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


//All of the different available routes will be here, since there won't be too too many.
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
    },
    {
        path:"/new-campaign",
        element:<TestPage/>
    },
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)