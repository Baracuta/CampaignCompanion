import styles from '../css_modules/topbar.module.css'
import NavButton from './NavButton';

type TopBarProps={
    name?:string;
    game?:string;
    image?:string;
    buttonNav:string;
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
                    <NavButton text="Go Back" destination={props.buttonNav}/>
                    
                    
                </div>

            </div>
    )
}

export default TopBar