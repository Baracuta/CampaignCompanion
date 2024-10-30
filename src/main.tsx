import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css_modules/index.css'
import App from './App.tsx'
import TestPage from './pages/TestingPage.tsx'
import CampaignForm from './pages/CampaignForm.tsx'
import CampaignPage from './pages/CampaignPage.tsx'


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
    {
        path:"/campaign-form",
        element:<CampaignForm/>
    },
    {
        path:"/campaign/:id",
        element:<CampaignPage/>
    },
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)