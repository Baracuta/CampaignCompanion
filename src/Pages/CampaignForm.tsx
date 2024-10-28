import NavButton from "../components/NavButton"

//This page is for the campaign creation form
function CampaignForm(){

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

export default CampaignForm