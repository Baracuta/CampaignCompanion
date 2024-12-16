import TestDisplay from "./TestDisplay";

type listProps = {
  things?: Array<any>;
};

function NPCList(props: listProps) {
  const divs = (props.things ?? []).map((datum) => (
    // <Card name={datum.name} cardLink={``} key={datum.id}></Card>
    <TestDisplay name={datum.name} description={datum.description}/>
  ));

  return divs;
}

export default NPCList;
