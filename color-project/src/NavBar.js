import React from 'react'
import {Link} from 'react-router-dom'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import 'rc-slider/assets/index.css'
import './NavBar.css'
import Slider from 'rc-slider'

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state={format: "hex", open: false}
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)
    }
    handleFormatChange(e){
        this.setState({format: e.target.value, open: true})
        this.props.handleChange(e.target.value);
    }
    closeSnackbar(){
        this.setState({open: false})
    }
    render(){
        return(
            <header className="NavBar">
                <div className="logo"><Link to="/">reactcolorpicker</Link></div>
                {this.props.showingAllColors && (
                <div className="slider-container">
                    <span>Level: {this.props.level}</span>
                    <div className="slider">
                        <Slider 
                            defaultValue={this.props.level} 
                            min={100} 
                            max={900}
                            step={100}
                            onAfterChange = {this.props.changeLevel}
                        />
                    </div>
                </div>
                )}
                <div className="select-container">
                    <Select onChange={this.handleFormatChange} value={this.state.format}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}} 
                    open={this.state.open} 
                    autoHideDuration={2000}
                    onClose={this.closeSnackbar}
                    message={<span id="message-id">Format Changed</span>}
                    action={[
                        <IconButton onClick={this.closeSnackbar}>
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}
export default NavBar