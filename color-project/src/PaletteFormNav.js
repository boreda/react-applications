import React from 'react'
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

const drawerWidth = 1000;

const styles = (theme)=>({
    root: {
        display:'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    navBtns: {

    }
})

class PaletteFormNav extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newPaletteName: ""
        }
        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique', value=>
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase()!== value.toLowerCase()
            )
        )
    }
    handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        })
    }
    render(){
        const {classes, open, handleSubmit, handleDrawerOpen} = this.props
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap color="inherit">
                        Create a Palette
                    </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <ValidatorForm onSubmit={()=>handleSubmit(this.state.newPaletteName)}>
                        <TextValidator 
                            label="Palette Name" 
                            value={this.state.newPaletteName} 
                            onChange={this.handleChange} 
                            name="newPaletteName"
                            validators={['required', 'isPaletteNameUnique']}
                            errors={['please enter palette name', 'Name already Taken']}
                            />
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                        </ValidatorForm>
                        <Link to="/">
                            <Button variant='contained' color="secondary">Go Back</Button>
                        </Link>
                    </div>
                </AppBar>
            </div>
        )
    }
}
export default withStyles(styles, {withTheme: true})(PaletteFormNav)