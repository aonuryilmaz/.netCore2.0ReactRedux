import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Layout extends Component {
    render() {
        return (
            <div className='container-fluid'>                
                {this.props.children}
            </div>
        );
    }
}


export default Layout;
