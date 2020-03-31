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

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    } 

    handleClick = (key) => {
        this.setState({
            selectedKey: key
        });

        console.log(key, 'is selected!');
    }

    handleCreate = (contact) => {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove = () => {
        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]] }    
            ),
            sekectedKey: -1
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
            data.sort(function(a, b) {
                // 배열 이름 순으로 나열하기
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
            }); 
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
                <ContactDetails isSelected={this.state.selectedKey != -1} contact={this.state.contactData[this.state.selectedKey]}/>
                <ContactCreate onCreate={this.handleCreate} />
            </div>
        );
    }
}

export default Contact;