import React, { Component } from 'react';

class TlYear extends Component {
    render() {
        return (
            <g className="year">
                {this.props.content}
            </g>
        );
    }
}

export default TlYear;