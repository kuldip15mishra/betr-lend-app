import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, Form} from 'react-bootstrap';
import SliderAmount from './SliderAmount';
import SliderDuration from './SliderDuration';
import RightSide from './RightSide';
import HttpClient from "../services/api"
import {EndPointsName} from '../config/configuration';
class LoanCalculator extends Component {


    constructor(props) {
        super(props);
        
        // SET STARTER CALCULATUION

        let MPR = this.props.APR1 / 100 / 12;
        let amount = this.props.valueA;
        let duration = this.props.valueD;
        let totalAmountToRepay = amount+((amount*MPR)*duration) ;
        let monthly = totalAmountToRepay / duration;


        // save props values in to the state
        this.state = {

            valueAmount: this.props.valueA,
            stepAmount: this.props.stepA,
            maxAmount: this.props.maxA,
            minAmount: this.props.minA,

            valueDuration: this.props.valueD,
            stepDuration: this.props.stepD,
            maxDuration: this.props.maxD,
            minDuration: this.props.minD,

            rateOfInterest: 0,
           
            monthlyInst: Math.round(monthly).toFixed(),

        };
    }
   
    //Event Handling for Slider change
    update( e ){
        // Assign to let changedID ID of slider which has been changed
        let changedID = e.target.id;
        let value = e.target.value;
        if (changedID === 'sliderAmount') {
            this.setState({valueAmount: e.target.value});
               }
        if (changedID === 'sliderDuration'){
            this.setState({valueDuration: e.target.value});
            }


        this.calculate(changedID, value);
    }

  

    //Get Slider value
    getSlidervalue(id, value){
        let amount, duration;
       
        // if calculate is after Duration is changed take value of duration from slider, but value of amount from state
        if (id === 'sliderDuration') {
            duration = parseFloat(value);
            amount = parseFloat(this.state.valueAmount);
        }
        // if calculate is after Amount is changed take value of Amount from slider, but value of duration from state
        else if (id === 'sliderAmount'){
            amount = parseFloat(value);
            duration = parseFloat(this.state.valueDuration);
        }
        // if calculate is after button credit history clicked  take values from state
        else {
            amount = parseFloat(this.state.valueAmount);
            duration = parseFloat(this.state.valueDuration);
           
        }

        return { amount, duration}
    }

    //Calculate the Interest rate and Monthly installments
    calculate(id, value){

        //Fetching the Slider value for every change
        let {amount, duration}= this.getSlidervalue(id, value);
       
     
        //Make Http call for getting Data for given parameters
        this.getInterestAndAmount(amount,duration)
        .then(response => {
            if (response && response.data && response.data.monthlyPayment && response.data.nominalInterestRate) {
                //save results into state
                this.setState({monthlyInst: response.data.monthlyPayment.amount});
                this.setState({rateOfInterest: response.data.nominalInterestRate});
            } else {
              return null;
            }
          })
          .catch(error => {
            console.log(error);
          });
        
      


    }

    //Function to make API call 
    getInterestAndAmount (amount,months){
        const httpClient = new HttpClient();
        let params ={
            amount :amount,
            numMonths:months
        }
        let url =EndPointsName.EndPoint_Loan;  // End point for Loan API interest.
        return httpClient.get(url,null,params)
         
    }

    //Renderer
    render()
    {
        return(
            <Grid className="show-grid mainContainer">
                <Row>
                    <Col className="leftSide" xs={12} md={6}>
                       
                            <SliderAmount
                                value={this.state.valueAmount}
                                min={this.state.minAmount}
                                max={this.state.maxAmount}
                                onChange={this.update.bind(this)}
                                step={this.state.stepAmount}
                                currancy={this.props.currancy}
                            />
                            </Col>

                             <Col className="leftSide" xs={12} md={6}>
                            <SliderDuration
                                value={this.state.valueDuration}
                                min={this.state.minDuration}
                                max={this.state.maxDuration}
                                onChange={this.update.bind(this)}
                                step={this.state.stepDuration}
                            />
                      
                    </Col>

                  
               </Row>
               <RightSide
                        currancy={this.props.currancy}
                       
                        monthly={this.state.monthlyInst}
                        rateOfInterest={this.state.rateOfInterest}
                        btnOnClick={this.update.bind(this)}
                    />
            </Grid>
        );
    }
}

//Assign Types for props
LoanCalculator.propTypes = {

    valueD: React.PropTypes.number,
    stepD: React.PropTypes.number,
    maxD: React.PropTypes.number,
    minD: React.PropTypes.number,

    valueA: React.PropTypes.number,
    stepA: React.PropTypes.number,
    maxA: React.PropTypes.number,
    minA: React.PropTypes.number,
   
    currancy: React.PropTypes.string,
};

// Assign deafault values to props
LoanCalculator.defaultProps = {
    valueD: 24,
    stepD: 12,
    maxD: 72,
    minD: 12,

    valueA : 2000,
    stepA : 500,
    maxA : 10000,
    minA : 1000,

    APR1: 3.3,
    APR2: 9.6,
    APR3: 17.4,

    currancy: '£',
};

export default LoanCalculator;

