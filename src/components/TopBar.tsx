import styles from '../css_modules/topbar.module.css'

function TopBar(){

    return(
        <div className={styles.top_bar}>

                <img src={`${ASSETS_PATH}/Emblem 1 3.png`}/>

                <div className={styles.title_box}>
                    <h2>{campaign?.name}</h2>
                    <h3>{campaign?.game}</h3>
                </div>

                <div className={styles.dashboard_menu}>
                    <button></button>
                    
                </div>

            </div>
    )
}