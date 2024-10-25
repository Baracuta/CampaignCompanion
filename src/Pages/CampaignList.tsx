import NavButton from "../components/NavButton"

//This page will list out all of the user's created campaigns
function CampaignList(){

    return(
        <main>

            <div>
                <NavButton text="Home" destination="/"/>
                <NavButton text="Campaign Page" destination="/campaign/:id"/>
            </div>
            <div>This will be where the campaign creation form goes</div>
        </main>
    )
}

export default CampaignList