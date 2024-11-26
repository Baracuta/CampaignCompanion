import styles from '../css_modules/topbar.module.css'

type TopBarProps={
    campaignName?:string;
    campaignGame?:string;
    image?:string;
}

function TopBar(props:TopBarProps){

    return(
        <div className={styles.top_bar}>

                <img src={`${ASSETS_PATH}/Emblem 1 3.png`}/>

                <div className={styles.title_box}>
                    <h2>{props?.campaignName}</h2>
                    <h3>{props?.campaignGame}</h3>
                </div>

                <div className={styles.dashboard_menu}>
                    <button></button>
                    
                </div>

            </div>
    )
}