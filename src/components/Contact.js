import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ConctactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [
                { name: 'Abet', phone: '010-0000-0001' },                
                { name: 'Charlie', phone: '010-0000-0003' },
                { name: 'Betty', phone: '010-0000-0002' },
                { name: 'David', phone: '010-0000-0004' }
            ]
        }        
    }

    componentWillMount() { //컴포넌트가 돔 위에 생기기 전에 실행되는 API
        const contactData = localStorage.contactData;
        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState) { //컴포넌트 state가 업데이트 될 때마다 실행되는 API
        if(JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }
 
    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    } 

    handleClick = (key) => {
        this.setState({
            selectedKey: key
        });
    }

    handleCreate = (contact) => {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove = () => {
        if (this.state.selectedKey < 0){
            return;
        }

        this.setState({
            contactData: update(this.state.contactData, { $splice: [[this.state.selectedKey, 1]] } ),
            selectedKey: -1
        });
    }

    handleEdit = (name, phone) => {
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )
        });
    }

    render() {        
        const mapToComponent = (data) => {
            data.sort(); 
            data = data.filter((contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            });
            return data.map((contact, i) => {
                return (<ContactInfo contact={contact} key={i} onClick={()=>{this.handleClick(i)}}/>);
            });
        };
        
        
        return (
            <div>
                <h1>Contacts</h1>
                <input name="keyword" placeholder="Search" value={this.state.keyword} onChange={this.handleChange}/>
                { mapToComponent(this.state.contactData) }
                <ContactDetails 
                    onRemove={this.handleRemove} 
                    isSelected={this.state.selectedKey !== -1} 
                    contact={this.state.contactData[this.state.selectedKey]}
                    onEdit={this.handleEdit}
                />
                <ContactCreate onCreate={this.handleCreate} />
            </div>
        );
    }
}

export default Contact;