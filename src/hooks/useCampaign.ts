import { useState, useEffect } from "react";
import { getCampaign, getNPCs, getLocations, getItems, getPCs } from "../services/CampaignServiceFrontend";
import { Campaign } from "../types/Campaign";


export const useCampaign = (id: string) => {
  const [campaign, setCampaign] = useState<Campaign>();

  useEffect(() => {
    const fetchAll = async () => {
      const campaignData = await getCampaign(id as string);
      const npcs = await getNPCs(id as string);
      const locations = await getLocations(id as string);
      const items = await getItems(id as string);
      const pcs = await getPCs(id as string);

      setCampaign({
        ...campaignData,
        npcs,
        locations,
        items,
        playerCharacters: pcs,
      });
    };
    fetchAll();
  }, [id]);

  return {
    campaign: campaign as Campaign,

    refreshCampaign: async () => {
      const campaignData = await getCampaign(id as string);
      const npcs = await getNPCs(id as string);
      const locations = await getLocations(id as string);
      const items = await getItems(id as string);
      const pcs = await getPCs(id as string);

      setCampaign({
        ...campaignData,
        npcs,
        locations,
        items,
        playerCharacters: pcs,
      });
      console.log("Campaign refreshed:", { npcs, locations, items, pcs });
    },
  };
};
