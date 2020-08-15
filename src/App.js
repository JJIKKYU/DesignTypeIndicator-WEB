import React, { Component } from 'react';
// import logo from './logo.svg';
// import logo from '../public/image/logo.png';
import './App.css';

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
    page : 0
  }

  handleClick = () => {
    this.setState({
      page : this.state.page + 1
    });
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

          <input type="button" className="startBox" onClick={ function(ev) {
            this.handleClick();
            console.log(this.props.page);
            
          }.bind(this)} value={this.state.page === 0 ? "DPTI START" : "알겠어요!"}/>
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
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    button : 0
  }

  handleClick = () => {
    this.setState(
      {
        button : this.props.button
      }
    );
  }

  render() {
    return(
      <>
      <input type="Button" className="selectBox" value={this.props.text} onClick={function()
      {
        console.log(this.state.button);
      }.bind(this)}>
      </input>
      </>
    );
  }
}

class SurveyCard extends Component {
  render() {
    const answerList = [
      "맞아요 매우 그래요",
      "맞는것 같아요",
      "그냥 그래요",
      "아닌것 같아요",
      "아니요 저는 안그래요"
    ]
    return(
      <>
      <div className="surveyBox">
        <h1>Q{this.props.number}.</h1>
          <p>{this.props.title}</p>
          <SurveySelectBox text="맞아요 매우 그래요" button="0"></SurveySelectBox>
          <SurveySelectBox text="맞는것 같아요" button="1"></SurveySelectBox>
          <SurveySelectBox text="그냥 그래요" button="2"></SurveySelectBox>
          <SurveySelectBox text="아닌것 같아요" button="3"></SurveySelectBox>
          <SurveySelectBox text="아니요 저는 안그래요" button="4"></SurveySelectBox>
          
        </div>
      </>
    );
  }
}

class Survey extends Component {
  render() {
    const questionList = [
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
      "의견을 결정해야 할 때 너의 의견을 어필하는 편이니?",
    ]
    const question = questionList.map((questionText, index) => (<SurveyCard key={index + 1} number={index + 1} title={questionText}></SurveyCard>));

    return(
      <>

      
      <div className="main">
        <div className="mainCenter" id="surveyMainCenter">
          {question}
          {/* <SurveyCard number="1" title="의견을 결정해야 할 때 너의 의견을 어필하는 편이니?"></SurveyCard>
          <SurveyCard number="2" title="혼자만의 시간을 가지면서 에너지를 충전하는 편이니?"></SurveyCard>
          <SurveyCard number="2" title="혼자만의 시간을 가지면서 에너지를 충전하는 편이니?"></SurveyCard>
          <SurveyCard number="2" title="혼자만의 시간을 가지면서 에너지를 충전하는 편이니?"></SurveyCard>
          <SurveyCard number="2" title="혼자만의 시간을 가지면서 에너지를 충전하는 편이니?"></SurveyCard>
          <SurveyCard number="2" title="혼자만의 시간을 가지면서 에너지를 충전하는 편이니?"></SurveyCard>
          <SurveyCard number="2" title="혼자만의 시간을 가지면서 에너지를 충전하는 편이니?"></SurveyCard> */}
        </div>
      </div>
      </>
    );
  }
}

function App() {
  var currentPage = 0;

  return (
    <>
    {/* <MainScreen page={currentPage}></MainScreen> */}
    <Survey></Survey>
    </>
  );
}

export default App;
