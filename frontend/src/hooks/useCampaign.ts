import { useState, useEffect } from "react";
import { getCampaign, getNPCs, getLocations, getItems, getPCs } from "../services/CampaignServiceFrontend";
import { Campaign } from "../types/Campaign";


export const useCampaign = (id: string) => {
  const [campaign, setCampaign] = useState<Campaign>();

  useEffect(() => {
    const fetchAll = async () => {
      const campaignData = await getCampaign(id as string);
      setCampaign({
        ...campaignData,
      });
    };
    fetchAll();
  }, [id]);

  return {
    campaign: campaign as Campaign,

    refreshCampaign: async () => {
      const campaignData = await getCampaign(id as string);
      setCampaign({
        ...campaignData,
      });
      console.log("Campaign refreshed");
    },
  };
};
