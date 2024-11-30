import styles from '../css_modules/select.module.css'
import { ASSETS_PATH } from '../constants/assets_path'
import CampaignList from '../components/CampaignList'
import CardPanel from '../components/CardPanel'
import TopBar from '../components/TopBar'



function CampaignSelect(){

    return(

        <main className={styles.main}>

            <TopBar name='Campaign Selection' buttonNav='/' image={`${ASSETS_PATH}/Emblem 1 3.png`}/>

            <CardPanel>
                <CampaignList/>
            </CardPanel>
            

        </main>

    )
}

export default CampaignSelect