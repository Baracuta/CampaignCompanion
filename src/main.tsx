import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css_modules/index.css";
import App from "./App.tsx";
import CampaignSelect from "./pages/CampaignSelect.tsx";
import CampaignForm from "./pages/CampaignForm.tsx";
import CampaignPage from "./pages/CampaignPage.tsx";
import CampaignNPCs from "./pages/CampaignNPCs.tsx";
import CampaignLocations from "./pages/CampaignLocations.tsx";
import CampaignItems from "./pages/CampaignItems.tsx";
import CampaignPlayerCharacters from "./pages/CampaignPlayerCharacters.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/campaign-form",
      element: <CampaignForm />,
    },
    {
      path: "/campaign-select",
      element: <CampaignSelect />,
    },
    {
      path: "/campaign/:id",
      element: <CampaignPage />,
    },
    {
      path: "/campaign/:id/NPCs",
      element: <CampaignNPCs />,
    },
    {
      path: "/campaign/:id/Locations",
      element: <CampaignLocations />,
    },
    {
      path: "/campaign/:id/Items",
      element: <CampaignItems />,
    },
    {
      path: "/campaign/:id/PlayerCharacters",
      element: <CampaignPlayerCharacters />,
    },
  ],
  { basename: "/Campaign-Companion" }
);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
