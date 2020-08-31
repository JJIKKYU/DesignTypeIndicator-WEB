import React, { Component } from 'react';
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

    this.state = {
      page : 4,
      gedner : "",
      survey : [
        {
          select : [],
        }
      ],
      result : "",
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

  finalResult = (props) => {
    console.log("최종 결과를 받았습니다 : " + props);
    this.setState ({
      result : props
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
        return <Calc nextPage={this.nextPage} surveyResult={this.state.survey} finalResult={this.finalResult}></Calc>
      case 4:
        return <Result nextPage={this.nextPage} finalResult={this.state.finalResult}></Result>
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
