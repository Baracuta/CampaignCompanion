import { Campaign } from "../types/Campaign";
import Card from "./Card";
import { useCampaigns } from "../hooks/useCampaigns";
import NavButton from "./NavButton";

//The component that creates a div for each campaign in the array of getCampaigns

function CampaignList() {
  const campaigns = useCampaigns();

  const divs = ((campaigns as Array<Campaign>) ?? []).map((datum) => (
    <Card
      name={datum.name}
      cardType="campaignCard"
      cardLink={`/campaign/${datum.id}`}
      key={datum.id}
    ></Card>
  ));

  return (
    <>
      <NavButton text="Create New Campaign" destination="/campaign-form" />
      {divs}
    </>
  );
}

export default CampaignList;
