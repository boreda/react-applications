import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

const styles={
    picker: {
        width: '100%',
        marginTop: '2rem',
        marginLeft: '3rem'
    },
    addColor: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '1rem'
    },
    colorNameInput: {
        width: '100%',
        height: '70px'
    }
}

class ColorPickerForm extends React.Component{
    static defaultProps = {
        maxColors: 20
    }
    constructor(props){
        super(props)
        this.state = {
            currentColor: 'teal',
            newColorName: ""
        }
        this.updateCurrentColor=this.updateCurrentColor.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    updateCurrentColor(newColor){
        console.log(newColor)
        this.setState({currentColor: newColor.hex})
    }
    handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        })
    }
    handleSubmit(){
        const newColor={
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColors(newColor)
        this.setState({newColor: ""})
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique', value=>
            this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        )
        ValidatorForm.addValidationRule('isColorUnique', value=>
            this.props.colors.every(
                ({color}) => color!== this.state.currentColor
            )
        )
    }
    render(){
        const {colors, maxColors, classes} = this.props
        return(
            <div>
                <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor} className={classes.picker}/>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                        value={this.state.newColorName}
                        placeholder='Color Name'
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={['required', 'isColorUnique', 'isColorNameUnique']}
                        errorMessages={['enter a color', 'color already used', 'color name must be unique']}
                        className={classes.colorNameInput}
                        variant='filled'
                        margin='normal'
                    />
                    <Button variant="contained" 
                    color="primary"
                    style={{backgroundColor: this.state.currentColor}} 
                    type="submit"
                    disabled={colors.length >= maxColors}
                    className={classes.addColor}
                    >Add Color</Button>
                </ValidatorForm>
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm)