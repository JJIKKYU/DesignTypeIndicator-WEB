import React, { Component } from 'react';
import './App.css';
import './Main.css';
import './Gender.css';

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

    this.state = {
      page : 3,
      gedner : "",
      survey : [
        {
          select : [],
        }
      ]
    }
  }

  // nextPage
  nextPage = (props) => {
    this.setState ({
      page : props
    })
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
      console.log(this.state.survey);
    });
  }

  genderSelect = (props) => {
    console.log("gender정보를 받았습니다 : " + props);
    this.setState ({
      gender : props
    })
  }

  screenRender = () => {
    switch (this.state.page) {
      case 0:
        return <Main nextPage={this.nextPage}></Main>
      case 1:
        return <Gender nextPage={this.nextPage} genderSelect={this.genderSelect}></Gender>
      case 2:
        return <Survey nextPage={this.nextPage} surveyProgress={this.surveyProgress}></Survey>
      case 3:
        return <Calc></Calc>
      case 4:
        return <Result></Result>
      default:
        break;
    }
  };

  render() {
    return(
        <>
        {this.screenRender()}
        {/* <Main></Main> */}
        {/* <Survey></Survey> */}
        {/* <Result></Result> */}
        {/* <Gender></Gender> */}
      </>
    );
  }
}

export default App;
