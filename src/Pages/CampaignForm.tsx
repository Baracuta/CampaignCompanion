import NavButton from "../components/NavButton"
import styles from "../css_modules/form.module.css"

//This page is for the campaign creation form
function CampaignForm(){

    return(
        <main>

            <div>
                <NavButton text="Home" destination="/"/>
                <NavButton text="Campaign Page" destination="/campaign/:id"/>
            </div>

            <div className={styles.form_body}>

                <input type="text" />
                <input type="text" />
                <input type="text" />
            </div>


        </main>
    )
}

export default CampaignForm