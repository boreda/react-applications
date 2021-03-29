import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { SortableElement } from 'react-sortable-hoc'
import DeleteIcon from '@material-ui/icons/Delete'
import styles from './styles/DraggableColorBoxStyles'

function DraggableColorBox(props){
    const {classes, name, deleteIcon, handleClick} = props;
    return(
        <div className={classes.root} style={{backgroundColor: name, marginLeft: '100px'}}>
            <div classes={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>
    )
}
export default withStyles(styles)(SortableElement(DraggableColorBox))