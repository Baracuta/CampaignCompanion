import styles from '../css_modules/toolbar.module.css'


function ToolBar(){

    return(
        <div className={styles.tool_bar}>

            <div className={styles.quick_access}>
                <h4>Quick Access:</h4>
            </div>

            <div className={styles.recent_edits}>
                <h4>Recent Edits:</h4>
            </div>

            <div className={styles.search_bar}>
                <h4>Search Bar:</h4>
            </div>  

        </div>
    )
}

export default ToolBar