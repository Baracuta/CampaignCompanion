import { useState, useEffect } from "react";
import { getCampaigns } from "../services/CampaignServiceFrontend";
import { Campaign } from "../types/Campaign";

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Array<Campaign>>();

  useEffect(() => {
    getCampaigns().then((campaigns) => {
      setCampaigns(campaigns);
    });
  }, []);

  return campaigns as Array<Campaign>;
};
