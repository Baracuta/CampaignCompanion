import NavButton from "../components/NavButton"
import styles from "../css_modules/form.module.css"

//This page is for the campaign creation form
function CampaignForm(){

    return(
        <main>

            <div>
                <NavButton text="Home" destination="/"/>
            </div>

            <div className={styles.form_body}>
                <div id="input1">
                    <p>What game system does this campaign use?</p>
                    <input type="text" />
                </div>
                <div id="input2">
                    <p>What would you like to name this campaign?</p>
                    <input type="text" />
                </div>
                <div id={styles.input3}>
                    <p>Please write a short description</p>
                    <input type="text" />
                </div>
                <NavButton text="Campaign Page" destination="/campaign/:id"/>

            </div>


        </main>
    )
}

export default CampaignForm