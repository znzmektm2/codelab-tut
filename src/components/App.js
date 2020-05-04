import React, { Component } from 'react';
import Contact from './Contact';
import Test from './LifeCycle/Test';

class App extends Component {
    
    render() {
        return (
            <div>
                <Test/>
                ==============================
                {/* <Contact />  */}
            </div>
        );
    }
}

export default App;