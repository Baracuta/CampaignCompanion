import { Campaign } from "../types/Campaign";
import TestDisplay from "./TestDisplay";

type listProps = {
  things: Array<any>;
  campaign: Campaign;
};

function NPCList(props: listProps) {
  const divs = (props.things ?? []).map((datum) => (
    // <Card name={datum.name} cardLink={``} key={datum.id}></Card>
    <TestDisplay thing={datum} campaign={props.campaign} key={datum.id}/>
  ));

  return divs;
}

export default NPCList;
