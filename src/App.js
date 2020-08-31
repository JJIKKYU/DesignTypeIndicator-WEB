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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page : 0,
      survey : [
        {
          gender : "",
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

  surveyProgress = (props) => {
    console.log(props[0].gender + "를 받았습니다 (App.js)");
    this.setState ({
      survey : props
    })
  }

  screenRender = () => {
    switch (this.state.page) {
      case 0:
        return <Main nextPage={this.nextPage}></Main>
      case 1:
        return <Gender nextPage={this.nextPage} surveyProgress={this.surveyProgress}></Gender>
      case 2:
        return <Survey></Survey>
      case 3:
        return <Result></Result>
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
