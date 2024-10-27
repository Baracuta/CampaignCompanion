import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css_modules/index.css'
import App from './App.tsx'
import TestPage from './Pages/TestingPage.tsx'
import CampaignList from './Pages/CampaignList.tsx'
import CampaignPage from './Pages/CampaignPage.tsx'


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
        path:"/campaign-list",
        element:<CampaignList/>
    },
    {
        path:"/campaign/:id",
        element:<CampaignPage/>
    },
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)