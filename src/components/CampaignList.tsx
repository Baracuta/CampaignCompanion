import { getCampaigns} from "../services/CampaignService";

//The component that creates a div for each campaign in the array of getCampaigns

//Off the top of my head, I'll probably have to make a const that has a box, and the for loop creates a new element then appends it to the box. Then, I only return the single box with the
//other stuff inside of it.
function CampaignList(){
    const list=getCampaigns();
    const divs=list.map((datum, index)=> <div key={index}>{datum.name}</div>);

    // for (let i = 0; i < list.length; i++) {
    //     let item=list[i]
    //     console.log(item.name)
    //     const test=createElement(`h3`,null,item.name)
    //     divs.appendChild(test);
    //     return(
    //         test)
    // };
    return divs
};

export default CampaignList