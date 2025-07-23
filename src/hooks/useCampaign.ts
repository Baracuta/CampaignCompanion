import { useState, useEffect } from "react";
import { getCampaign } from "../services/CampaignServiceFrontend";
import { Campaign } from "../types/Campaign";

export const useCampaign = (id: string) => {
  const [campaign, setCampaign] = useState<Campaign>();

  useEffect(() => {
    getCampaign(id as string).then((campaign) => {
      setCampaign(campaign);
    });
  }, [id]);

  return {
    campaign: campaign as Campaign,

    refreshCampaign:() => {
      return getCampaign(id).then((campaign) => {
        setCampaign(campaign);
      });
    },
  };
};
