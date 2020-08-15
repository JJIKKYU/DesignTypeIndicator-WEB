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
    this.props.onSubmit(2);
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
    this.eventHandler = this.eventHandler.bind(this);
  }

  state = {
    type : 'A',
    button : 0,
  }

  eventHandler = (e) => {
    console.log("name : " + e.target.name +", " + "value : " + e.target.value);

    this.setState ({
      [e.target.name] : e.target.value
    });
    // this.props.handler();

    if (e.target.name == 4) {
      for (var i = 0; i < 4; ++i) {
        console.log("i : " + this.state.[i]]);
      }
    }
  }

  render() {
    return(
      <>
      <input className="checkBoxBtn" type="radio" name={this.props.id} id={"Q" + this.props.id + this.state.button}
      value={"Q" + this.props.id + "-" + this.state.button} onClick={function()
      {
        console.log(this.state.type + this.state.button);
        console.log("Q" + this.props.id + "-" + this.state.button);
        // this.props.handler()
      }.bind(this)}
      onChange={this.eventHandler}
      />
      <label for={"Q" + this.props.id + this.state.button} className="selectBox">{this.props.text}</label>
      </>
    );
  }
}

class SurveyCard extends Component {
  constructor(props) {
    super(props);
    this.state.number = this.props.number;
    // this.state.isHidden = this.props.isHidden;

    this.hiddenState = this.hiddenState.bind(this);
  }

  state = {
    number : 0,
    opacity : 1
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

  handleInputChange = (event) => {
    // event.preventDefault();

    console.log("handleInputChange() 호출!" + event);
    // const target = event.target;
    // const name = target.name;
  }

  hiddenState = () => {

    this.setState ({
      opacity : 1
    });

    // if (this.state.isHidden == true)
    // {
    //   console.log("카드를 숨깁니다.");
    //   return "0.3";
    // }
    // else {
    //   console.log("카드를 숨기지 않습니다");
    //   return "1";
    // }

  }

  render() {
    const answerList = [
      "맞아요 매우 그래요",
      "맞는것 같아요",
      "그냥 그래요",
      "아닌것 같아요",
      "아니요 저는 안그래요"
    ]

    const answers = answerList.map((answerText, index) => (<SurveySelectBox id={this.state.number} text={answerText} button={index} type={this.checkType()} handler={this.handleInputChange}></SurveySelectBox>));

    let hiddenStyle = {
      opacity : this.state.opacity
    }

    return(
      <>
      <div style={hiddenStyle} className="surveyBox">
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
    this.state.currentXpos = -225;
    this.state.xPosTransitionStep = 454;
    this.state.maxSurveycnt = 24;
    this.nextSurveyCard = this.nextSurveyCard.bind(this);
  }

  state = {
    currentXpos : -225,
    xPosTransitionStep : 454,
    currentSurvey : 1,
    maxSurveycnt : 24,
    progressBar : (100 * (1 / 24)),
    isHidden : false
  }

  nextSurveyCard = () => { 
    // this.state.currentSurvey
    if (this.state.currentSurvey == 24)
    {
      console.log("결과를 처리중입니다");
      this.props.onSubmit(3);
      return;
    }

    // 안 클릭했을 때를 체크
    var selectbuttons = document.getElementsByName(this.state.currentSurvey);
    var checkCount = 0;
    for (var i = 0; i < selectbuttons.length; ++i) {
      if (selectbuttons[i].checked == true) {
          checkCount += 1;
          break;
      }        
    }

    if (checkCount == 0)
    {
      // alert("체크해주세요!");
      console.log("체크해주세요!");
      // return;
    }

    const finalXpos = this.state.currentXpos - this.state.xPosTransitionStep;
    this.setState ({
      currentXpos : finalXpos,
      currentSurvey : this.state.currentSurvey + 1,
      progressBar : this.state.progressBar + (100 * (1 / 24))
    });

    console.log("현재 진행 중인 문제 : " + this.state.currentSurvey);
  }

  makeSurveyCardHidden = (props) => {
    console.log(props + "를 받았습니다");
    console.log("hidden으로 변경");
  }

  questionRender = () => {
    const questionList = [
      "모두가 ‘예’라고 말할 때 ‘아니오’라고 말할 수 있어",
      "조별과제는 내 영혼을 지치게하는 형벌이야",
      "나는 팀 프로젝트를 할 때 본래의 지능을 되찾는 것 같아...!",
      "고도의 문명사회에서 원격 협업방식을 이용하지 않는것은 죄악이야",
      "내 방에서 작업을 진행하면, 한마리 게으른 굼뱅이가 되기도 해",
      "아이디어 회의는 사실 친구들과 떠드는 시간이야",
      "나는 돈보다는 내 경험치를 쌓는게 중요해",
      "결과에 자신이 없으면 도전을 미루기도 해",
      "원하는 느낌이나 사물을 다른 것들에 비유해서 설명하곤 해",
      "지금 실현될 수 없는 디자인은 그다지 재미없어",
      "아이디어가 떠오르지 않으면 떠오를 때까지 멍을 때리기도 해",      
      "파일명은 언제나 규칙적으로, 정해진 형식으로 지어",
      "취향저격 감성 디자인에 논리는 사치야...!",
      "개인의 의견보다는 정해진 법칙을 지키는게 중요해",
      "말을 하다가 사람들 눈치가 보이면 슬금슬금 내용을 바꿔",
      "나는 일을 했을 뿐인데, 사람들이 차갑다고 하기도 해",
      "프로젝트를 잘 못끝내도, 팀원들과 친해졌다면야 괜찮아~",
      "친한 친구들과 작업을 할 때는 친구가 아닌 동업자라고 생각해",
      "할 일들은 모아서 한번에! 원기옥처럼 해결해",
      "나는 어떤 일에든 확고한 목표가 있어!",
      "무언가 집중해서 하다보면 주변이 돼지우리가 되어있어...",
      "모든 일에는 순서가 있는 법! 항상 정해진 순서를 따라서 작업해",
      "여긴 어디, 나는 누구. 작업을 하다보면 어느새 딴생각에 푹 빠져있어",
      "땡땡땡! 쉬는시간이 되면 무조건 쉬고, 일할 시간이 되면 꼭 일을 해"
    ]

    const question = questionList.map((questionText, index) => (<SurveyCard key={index + 1} number={index + 1} title={questionText} isHidden={this.makeSurveyCardHidden}></SurveyCard>));
    return question;
  }

  render() {

    let cardMove = {
      transform : "translate(" + this.state.currentXpos + "px)"
    }

    let progress = {
      width : this.state.progressBar + "%"
    }

    return(
      <>
      <div className="main">
        <div className="surveyHeader">
          <img className="headerLogo" src="/images/logo.png" alt=""/>
          <p>{this.state.currentSurvey} / 24</p>
          <img className="xButton" src="/images/X.png" alt=""/>
          <div className="progressBarBG">
            <div style={progress} className="progressBar"></div>
          </div>
        </div>
        {/* <div className="blurBox"> */}

        {/* </div> */}
        <div style={cardMove} id="surveyMainCenter">
          {/* {question} */}
          {this.questionRender()}
        </div>
        <div className="buttonDiv">
          <input type="button" className="nextBox" value="다음으로" onClick={this.nextSurveyCard}></input>
        </div>
        
      </div>
      </>
    );
  }
}

class ResultCalculate extends Component {
  constructor(props) {
    super(props);
  }

  state = {

  }

  render() {
    let progress = {
      width : "100%"
    }

    return(
      <>
      <div className="main">
        <div className="surveyHeader">
          <img className="headerLogo" src="/images/logo.png" alt=""/>
          <p>24 / 24</p>
          <img className="xButton" src="/images/X.png" alt=""/>
          <div className="progressBarBG">
            <div style={progress} className="progressBar"></div>
          </div>
        </div>

        <div className="surveyMainCenter">
          <img src="/images/card_0.png"></img>
          <img src="/images/card_1.png"></img>
          <img src="/images/card_2.png"></img>
          <img src="/images/card_3.png"></img>
        </div>
        <p className="calcText">결과를 추출중이야! <br/>조금만 기다려줘!</p>
      </div>
      
      </>
    );
  }
}

class Result extends Component {
  constructor(props) {
    super(props);
  }

  state = {

  }

  render() {
    return(
      <>
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
      return <MainScreen page={this.state.currentPage} onSubmit={this.onSearchSubmit} ></MainScreen>;
    else if (this.state.currentPage == 2)
      return <Survey onSubmit={this.onSearchSubmit}></Survey>;
    else if (this.state.currentPage == 3)
      return <ResultCalculate></ResultCalculate>
    else if (this.state.currentPage == 4)
      return <Result></Result>
  }

  render()
  {
    return (
      <>
      {this.screenRender()}
      {/* <ResultCalculate></ResultCalculate> */}
      {/* <MainScreen page={this.state.currentPage} onSubmit={this.onSearchSubmit} ></MainScreen> */}
      {/* <Survey></Survey> */}
      </>
    );
  }
}

export default App;
