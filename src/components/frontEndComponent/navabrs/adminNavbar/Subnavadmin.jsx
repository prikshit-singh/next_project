import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styles from './style.module.css'


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#861f41'),
    backgroundColor: 'var(--primary)',
    fontSize: 'medium',
    '&:hover': {
        backgroundColor: 'var(--primary)',
    },
}));


const Subnavadmin = () => {
    return (
        <>
            <div className={styles.subNavAppBar}>
                <div className={styles.subNavContainerLeft}>
                    UNIVERSITY
                </div>
                <div className={styles.subNavContainerRight}>
                    <ColorButton >
                        Create
                    </ColorButton >
                </div>
            </div>
        </>
    );
};

export default Subnavadmin;