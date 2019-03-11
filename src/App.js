import React, { Component,Fragment } from 'react';
import LoanCalculator from './components/LoanCalculator';
import {config} from './config/configuration';
class App extends Component {
  render() {
    return (
      <div>
        <LoanCalculator 
        valueD={config.minDuration}    
        stepD={config.stepDuration}  
        maxD= {config.maxDuration}    
        minD= {config.minDuration}     

        valueA={config.minAMount}
        stepA= {config.stepAmount} 
        maxA={config.maxAmount}   
        minA={config.minAMount}
        />
      </div>
    );
  }
}

export default App;
