import styles from '../css_modules/toolbar.module.css'
import { Campaign } from '../types/Campaign'
import { NPC } from '../types/NPC'
import AvatarComponent from './AvatarComponent'
import AvatarList from './AvatarList'

type BarProps={
    campaign:Campaign;
}

function ToolBar(props:BarProps){

    return(
        <div className={styles.tool_bar}>

            <div className={styles.quick_access}>
                <h4>Quick Access:</h4>
                <AvatarComponent/>
            </div>

            <div className={styles.recent_edits}>
                <h4>Recent Edits:</h4>
                <AvatarList things={props.campaign?.npcs}/>
            </div>

            <div className={styles.search_bar}>
                <h4>Search Bar:</h4>
            </div>  

        </div>
    )
}

export default ToolBar