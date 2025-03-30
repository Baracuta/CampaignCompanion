import styles from '../css_modules/cardpanel.module.css'

type PanelProps = {
    children?: React.ReactNode | undefined;
    panelType?: `campaign`;
}

function CardPanel(props:PanelProps){
    let divClass=(styles.card_panel)
    if (props.panelType !=null){
        divClass=`${divClass} ${styles[props.panelType]}`;
    }

    return(

        <div className={divClass}>
        {props.children}
        </div>
    )
}

export default CardPanel