import Card from "./Card";
import { Location } from "../types/Location";

type listProps = {
  locations?: Array<Location>;
};

function LocationList(props: listProps) {
  const divs = (props.locations ?? []).map((datum) => (
    <Card name={datum.name} cardLink={``} key={datum.id}></Card>
  ));

  return divs;
}

export default LocationList;
