import { PropsWithChildren } from 'react'
import styles from '../css_modules/cardpanel.module.css'

type PanelProps= PropsWithChildren;

function CardPanel(props:PanelProps){

    return(

        <div className={styles.card_panel}>
        {props.children}
        </div>
    )
}

export default CardPanel