import React from 'react'

class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            task: this.props.task,
            isEdit: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick(event){
        [event.target.name] = event.target.value
        this.setState({isEdit: !this.state.isEdit})
    }
    handleRemove(){
        this.props.remove(this.props.id)
    }
    handleEdit(e){
        e.preventDefault();
        this.props.edit(this.props.id, this.state.task)
        this.setState({
            isEdit: !this.state.isEdit
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        let result;
        if(this.state.isEdit){
            result = (
                <div>
                    <button onClick={this.handleClick}>Edit</button>
                    <button onClick={this.handleRemove}>X</button>
                    <li>
                        {this.props.task}
                    </li>
                </div>
            )
        } else {
            result = (
                <div>
                    <form onSubmit={this.handleEdit}>
                        <input type="text" value={this.state.task} name="task" onChange={this.handleChange}/>
                        <button>Update it</button>
                    </form>
                </div>
            )
        }
        return result;
    }
}


export default Todo