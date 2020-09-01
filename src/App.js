import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom"
import './App.css';
import './Main.css';
import './Gender.css';
import './Calculator.css';

// Survey.js
import Survey from './components/Survey'
// Result.js
import Result from './components/Result'
// Main.js
import Main from './components/Main'
// Gender.js
import Gender from './components/Gender'
// Calc.js
import Calc from './components/Calc'

class App extends Component {
  constructor(props) {
    super(props);
    console.log("APP Constructor");

    this.state = {
      gedner : "",
      survey : [
        {
          select : {
          },
        }
      ],
    }
  }
  
  surveyProgress = (targetName, targetValue) => {
    this.setState ({
      survey : [
        {
          select : {
            ...this.state.survey[0].select,
            [targetName] : targetValue,
          }
          
        }
      ]
    }, () => {
      // console.log(JSON.stringify(this.state.survey) + "App.js");
    });
  }

  genderSelect = (props) => {
    console.log("gender정보를 받았습니다 : " + props);
    this.setState ({
      gender : props
    })
  }

  finalResult = (props) => {
    console.log("최종 결과를 받았습니다 : " + props);
    this.setState ({
      result : props
    })
  }

  render() {
    return(
        <>
        <Router>
          {/* {this.screenRender()} */}
          {/* <Main></Main> */}
          {/* <Survey></Survey> */}
          {/* <Result></Result> */}
          {/* <Gender></Gender> */}
          <Route exact persist path="/" component={Main} />
          <Route path="/surveyInformation" 
          render={() => <Gender genderSelect={this.genderSelect}></Gender>} />
          <Route path="/survey" 
          render={() => <Survey surveyProgress={this.surveyProgress}></Survey>} />
          <Route path="/calc" 
          render={() =>
          <Calc surveyResult={this.state.survey} finalResult={this.finalResult}></Calc>} />
          <Route
            path="/result/:type" 
            render={(match) =>
            <Result match={match} gender={this.state.gender}></Result>} />
        </Router>
      </>
    );
  }
}

export default App;
