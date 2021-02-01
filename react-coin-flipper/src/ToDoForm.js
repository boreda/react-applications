import React from 'react'

class ToDoForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            task: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.create({...this.state, id: Math.floor(Math.random()*10)})
        this.setState({
            task: ""
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="todo">New Todo</label>
                <input 
                    type="text" 
                    placeholder="Enter the task" 
                    value={this.state.task} 
                    name="task" 
                    id="todo"
                    onChange={this.handleChange}
                />
                <button>Add To Do</button>
            </form>
        )
    }
}
export default ToDoForm