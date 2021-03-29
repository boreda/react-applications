import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

class PaletteMetaForm extends React.Component{
    constructor(props){
        super(props)
        this.state={stage: 'form', newPaletteName: ""}
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.showEmojiPicker=this.showEmojiPicker.bind(this)
        this.savePalette=this.savePalette.bind(this)
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
    handleClickOpen(){
        this.setState({open: true})
    }
    handleClose(){
        this.setState({open: false})
    }
    showEmojiPicker(){
        this.setState({stage: "emoji"})
    }
    savePalette(emoji){
        const newPalette = {
            paletteName: this.state.newPaletteName, 
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette)
    }
    render(){
        return(
            <div>
                <Dialog open={this.state.stage === 'emoji'}>
                    <Picker onSelect={this.savePalette} title="Pick a Palette EMOJI"/>
                </Dialog>
                <Dialog
                    open={this.state.stage === 'form'}
                    onClose={this.handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    onClose={this.props.hideForm}
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Choose a Palette Name
                    </DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                    <DialogContent>
                    <DialogContentText>
                        Please enter a name for your beautiful Palette Name
                    </DialogContentText>
                    <TextValidator 
                        label="Palette Name" 
                        value={this.state.newPaletteName} 
                        fullWidth
                        onChange={this.handleChange} 
                        name="newPaletteName"
                        validators={['required', 'isPaletteNameUnique']}
                        errors={['please enter palette name', 'Name already Taken']}
                        />
                    
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={this.props.hideForm} color="primary" >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }
}
export default PaletteMetaForm