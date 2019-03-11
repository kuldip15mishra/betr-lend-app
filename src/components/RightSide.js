
import React, { Component,PureComponent } from 'react';
import { Col} from 'react-bootstrap';


class RightSide extends PureComponent {
    render() {
        return (
            
                <row>
            <Col className="rightSide" xs={12} md={6}>
                <h4>Monthly instaltment</h4>
                <span className="monthlyInstDisplay">{this.props.currancy}{this.props.monthly}</span>
               
                </Col>
                
                <Col className="rightSide" xs={12} md={6}>
                <h4>Rate Of Interest</h4>
                <span className="aprDisplay">{this.props.rateOfInterest}%</span>

               

            </Col>
            </row>

        )
    }
}

export default RightSide;