import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styles from './style.module.css'
import Createuniversitydialogue from '../../adminComponents/dialogues/Createuniversitydialogue';
import Createcoursedialogue from '../../adminComponents/dialogues/Createcoursedialogue';
import Createstatedialogue from '../../adminComponents/dialogues/Createstatedialogue';
import Createsubjectdialogue from '../../adminComponents/dialogues/Createsubjectdialogue';
import Createcitydialogue from '../../adminComponents/dialogues/Createcitydialogue';


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#861f41'),
    backgroundColor: 'var(--primary)',
    fontSize: 'medium',
    '&:hover': {
        backgroundColor: 'var(--primary)',
    },
}));


const Subnavadmin = (props) => {
    const [universityDialogueOpen, setuniversityDialogueOpen] = React.useState(false);
    const [courseDialogueOpen, setcourseDialogueOpen] = React.useState(false);
    const [cityDialogueOpen, setcityDialogueOpen] = React.useState(false);
    const [stateDialogueOpen, setstateDialogueOpen] = React.useState(false);
    const [subjectDialogueOpen, setsubjectDialogueOpen] = React.useState(false);


    const handleOpen = () => {
        switch (props.name) {
            case 'University':
                setuniversityDialogueOpen(true)
                break;
            case 'Course':
                setcourseDialogueOpen(true)
                break;
            case 'State':
                setstateDialogueOpen(true)
                break;
            case 'City':
                setcityDialogueOpen(true)
                break;
            case 'Subject':
                setsubjectDialogueOpen(true)
                break;

            default:
            // Code to execute if none of the cases match expression
        }
    };
    console.log('propsprops', props)

    return (
        <>
            <Createuniversitydialogue open={universityDialogueOpen} setOpen={setuniversityDialogueOpen} />
            <Createcoursedialogue open={courseDialogueOpen} setOpen={setcourseDialogueOpen} />
            <Createstatedialogue open={stateDialogueOpen} setOpen={setstateDialogueOpen} />
            <Createsubjectdialogue open={subjectDialogueOpen} setOpen={setsubjectDialogueOpen} />
            <Createcitydialogue open={cityDialogueOpen} setOpen={setcityDialogueOpen} />
            <div className={styles.subNavAppBar}>
                <div className={styles.subNavContainerLeft}>
                    {props.name}
                </div>
                <div className={styles.subNavContainerRight}>
                    <ColorButton onClick={handleOpen}>
                        Create
                    </ColorButton >
                </div>
            </div>
        </>
    );
};

export default Subnavadmin;