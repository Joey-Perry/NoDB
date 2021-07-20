import React, { Component } from 'react';
import './updateForm.css';
import {v4 as uuidv4} from 'uuid';

class UpdateForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: '',
            text: '',
            updatedBy: '',
            updatedOn: '',
            concernLevel: '-1'
        }
    }
    updateState = (e) => {
        const newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    closeForm = (e) => {
        /* close update form */
        e.preventDefault();
        if (!this.props.edit){
            this.props.closeForm();
        } else {
            this.props.closeEditForm();
        }
    }

    componentDidMount(){
        if (this.props.edit){
            const { id, text, updatedBy, updatedOn, concernLevel } = this.props.info;
            this.setState({ id, text, updatedBy, updatedOn, concernLevel });
        } 
    }

    submitUpdate = (e) => {
        e.preventDefault();
        const {id, text, updatedBy, updatedOn, concernLevel} = this.state;
        const body = { id, text, updatedBy, updatedOn, concernLevel };

        if (this.props.info === undefined){
            const id = uuidv4();
            body.id = id;
            this.props.addUpdate(this.props.id, body);
        } else {
            this.props.editUpdate(this.props.id, body);
            this.closeForm(e);
        }
    }

    render(){
        const { text, updatedBy, updatedOn, concernLevel } = this.state;
        // console.log(this.state);

        return (
            <form className='updates-form'>
                <button onClick={this.closeForm}>Close </button>
                <label>Text: <input name='text' onChange={this.updateState} value={text}/></label>
                <label>Updated by: <input name='updatedBy' onChange={this.updateState} value={updatedBy}/></label>
                <label>Updated on: <input name='updatedOn' onChange={this.updateState} value={updatedOn}/></label>
                <label> Concern Level:
                        <select value={concernLevel} onChange={this.updateState} name='concernLevel'>
                            <option value='-1' default disabled>Choose one: </option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                </label>
                <button onClick={this.submitUpdate}> Submit </button>
            </form>
        )
    }
}

export default UpdateForm;