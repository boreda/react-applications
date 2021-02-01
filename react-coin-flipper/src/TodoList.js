import React, {Component} from 'react'
import Todo from './Todo'
import ToDoForm from './ToDoForm'

class TodoList extends Component{
    constructor(props){
        super(props)
        this.state={
            todos: []
        }
        this.create = this.create.bind(this)
        this.remove = this.remove.bind(this)
        this.edit = this.edit.bind(this)
    }
    create(todo){
        this.setState({
            todos: [...this.state.todos, todo]
        })
    }
    remove(id){
        this.setState({
             todos: this.state.todos.filter(td=> td.id!==id)
        })
    }
    edit(id, updateToDo){
        const update = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, task: updateToDo}
            } else {
                return todo
            }
        })  
        this.setState({
            todos: update
        })
    }
    render(){
        const toDoComponent = this.state.todos.map(t=><Todo task={t.task} key={t.id} id={t.id} remove={this.remove} edit={this.edit}/>)
        return(
            <div>
                <ToDoForm create={this.create} />
                <ul>{toDoComponent}</ul>
            </div>
        )
    }
}
export default TodoList