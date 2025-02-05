import styles from '../css_modules/toolbar.module.css'
import { Entity } from '../types/Entity'
import AvatarList from './AvatarList'

type BarProps={
    favourites:Array<Entity>;
    recentEdits:Array<Entity>;
}

function ToolBar(props:BarProps){

    return(
        <div className={styles.tool_bar}>

            <div className={styles.quick_access}>
                <h4>Favourites:</h4>
                <AvatarList things={props.favourites}/>
            </div>

            <div className={styles.recent_edits}>
                <h4>Recent Edits:</h4>
                <AvatarList things={props.recentEdits}/>
            </div>

            <div className={styles.search_bar}>
                <h4>Search Bar:</h4>
            </div>  

        </div>
    )
}

export default ToolBar