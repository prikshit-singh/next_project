import React from 'react';
import styles from '../../styles/catagoryPageCss/Catagorybanner.module.css'

function Catagorybanner(props) {
    return (
        <>
            <div className={styles.headerBanner}>
                <div className={styles.container}>
                    <div className={styles.containerRow}>
                        <span>Category</span>
                        <h3>Coading</h3>
                        <p>Category description here.. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam error eius quo, officiis non maxime quos reiciendis perferendis doloremque maiores!</p>
                    </div>


                </div>

            </div>
        </>
    );
}

export default Catagorybanner;