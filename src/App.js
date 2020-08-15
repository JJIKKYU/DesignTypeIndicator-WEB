import React, { Component } from 'react';
// import logo from './logo.svg';
// import logo from '../public/image/logo.png';
import './App.css';
import { render } from '@testing-library/react';

window.page = 0;

class CircleTitle extends Component {
  render() {
    return(
      <>
        <p className="subTitle">디자이너 모여라! 다 모여!</p>
        <img src="/images/logo.png"></img>
        <div className="mainLine"></div>
        <img src="/images/DPTI.png"></img>
        <p className="questionText">너 혹시 디자이너니? <br></br> 그럼 어떤 디자이너니?</p>
      </>
    );
  }
}

class Infomation extends Component {
  render() {
    return (
      <>
        <p className="infoText">
        디자인 성향 검사 <br/>
        <span className="infoHighlight">DPTI (Design Pattern Type Indicator)</span>는 <br/>
        자신의 디자인 성향을 파악할 수 있는 테스트입니다. <br/>
        총 <span className="infoHighlight">20문항</span>으로 이루어져 있으며 <br/>
        약 <span className="infoHighlight">3분</span>의 시간이 소요됩니다. <br/>
        <br/>
        <span className="infoHighlight">질문을 깊게 생각하지 마시고 직관적으로 선택해주세요!</span> </p>
        <div className="mainLine" id="longLine"></div>
      </>
    );
  }
}

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {page : 0};

    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    page : 0,
    buttonText : "DPTI START"
  }

  handleClick = () => {
    console.log(this.state.page);
    if (this.state.page == 1) {
      this.handleClickTest();
    }
    else
    {
      this.setState({
        page : this.state.page + 1
      });
    }
    
  }

  handleClickTest = () => {
    this.props.onSubmit(100);
  }

  render() {
    return(
    <>
      <div className="main">
        <div className="mainCenter">
          <div className="dptiMainCircle">
            <div id="center">
              {this.state.page === 0 ? <CircleTitle></CircleTitle> : <Infomation></Infomation>}          
            </div>
          </div>
          
          <div className={this.state.page === 0 ? "participantBox" : "participantBoxHidden"}>
            <span className="participantTitle">현재까지 응시자 수</span>
            <span className="participantNum">159,753명</span>
          </div>

          <form onSubmit={this.handleClickTest}><input type="button" className="startBox" onClick={ function(ev) {
            this.handleClick();
            
          }.bind(this)} value={this.state.page === 0 ? "DPTI START" : "알겠어요!"}/></form>
          <p className="mainCopyright">copyright 2020. SJS all right reserved</p>
        </div>
      </div>
    </>
    );
  }
}

class SurveySelectBox extends Component {
  constructor(props)
  {
    super(props);
    this.state.button = this.props.button
    this.state.type = this.props.type
  }

  state = {
    type : 'A',
    button : 0
  }
  render() {
    return(
      <>
      <input type="Button" className="selectBox" value={this.props.text} onClick={function()
      {
        console.log(this.state.type + this.state.button);
      }.bind(this)}>
      </input>
      </>
    );
  }
}

class SurveyCard extends Component {
  constructor(props) {
    super(props);
    this.state.number = this.props.number;
    console.log("초기화가 되었습니다 : " + this.state.number);
  }

  state = {
    number : 0
  }

  checkType = () => {
    if (this.state.number < 5)
      return 'A';
    else if (this.state.number < 10)
      return 'B';
    else if (this.state.number < 15)
      return 'C';
    else if (this.state.number < 20)
      return 'D';
  }

  render() {
    const answerList = [
      "맞아요 매우 그래요",
      "맞는것 같아요",
      "그냥 그래요",
      "아닌것 같아요",
      "아니요 저는 안그래요"
    ]

    const answers = answerList.map((answerText, index) => (<SurveySelectBox text={answerText} button={index} type={this.checkType()}></SurveySelectBox>));

    return(
      <>
      <div className="surveyBox">
        <h1>Q{this.state.number}.</h1>
          <p>{this.props.title}</p>
          {answers}
          
        </div>
      </>
    );
  }
}

class Survey extends Component {

  constructor(props) {
    super(props);
    // this.state.currentXpos = -225;
    // this.state.xPosTransitionStep = 450;

    this.nextSurveyCard = this.nextSurveyCard.bind(this);
  }

  state = {
    currentXpos : -226,
    xPosTransitionStep : 454,
  }

  nextSurveyCard = () => { 
    const finalXpos = this.state.currentXpos - this.state.xPosTransitionStep;

    this.setState ({
      currentXpos : this.state.currentXpos - this.state.xPosTransitionStep
    });
    console.log(this.state.currentXpos);
  }

  render() {
    const questionList = [
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
    ]
    const question = questionList.map((questionText, index) => (<SurveyCard key={index + 1} number={index + 1} title={questionText}></SurveyCard>));

    // let step = 450;
    // let currentXpos = -225;  
    let test = {
      transform : "translate(" + this.state.currentXpos + "px)"
    }

    return(
      <>
      <div className="main">
        <div className="surveyHeader">
          <img className="headerLogo" src="/images/logo.png" alt=""/>
          <p>2 / 20</p>
          <img className="xButton" src="/images/X.png" alt=""/>
          <div className="progressBarBG">
            <div className="progressBar"></div>
          </div>
        </div>
        <div style={test} id="surveyMainCenter">
          {question}
        </div>
        <div className="buttonDiv">
          <input type="button" className="nextBox" value="다음으로" onClick={this.nextSurveyCard}></input>
        </div>
        
      </div>
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage : 0};
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  
  state = {
    currentPage : 0
  }

  onSearchSubmit(props) {
    this.setState({
      currentPage : props
    });
  }

  screenRender() {
    if (this.state.currentPage < 1)
    {
      return <MainScreen page={this.state.currentPage} onSubmit={this.onSearchSubmit} ></MainScreen>;
    }
    else if (this.state.currentPage >= 1)
    {
      return <Survey></Survey>;
    }
  }

  render()
  {
    return (
      <>
      {/* {this.screenRender()} */}
      {/* <MainScreen page={this.state.currentPage} onSubmit={this.onSearchSubmit} ></MainScreen> */}
      <Survey></Survey>
      </>
    );
  }
}

export default App;
