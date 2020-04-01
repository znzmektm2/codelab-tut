import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        }
    }

    handleToggle = () => {
        if(this.props.isSelected) {
            this.setState({
                isEdit: !this.state.isEdit,
            });
        } 

        if(!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {
            this.handleEdit();
        }
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleEdit = () => {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleKeyPress = (e) => {
        if(e.charCode===13) {
            this.handleToggle();
        }
    }

    render() {
        const details = (
            <div>
                <div>{this.props.contact.name}</div>
                <div>{this.props.contact.phone}</div>
            </div>
        );
        // details 안에 내용도 jsx이기 때문에 div로 감싸줘야 한다.
        
        const edit = (
            <div>
                <div><input type="text" name="name" placeholder={"name"} value={this.state.name} onChange={this.handleChange} /></div>
                <div><input type="text" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange} 
                    onKeyPress={this.handleKeyPress} /></div>
            </div>
        );
        const view = this.state.isEdit ? edit : details;
        const blank = (<div>Not Selected</div>);

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle}>{this.state.isEdit ? 'Ok' : 'Edit'}</button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }
}

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error('onRemove not defined'); },
    onEdit: () => { console.error('onEdit is not defined'); }
};

export default ContactDetails;