import styles from '../css_modules/topbar.module.css'

type TopBarProps={
    name?:string;
    game?:string;
    image?:string;
}

function TopBar(props:TopBarProps){

    return(
        <div className={styles.top_bar}>

                <img src={props?.image}/>

                <div className={styles.title_box}>
                    <h2>{props?.name}</h2>
                    <h3>{props?.game}</h3>
                </div>

                <div className={styles.dashboard_menu}>
                    <button></button>
                    
                </div>

            </div>
    )
}

export default TopBar