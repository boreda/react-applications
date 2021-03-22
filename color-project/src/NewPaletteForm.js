import React from 'react'
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button'
import {ChromePicker} from 'react-color'
import DraggableColorBox from './DraggableColorBox'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'


const drawerWidth = 1000;

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


class NewPaletteForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            currentColor: 'teal',
            colors: [{color: 'blue', name: 'blue'}],
            newName: ''
        }
        this.updateCurrentColor=this.updateCurrentColor.bind(this)
        this.addNewColors=this.addNewColors.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique', value=>
            this.state.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        )
        ValidatorForm.addValidationRule('isColorUnique', value=>
            this.state.colors.every(
                ({color}) => color!== this.state.currentColor
            )
        )
    }
    handleDrawerOpen = ()=>{
        this.setState({open:true})
    }
    handleDrawerClose = ()=>{
        this.setState({open: false})
    }
    updateCurrentColor(newColor){
        console.log(newColor)
        this.setState({currentColor: newColor.hex})
    }
    addNewColors(){
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newName
        }
        this.setState({colors: [...this.state.colors, newColor], newName: ""})
    }
    handleChange(evt){
        this.setState({newName: evt.target.value})
    }
    render(){
        const {classes} = this.props;
        const {open} = this.state;
        console.log(this.state.colors)
        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar disableGutters={!open}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap color="inherit">
                    Persistent drawer
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}><ChevronLeftIcon /></IconButton>
                    <Typography variant="h4">Design your palette</Typography>
                    <Divider />
                    <Button variant="contained" color="secondary">Clear Palette</Button>
                    <Button variant="contained" color="primary">Random Colors</Button>
                    <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor}/>
                    <ValidatorForm onSubmit={this.addNewColors}>
                        <TextValidator 
                            value={this.state.newName}
                            onChange={this.handleChange}
                            validators={['required', 'isColorUnique', 'isColorNameUnique']}
                            errorMessages={['enter a color', 'color already used', 'color name must be unique']}
                        />
                        <Button variant="contained" color="primary" style={{backgroundColor: this.state.currentColor}} type="submit">Add Color</Button>
                    </ValidatorForm>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
                style={{marginTop: 100}}
            >
                <div className={classes.drawerHeader} />
                {
                    this.state.colors.map(color=>(
                    <DraggableColorBox color={color.color} key={color} name={color.name}/>
                    ))
                }
            </main>
            </div>
    )}
}
export default withStyles(styles, {withTheme: true})(NewPaletteForm);