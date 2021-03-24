import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'

const styles={
    root: {
        width: "20%",
        height: '50%',
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        marginBottom: "-3.5px",
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
}
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
export default withStyles(styles)(DraggableColorBox)