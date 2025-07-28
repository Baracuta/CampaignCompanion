import { useState, useEffect } from "react";
import { getCampaign, getNPCs } from "../services/CampaignServiceFrontend";
import { Campaign } from "../types/Campaign";

export const useCampaign = (id: string) => {
  const [campaign, setCampaign] = useState<Campaign>();

  useEffect(() => {
    getCampaign(id as string).then(async (campaign) => {
      setCampaign(campaign);
      const npcs = await getNPCs(id as string);
      setCampaign({...campaign, npcs});
    });
  }, [id]);

  return {
    campaign: campaign as Campaign,

    refreshCampaign:() => {
      return getCampaign(id).then(async (campaign) => {
        setCampaign(campaign);
        const npcs = await getNPCs(id as string);
        setCampaign({...campaign, npcs});
        console.log("Campaign refreshed:", campaign.npcs);
      });
    },
  };
};
