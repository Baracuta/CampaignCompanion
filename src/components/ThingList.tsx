import Card from "./Card";

type listProps = {
  npcs?: Array<any>;
};

function NPCList(props: listProps) {
  const divs = (props.npcs ?? []).map((datum) => (
    <Card name={datum.name} cardLink={``} key={datum.id}></Card>
  ));

  return divs;
}

export default NPCList;
