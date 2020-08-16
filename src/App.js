import React, { Component, useEffect } from 'react';
import { database } from "@react-firebase/database";
import 'firebase/database'
import { fire, getFireDB, setFireDB } from './firebase.config'
import './App.css';
import { render } from '@testing-library/react';
const databaseURL = "https://dpti-85ab7.firebaseio.com/";
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
    this.state = {
      page : 0,
      people: 0
    };
    fire();
    getFireDB().then(res => {
      this.setState({
        people : res.val().people
      })
      console.log(res.val().people);
    });


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

  peopleData = () => {
    
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
            <span className="participantNum">{this.state.people}명</span>
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
    surveyResult : [
      {name : "", value : ""}
    ]
  }

  eventHandler = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    // console.log("name : " + targtName +", " + "value : " + tagetValue);

    this.setState({
      [targetName]: targetValue,
    }, () => {
      // console.log(this.state[targetName]);
      this.props.getStateSurvey(targetName, targetValue)
    });
  }

  render() {
    return(
      <>
      <input className="checkBoxBtn" type="radio" name={"Q" + this.props.id} id={"Q" + this.props.id + this.state.button}
      value={"Q" + this.props.id + "_" + this.state.button}
      onClick={function()
      {
        // console.log(this.state.type + this.state.button);
        // console.log("Q" + this.props.id + "-" + this.state.button);
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
    this.reverseSelectValue = this.reverseSelectValue.bind(this);
  }

  state = {
    number : 0,
    opacity : 1
  }

  // getStateSurvey = (targetName, targetValue) => {
  //   // event.preventDefault();

  //   console.log("handleInputChange() 호출!" + targetName + " , " + targetValue);
  //   // GetSurveyResult(targetName, targetvalue)
  //   this.setState({
  //     [targetName] : targetValue
  //   })
    
    /*
    const targetParse = targetName.split('Q')[1];

    if (targetParse <= 6)
    {
      console.log(targetParse);
    }
    else if (targetParse <= 12)
    {

    }
    else if (targetParse <= 18)
    {

    }
    else if (targetParse <= 24)
    {
    }
    console.log(targetValue.split('-')[1]);
    // const target = event.target;
    // const name = target.name;
    */
  // }

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

  reverseSelectValue = (index) => {

    // reverse 되는 문장 선택
    if (this.state.number == 3 || this.state.number == 5 || this.state.number == 6 ||
      this.state.number == 8 || this.state.number == 10 || this.state.number == 12 ||
      this.state.number == 14 || this.state.number == 16 || this.state.number == 18 ||
      this.state.number == 20 || this.state.number == 22 || this.state.number == 24
      ) {
      return index - 2;
    }
    else {
      return -index + 2;
    }
  }

  render() {
    const answerList = [
      "맞아요 매우 그래요",
      "맞는것 같아요",
      "그냥 그래요",
      "아닌것 같아요",
      "아니요 저는 안그래요"
    ]

    // const answers = answerList.map((answerText, index) => (<SurveySelectBox id={this.state.number} text={answerText} button={index - 2}getStateSurvey={this.props.GetSurveyResult}></SurveySelectBox>));

    const answers = answerList.map((answerText, index) => (<SurveySelectBox id={this.state.number} text={answerText} button={this.reverseSelectValue(index)}      
      getStateSurvey={this.props.GetSurveyResult}></SurveySelectBox>));

    return(
      <>
      <div id={"boxQ"+this.state.number} className="surveyBox">
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
    this.state.currentXpos = -210;
    this.state.xPosTransitionStep = 422;
    this.state.maxSurveycnt = 24;
    this.nextSurveyCard = this.nextSurveyCard.bind(this);
    this.getSurveyResult = this.getSurveyResult.bind(this);
  }

  state = {
    currentXpos : -210,
    xPosTransitionStep : 422,
    currentSurvey : 1,
    maxSurveycnt : 24,
    progressBar : (100 * (1 / 24)),
    isHidden : false
  }

  getSurveyResult = (targetName, targetValue) => {

    // Main App으로 전달
    this.props.surveyCalc(targetName, targetValue);

    // this.setState({
    //   [targetName.split('Q')[1]] : targetValue.split('-')[1]
    // })
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
    var selectbuttons = document.getElementsByName("Q"+this.state.currentSurvey);
    var checkCount = 0;
    for (var i = 0; i < selectbuttons.length; ++i) {
      if (selectbuttons[i].checked == true) {
          checkCount += 1;
          break;
      }        
    }
  
    if (checkCount == 0)
    {
      alert("체크해주세요!");
      // console.log("체크해주세요!");
      return;
    }

    var nextBox = document.getElementById("boxQ"+Number(this.state.currentSurvey + 1));
    nextBox.style.opacity = 1;
    if (this.state.currentSurvey > 0)
    {
      var prevBox = document.getElementById("boxQ"+Number(this.state.currentSurvey));
      prevBox.style.opacity = 0.2;
      console.log(prevBox);
    }

    const finalXpos = this.state.currentXpos - this.state.xPosTransitionStep;
    this.setState ({
      currentXpos : finalXpos,
      currentSurvey : this.state.currentSurvey + 1,
      progressBar : this.state.progressBar + (100 * (1 / 24))
    });

    console.log("현재 진행 중인 문제 : " + this.state.currentSurvey);
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

    const question = questionList.map((questionText, index) => (<SurveyCard key={index + 1} number={index + 1} title={questionText} isHidden={this.makeSurveyCardHidden} GetSurveyResult={this.getSurveyResult}></SurveyCard>));
    return question;
  }

  defaultCardOpacity =() => {
    var boxHidden = document.getElementById("boxQ1");
    console.log(boxHidden);
    // boxHidden.style.opacity = 1;
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
    this.checkType = this.checkType.bind(this);
    this.calcResult = this.calcResult.bind(this);
    console.log("constructor : " + this.props.typeA + ", " + this.props.typeB + ", " + this.props.typeC + ", " + this.props.typeD)
    this.checkType();
  }

  state = {

  }

  checkType() {
    let isTypeA = false;
    let isTypeB = false;
    let isTypeC = false;
    let isTypeD = false;

    if (Math.abs(this.props.typeA) < Math.abs(this.props.typeB)) {
      isTypeB = true;
    } else {
      isTypeA = true;
    }

    if (Math.abs(this.props.typeC) < Math.abs(this.props.typeD)) {
      isTypeD = true;
    } else {
      isTypeC = true;
    }

    let typeAB = "";

    // 예를들어 typeA가 -7이고 typeB가 5였다.
    // -12, 12
    // -1, 1
    // typeA * (1 / 12))
    if (isTypeA) {
      // E
      if (this.props.typeA < 0) {
        console.log("E");
        typeAB = "E";
      }
      // I
      else if (this.props.typeA >= 0) {
        console.log("I");
        typeAB = "I";
      }
    } else if (isTypeB) {
      // S
      if (this.props.typeB < 0) {
        console.log("S");
        typeAB = "S";
      }
      // N
      else if (this.props.typeB >= 0) {
        console.log("N");
        typeAB = "N";
      }
    }

    let typeCD = "";

    if (isTypeC) {
      // T
      if (this.props.typeC < 0) {
        console.log("T");
        typeCD = "T";
      }
      // F
      else if (this.props.typeC >= 0) {
        console.log("F");
        typeCD = "F";
      }
    } else if (isTypeD) {
      // J
      if (this.props.typeD < 0) {
        console.log("J");
        typeCD = "J";
      }
      // P
      else if (this.props.typeD >= 0) {
        console.log("P");
        typeCD = "P";
      }
    } 

    this.calcResult(typeAB, typeCD);

    
  }

  calcResult = (typeAB, typeCD) => {
    const type = typeCD + typeAB;
    console.log(type);
    // const type = ;
    
    let result = 
      {
        title : "",
        image : "",
        desc : "",
        position : "",
        design : [
          "", "", ""
        ],
        tools : [
          "", "", 
        ],
        todo : "",
        typeA : "",
        typeB : "",
        typeC : "",
        typeD : "",
      };
    

    switch (type) {
      case "TI":
        result.image = "resultGreen"
        result.title = "혼자 있고싶은 논리대장 디자이너";
        result.desc = "무슨 생각 중이야? 라는 말 많이 들어보셨죠? 당신은 객관적인 판단과 당위성을 중요시하는 이 시대의 논리 대장 디자이너! 전통과 규율에 얽매이는 딱딱함이 아니라, 이론과 논리를 중요시하고 작업을 진행함에 있어서 최대한 감정을 배제하는 이성의 결정체로, 주변 사람들에게 간혹 차갑다는 말을 들을 때도 있어요. 하지만 이성과 논리를 장착한 당신의 디자인은 모두에게 든든함을 안겨줄 거에요! 당신은 좀처럼 자신을 속이지 않으니까요!";
        result.position = "모든걸 기록하고 기억하는 팔만대장경!";
        result.design[0] = "UX";
        result.design[1] = "인포메이션";
        result.design[2] = "편집";
        result.tools[0] = "Tool_Name_Sketch";
        result.tools[1] = "Tool_Name_Illustrator";
        result.tools[2] = "Tool_Name_Indesign";
        result.todo = "사실 당신은 답을 알고 계실 거에요. 온전히 혼자 있는 시간이 필요하죠. 어떠한 방해 없이 혼자서 고민하고 쉬는 시간을 가져봤는데도 문제를 해결하거나 에너지를 충전하지 못하셨다면 한적한 거리를 산책하거나, 밀린 집안일이나 관심이 생겼던 취미처럼 작업과 전혀 상관없는 일을 해보는 것도 좋아요. 당신과 깊은 친밀감을 공유하는 사람과 대화를 나누는 것도 좋은 방법이랍니다!";
        break;
      case "TN":
        result.image = "resultGreen"
        result.title = "이상향을 겸비한 이성적인 디자이너";
        result.desc = "모두가 행복했으면 좋겠지만, 사실 그건 불가능한 일이지요? 디자인에서도 모두의 만족을 지향하지만, 모두가 100% 만족하는 디자인은 없다고 생각하기도 해요. 그래서 당신은 옳은 방향에 대해서 오랜 시간 생각하는 편이에요. 누군가 좋아하지 않을 수는 있지만 싫어할 수는 없는 길을 찾으려고요. 모두를 만족하게 하고 싶어 가끔 헤맬 때도 있지만 고심하는 당신의 마음이 있기에 당신의 주변은 조금씩 더 나은 발걸음을 나아가고 있어요.";
        result.position = "답답함을 못참아 여러 사람 몫을 해내고 있어요";
        result.design[0] = "건축";
        result.design[1] = "UX UI";
        result.design[2] = "UX UI";
        result.tools[0] = "Tool_Name_Sketchup";
        result.tools[1] = "Tool_Name_Figma";
        result.tools[2] = "Tool_Name_Fontlab";
        result.todo = "당신은 자신과 많은 대화를 나누고 깊이 고심하는 사람이죠. 스스로 수없이 고민해보셨죠? 이럴 때는 전혀 다른 사람들과 전혀 다른 주제의 대화가 필요해요. 당신은 어디서나 깨달음을 얻고, 어디에든 적용할 수 있는 창의력이 있는 사람이니까요. 이제는 다른 사람들과 떠들어보세요! 대신 옳고 그름을 따지지 말고, 지금의 내 상황에 적용할 수 있는 단어나, 논리, 방식들을 찾아보는 거에요. 다양한 대화 속에서 찾은 이상향이 당신의 이성으로 빛을 발하게 될 거에요!";
        break;
      case "TS":
        result.image = "resultGreen"
        result.title = "거짓말을 칠수없는 첨단로봇 디자이너";
        result.desc = "'정석'이라는 말이 이렇게 어울리는 사람이 있을까요? 확실하지 않으면 승부를 걸지 않는 당신은 누군가에게는 지독한 현실주의자로 비칠 수도 있겠어요. 하지만 괜찮아요. 당신의 모든 행동에는 하나하나 그 이유가 있는 걸요. 그만큼 책임감도 확실하게 느끼고 있고요. 불가능한 시도는 하지 않기 때문에 정확하고 군더더기 없는 디자인을 완성할 수 있잖아요? 한번 뱉은 말은 끝까지 지키는 성격과 계획적인 시간 관리를 하는 당신, 디자인계의 알파고 할 수 있지 않을까요?";
        result.position = "잘못된 부분을 모른 척 넘어갈 수 없어요";
        result.design[0] = "편집디자인";
        result.design[1] = "브랜딩";
        result.design[2] = "폰트";
        result.tools[0] = "Tool_Name_Indesign";
        result.tools[1] = "Tool_Name_Illustrator";
        result.tools[2] = "Tool_Name_Fontlab";
        result.todo = "당신은 조금 더 주변을 돌아보는 게 필요해요. 당신은 지금 하는 일에 지나치게 목을 매달고 있을 수 있어요. 했던 말을 지키려고 손해를 보고 있을 수도 있다는 얘기죠. 여실히 드러나는 당신의 성격 때문에 사람들에게 이용당하고 있다면 책임감을 내려놓고 일을 재분배하는 것도 좋아요, 만일 당신 혼자만의 문제라도 조금은 부담감을 내려놓고, 주위 사람들에게 도움을 받아보세요. 혹시 알아요? 당신의 논리와 완벽히 맞으면서도 색다른 아이디어를 도출할 수 있을지!";
        break;
      case "TE":
        result.image = "resultGreen"
        result.title = "만물을 주관하는 왁자지껄 디자이너";
        result.desc = "당신은 디자인계의 지휘자라고도 할 수 있겠어요. 중립적인 입장에서 사람들의 합의점을 찾는 일에 능숙하고, 합리적이고 공정한 사람이죠. 다른 사람들의 의견에 반대할 일이 생기면 혹여 상처를 주지 않을까 경계하지만, 특유의 언변과 심리를 꿰뚫어보는 눈치로 사람들을 자연스럽게 설득할 수 있는 능력이 있어요. 주변의 의견을 적극적으로 수용하면서도 스스로 옳다고 생각한 의견은 굳건히 밀고 나가는 자세도 가지고 있죠. 당신 같은 리더가 있다면 믿고 따를 수 있을 거예요!";
        result.position = "정신 차려보니 대장이 되어있어요";
        result.design[0] = "브랜딩";
        result.design[1] = "전시/무대";
        result.design[2] = "광고";
        result.tools[0] = "Tool_Name_Photoshop";
        result.tools[1] = "Tool_Name_Premier";
        result.tools[2] = "Tool_Name_Notion";
        result.todo = "사람들에 대한 기대를 조금 내려놓을 필요가 있어요. 그것이 설령 자신이더라도 말이죠. 사람은 완벽할 수 없다는 것을 인정하고 나면 해야 할 것과 할 수 없는 것들을 명확히 판단할 수 있을 거예요. 부족한 부분을 인정하는 것이 다음 단계로의 길잡이가 되어줄 거에요. 그 전에 이미 지쳐버리셨다고요? 그렇다면 나와 같은 성향의 친구에게 현재 상황을 솔직하게 말하고, 조언과 도움을 구해보세요. 당신 같은 사람처럼 합의점을 찾고 조율하는 데에 달인인 사람은 없으니까요!";
        break;
      case "FI":
        result.image = "resultPink"
        result.title = "내사람을 사랑하는 평화주의 디자이너";
        result.desc = "당신은 생각을 자주 곱씹고 스스로 마음을 쓰다듬을 줄 아는 깊이 있는 사람이에요. 때로는 이성적이고 논리적인 해결책보다 감정과 마음을 지킬 줄 아는 선택이 더 중요하죠. 부자가 되고 싶다는 생각보다는 내 마음에 꼭 드는 삶을 살고 싶다는 생각을 할 때가 많아요. 모든 사람이 그럭저럭 좋아하는 디자인보다는 내 마음에 꼭 들고, 소수가 되더라도 사람들을 깊이 감동하게 하는 디자이너가 되고 싶으실 거에요. 섬세하고 세밀한 당신이라면, 저는 충분히 가능하다고 생각해요.";
        result.position = "충분한 일인분을 해내는 성실한 팀원이에요";
        result.design[0] = "금속공예";
        result.design[1] = "일러스트";
        result.design[2] = "애니메이션";
        result.tools[0] = "Tool_Name_Rhino";
        result.tools[1] = "Tool_Name_Illustrator";
        result.tools[2] = "Tool_Name_Maya";
        result.todo = "두 가지 방법이 있어요. 하나는 당신과 깊은 교감을 나누고 있는 친구들을 만나는 거에요. 서로 너무나 잘 알고 있는 친구들과 이야기하며 지금의 마음을 정리해보세요. 당장 만날 수 있는 친구가 없다면 글로 적어보는 것도 괜찮아요. 당신은 자신과 가장 친한 친구이기도 하니까요. 하나는 정말 이성적이고, 로봇 같은 사람들의 평가를 받는 거에요. 당신과는 맞지 않는 사람들이지만, 그만큼 당신이 부족한 부분을 냉정하게 알려줄 수 있을 테니까요.";
        break;
      case "FN":
        result.image = "resultPink"
        result.title = "행운을 만드는 빛과소금 디자이너";
        result.desc = "세상에는 참 우연이다 싶기도, 운명이다 싶기도 한 것들이 많죠? 하지만 당신의 행운은 모두 당신이 만들어낸 것들이랍니다. 당신은 인간관계에 스트레스를 받지는 않더라도, 많은 생각을 하고 사는 편이에요. 사람들의 감정을 이해하고, 유추하는데 강하죠. 그래서 다른 사람들보다 강력한 위기 대처능력을 가지고 있어요. 배려심도 깊고, 사려 깊은 데다가 임기응변 능력까지! 당신의 만들어낸 행운은 언젠가 당신을 찾아갈 거에요. 미워할 수 없는 당신은 디자인계의 빛과 소금!";
        result.position = "으쌰으쌰! 영차영차! 지치지 않는 치어리더!";
        result.design[0] = "UX UI";
        result.design[1] = "광고";
        result.design[2] = "방송채널";
        result.tools[0] = "Tool_Name_Protopie";
        result.tools[1] = "Tool_Name_Jandi";
        result.tools[2] = "Tool_Name_After effects";
        result.todo = "항상 다양한 이야기를 듣고 생각하지만, 그래서인지 점점 더 당신 마음에 쏙 드는 무언가를 찾기가 어려워져요. 사람들에게서 에너지를 얻는다고 생각하지만 때로는 사람들에게 에너지를 뺏기고 있는 것은 아닌가 하는 생각도 하죠. 당신에게는 익숙한 만나 보다는, 전혀 다른 분야의 작품을 보는 게 도움이 돼요. 현재 이야기를 쓰고 있다면 추상적인 예술작품을, 손으로 만드는 무언가를 하고 있다면 순수하게 디지털로 제작된 작품을 감상하는 행동이 당신에게 새로운 영감을 줄 거에요.";
        break;
      case "FS":
        result.image = "resultPink"
        result.title = "미움받기 쉽지않은 팔방미인 디자이너";
        result.desc = "적재적소라는 말 아시나요? 알맞은 인재를 알맞은 자리에 쓴다는 말인데요, 당신은 스스로가 가진 것들을 적재적소로 활용하는 효율적인 사람입니다. 현실적인 사람임에도 이 때문에 다른 사람들의 기분을 나쁘게 하지는 않는 지혜로운 사람이기도 하죠. 그래서 곧잘 주변의 인정을 받기도 해요. 디자인에서도 명확히 가능성을 가늠하고, 현실적인 해결책을 도출하며 관계된 사람들과 자기 자신의 감정도 상하지 않게 다루는 진정한 팔방미인. 바로 당신입니다.";
        result.position = "모두가 만족할 방향을 끊임없이 찾아가요";
        result.design[0] = "프로젝트 매니저";
        result.design[1] = "브랜딩";
        result.design[2] = "UX UI";
        result.tools[0] = "Tool_Name_Figma";
        result.tools[1] = "Tool_Name_Illustrator";
        result.tools[2] = "Tool_Name_Notion";
        result.todo = "여유로운 마음을 가져보세요. 당신은 당장 보이는 결과나, 명확할 가능성이 있는 도전이 아니라면 흥미가 떨어지고 관심도 덜해질 거에요. 혹시 원하는 방향으로 결과물이 나오지 않거나, 원하는 만큼의 효율이 생기지 않을까 봐 작업이 더뎌지는 건 아닌가요? 한 번쯤 그래, 내가 선심 쓴다! 하는 마음가짐으로 일을 진행해보시는 건 어떨까요? 부담도 덜하고, 실패해도 큰일 나는 게 아니라는 생각을 하면 놓치고 있던 부분들도 훨씬 잘 보이게 되어 점차 작업에 속도가 붙을 거에요!";
        break;
      case "FE":
        result.image = "resultPink"
        result.title = "한번사는 우리인생 자체발광 디자이너";
        result.desc = "다 같이 흔들어! 라는 말이 나오고 사람들이 춤을 춘다면 열심히 흔드실 거죠? 역시, 사람들과 함께하는 건 즐겁잖아요. 당신은 주변 사람들의 사랑을 받을 때 능력이 배가되는 멋쟁이 디자이너에게요. 작업뿐만 아니라 본인의 외모에도 관심이 많죠. 톡톡 튀는 아이디어와 특유의 에너지로 주변을 밝게 만드는 그야말로 자체발광! 하지만 반대의 모습도 있는 법. 상성이 안 맞는 사람들에게 미움을 받을 때도 있어요. 하지만 그 사람들도 결국 당신을 좋아하게 될 거라 믿어 의심치 않아요!";
        result.position = "일과 휴식의 황금비율을 아는 페이스메이커!";
        result.design[0] = "아트디렉터";
        result.design[1] = "모션그래픽";
        result.design[2] = "광고";
        result.tools[0] = "Tool_Name_Photoshop";
        result.tools[1] = "Tool_Name_Cinema_4d";
        result.tools[2] = "Tool_Name_Slack";
        result.todo = "한 번 놀고 합시다! 너무 자신을 가두고 있지는 않나요? 당신은 신나고 재미있을 때 능력이 배가되는 사람이잖아요. 스트레스를 받는 상태라면, 그 스트레스가 사라질 때까지 계속 힘이 들 거에요. 하지만 분명 무작정 놀 수는 없는 상황이 있겠죠…? 그럴 때는 정신을 조금 놓아보는 것도 좋아요. 사람들과 시답잖은 농담을 주고받으며 작업을 하거나 혼자서 연기를 해보는 등 진지함을 살짝 내려놓고 약간의 재미만 더해도 당신의 빛나는 재능이라는 것이 폭발할 거에요!";
        break;
      case "JI":
        result.image = "resultBlue"
        result.title = "과녁을 뚫고가는 직선주행 디자이너";
        result.desc = "목표를 설정하는 깊은 생각, 뚝심 있는 절제력! 한번 정한 목표가 있다면 지치지 않고 자신을 통제하는 당신. 단계별로 상황을 상상하고 하나씩 이뤄나가는 성취감이 무엇보다도 당신에게 행복한 보상이에요. 하지만 한가지 신기한 점은, 상황에 따라 사색에 잠긴 이상주의자가 되기도 한다는 점이죠. 물론 공과 사를 철저히 구분해서, 원칙에 따라 행동하는 사람이에요. 당신과 함께라면 디자인을 하는 과정에 헛된 걸음이란 없을 거예요. 앞으로 쭉 가주세요. 디자인 기사님!";
        result.position = "조용히 지름길을 찾아내어 사람들을 인도해요";
        result.design[0] = "편집";
        result.design[1] = "모션그래픽";
        result.design[2] = "건축";
        result.tools[0] = "Tool_Name_Indesign";
        result.tools[1] = "Tool_Name_Cinema_4d";
        result.tools[2] = "Tool_Name_Sketchup";
        result.todo = "쉬는 시간이 필요하시군요. 하지만 도통 쉴 줄 모르기도 하고요. 화끈하게 놀거나 거창한 활동을 즐기시는 편도 아니에요. 쉴 때도 언제나 해야 할 일들이 떠오르기도 하고, 아무것도 안 하고 시간을 허비하고 싶지는 않죠. 하지만 그러셔야 합니다! 스스로는 괜찮다고 생각할 수 있지만, 과열된 전자기기의 전원을 끄듯 가볍게 명상을 하거나 단순한 집안일, 또는 요가와 같은 내면에 집중할 수 있는 활동을 해보세요, 아무것도 안 하는 시간이 곧 모든 것을 할 수 있는 나를 만들어 줄 거에요!";
        break;
      case "JN":
        result.image = "resultBlue"
        result.title = "근거있는 꿈을꾸는 드림웍스 디자이너";
        result.desc = "이상적인 꿈을 꾸면서, 이를 실제로 이룰 수 있는 능력이 뒷받침된다면 얼마나 좋을까요? 바로 당신입니다. 사람들이 보기에 막연할 수도 있는 당신이 생각하는 미래는, 근면·성실한 당신에게서 점차 그 모양을 갖추어가고 있습니다. 목표를 위해 자기 자신을 지속해서 절제하고, 계획적인 삶을 꾸려나가면서도 이상적인 미래를 잊지 않는 원동력으로 타인에게 본보기가 되는 당신은 누군가에겐 허황한 꿈에 당신이라는 근거를 더 해 현실로 만드는 꿈 꾸는 디자이너입니다.";
        result.position = "언제나 웃음을 잃지 않으려 부던히 노력해요";
        result.design[0] = "모션그래픽";
        result.design[1] = "광고";
        result.design[2] = "브랜딩";
        result.tools[0] = "Tool_Name_After effects";
        result.tools[1] = "Tool_Name_Jandi";
        result.tools[2] = "Tool_Name_Bracket";
        result.todo = "당신은 스스로가 가진 강력한 목표와, 이를 이룰 수 있는 꾸준함이 있습니다. 하지만 주변의 만류 혹은 방해에 지치기도 하고, 스스로에 대한 확신이 낮아질 때쯤 막막함을 느끼곤 하죠. 이럴 때는 목표를 왜 설정했는지에 대한 생각이 도움됩니다. 생각해봅시다. 목표를 설정한 계기가 무엇이었고 이를 위해 어떤 과정을 거쳤는지. 스스로 꾸고 있던 꿈을 잊고 있지는 않았나요? 내가 어떤 사람인지를 다시 한 번 생각해보면서 다시 한 걸음 나아갈 수 있는 자신감을 가져보세요!";
        break;
      case "JS":
        result.image = "resultBlue"
        result.title = "현실적인 감각의 헌신적인 디자이너";
        result.desc = "경험에 따른 결정을 내리는 당신. 스스로 굉장히 현실적이고 헌신적이에요. 맡은 일을 책임감 있게 끝내고, 시간약속과 체계적인 단계를 중요하게 생각하는 당신은 어떤 프로젝트에서든 1인분 이상의 능률을 보여주어 사람들이 의지할 수 있는 든든한 사람이에요. '믿고 간다'라는 말이 어울리는 사람이죠. 다만 미래적이거나 추상적인 문제들에 다소 약한 모습을 보이기도 해요. 그런데도 언제나 주변에 믿음을 주는 디자이너! 충분히 멋있지 않나요?";
        result.position = "만나는 시간과 날짜가 가장 중요한 인간 캘린더!";
        result.design[0] = "운송수단";
        result.design[1] = "금속조형";
        result.design[2] = "상업제품";
        result.tools[0] = "Tool_Name_Rhino";
        result.tools[1] = "Tool_Name_3ds_max";
        result.tools[2] = "Tool_Name_Photoshop";
        result.todo = "혹시 지나치게 자신을 깎아내리고 있지는 않나요? 당신은 지나친 겸손과 자신을 드러내지 않는 성격 때문에 자신을 저평가하는 경향이 있어요. 하지만 무엇보다 스스로가 자기 자신을 믿을 때, 당신은 넘치는 활력을 다시 얻을 수 있을 거예요. 가족이나 친구들에게 솔직하게 현재 상태를 드러내며 대화를 하다 보면, 자신을 과소평가하고 있었다는 것을 알 수 있을 거예요. 당신은 잘할 수 있어요! 당신도 알고 있듯이요.";
        break;
      case "JE":
        result.image = "resultBlue"
        result.title = "뛰어나갈 준비가된 교통정리 디자이너";
        result.desc = "디자인계의 제갈공명이라고나 할까요? 당신은 언제나 한다면 하는 준비된 사람으로, 현실감각이 뛰어나죠, 그렇다고 해서 이기적인 행동을 하는 사람은 아닙니다. 오히려 다수의 사람과 공통된 목표를 향해서 갈 때 가장 두드러지는 사람으로, 자신을 통제하는 실천능력과 뛰어난 언변으로 주위 사람들을 다독이는 교통정리의 달인이라고 해야겠어요. 언제나 앞장서서 나서는 사람은 아니지만, 언제든지 리더의 자리에서 충분한 능력을 발휘할 준비가 되어있답니다!";
        result.position = "암묵적인 팀의 중심, 팀 프로젝트의 코어근육!";
        result.design[0] = "브랜딩";
        result.design[1] = "UX UI";
        result.design[2] = "광고";
        result.tools[0] = "Tool_Name_Slack";
        result.tools[1] = "Tool_Name_Zeplin";
        result.tools[2] = "Tool_Name_Xd";
        result.todo = "기존과는 다른 방식으로 작업에 접근할 필요가 있어요. 사례를 찾을 때, 단순히 시각적인 정보가 아닌 작업 과정을 기록한 사례를 보게 된다면 굉장히 신선하게 다가올 거에요, 아이디어를 내고 그래픽을 잡는 사람이 있는가 하면, 그래픽에서 아이디어를 얻는 사람이 있잖아요? 항상 가는 길로만 가는 것이 독이 되는 경우가 있기도 하죠. 조력자의 역할에서 주도자의 역할로, 주도자의 역할에 있었다면 조력자가 되어 색다른 시각으로 작업을 바라보는 것도 좋은 방법이랍니다!";
        break;
      case "PI":
        result.image = "resultPurple"
        result.title = "자아를 탐구하는 전통탈피 디자이너 ";
        result.desc = "삶을 이루는 모든 것에는 의미가 있죠, 혹 무의미한 부분이 있다고 해도 무의미 자체로서 의미가 있다고 생각하는 당신은 조그마한 일에도 수많은 배울 점을 찾아내는 보기 드문 성찰능력을 갖추고 있어요. 그래서 일반적으로 그냥 넘어가기도 하는 사소한 일들에서 커다란 의미를 찾아내어 주위 사람들에게 깨달음을 주기도 해요. 잘 깎은 연필처럼 묵묵히 자신을 발견해서 멋진 그림을 그리는 디자이너가 여기 있었네요!";
        result.position = "사람들이 놓친 디테일을 살려내요";
        result.design[0] = "전시/무대";
        result.design[1] = "편집";
        result.design[2] = "일러스트";
        result.tools[0] = "Tool_Name_Illustrator";
        result.tools[1] = "Tool_Name_Indesign";
        result.tools[2] = "Tool_Name_Notion";
        result.todo = "당신은 넘치는 호기심을 쏟아부을 곳이 필요해요. 한 가지 주제로 오랜 기간 생각을 집중하다 보면 호기심 많은 당신은 쉽게 지루함을 느끼게 될 거에요. 현재 작업 중인 주제로 색다른 결과물을 생각해 본다거나, 아예 다른 사람들의 주제를 관찰하는 것도 도움이 된답니다. 혹은 주변 사람들에게 의견을 들어보는 것도 좋아요. 자기 자신의 의견은 누구보다 알고 계시지만, 주변 사람들의 의견을 자주 궁금해하지는 않으시잖아요? 색다른 자극이 될 수 있을 거예요!";
        break;
      case "PN":
        result.image = "resultPurple"
        result.title = "인생을 찾아떠난 역마살 디자이너";
        result.desc = "삶이 철저히 계산으로 흘러갈 수 있는 것이라면, 아마 당신은 재미없어 할 것 같아요. 인생이 한가지 목표를 향해 가는 여정이라면 너무 아쉬울 것 같지 않나요? 하지만 당신을 만족하게 해줄 무언가를 향해 기꺼이 여러 갈래로의 여정을 시작하기도 하죠. 자유로운 사고를 바탕으로 무궁무진이 뻗어 나가는 디자인의 영역에서도 분명히 멋진 여행을 하게 되실 거에요!";
        result.position = "보다 색다른 아이디어를 언제나 생각하고 있어요";
        result.design[0] = "광고";
        result.design[1] = "미디어아트";
        result.design[2] = "브랜딩";
        result.tools[0] = "Tool_Name_Photoshop";
        result.tools[1] = "Tool_Name_Processing";
        result.tools[2] = "Tool_Name_Bracket";
        result.todo = "긍정적인 사고방식과 자유로운 심리로 주변 사람들에게 인정받고, 누구나 좋아하는 사람인 당신은 타인과의 정서적 교감을 즐기고, 누구보다 폭넓은 이해심을 바탕으로 많은 사람을 깊게 이해할 수 있을 거예요. 그만큼 주의해야 할 부분이 스스로 감정을 올바로 바라보는 것이랍니다. 내가 하는 일이 막히는 이유가 무의미하게 반복되는 과정인지, 주제에 대한 흥미 부족인지, 등 총체적 난국으로 여겨지는 현재 상황을 냉철하고 단계적으로 바라보면 해결점을 찾을 수 있을 거예요!";
        break;
      case "PS":
        result.image = "resultPurple"
        result.title = "호기심을 무기삼은 맥가이버 디자이너";
        result.desc = "궁금함을 해결하고 난 뒤 속이 시원한 느낌! 맡은 일을 해내고 난 뒤 코가 뚫리는 성취감! 다재다능한 모습을 보여주는 당신은 스스로 어떤 분야에 관심이 가는지를 빠르게 판단합니다. 관심이 있는 분야가 생기면 다양한 시행착오도 하나의 재미있는 과정으로 생각하는데요, 당신에게 호기심만큼 강력한 무기는 없습니다! 본연의 현실적인 사고방식과 호기심을 통한 열정으로 다재다능한 맥가이버 디자이너가 결국 당신의 운명이에요!";
        result.position = "어떤 일이든 평균 이상을 해내는 재야의 숨은 고수!";
        result.design[0] = "애니메이션";
        result.design[1] = "운송수단";
        result.design[2] = "인테리어";
        result.tools[0] = "Tool_Name_Maya";
        result.tools[1] = "Tool_Name_Rhino";
        result.tools[2] = "Tool_Name_Rhino";
        result.todo = "가끔은 진행 중인 작업의 현실적인 가치나 실용적인 가치를 따지지 않고, 순전한 재미 또는 철저한 무관심으로 접근하는 것이 필요해요. 최초의 목적이 분명한 결과를 바라보고 시작한 일이라면 잠시 짐을 내려두고 그저 재미를 가치로 움직이거나, 재미로 시작한 일의 과정에서 지루함이 느껴진다면 그 지루함을 무시하는 거죠. 호기심을 무기로 삼은 당신에겐 오히려 다른 무기를 들어보는 것이 큰 도움이 될 수 있어요!";
        break;
      case "PE":
        result.image = "resultPurple"
        result.title = "뒤에도 눈이달린 레이더망 디자이너";
        result.desc = "마치 레이더가 여러 사물을 한 번에 파악하듯, 당신은 사람과 사람 사이를 빠르게 파악하는 레이더를 가지고 있어요. 물론 인간관계는 어려운 것이지만, 당신에게 그것만큼 원동력이 되는 연료는 없죠. 망설임보다는 행동을 좋아하고. 규칙에 얽매이기보다는 새로운 규칙을 만드는 게 더 좋으시죠? 특유의 날카로운 눈치와 긍정적인 성격으로 대체할 수 없는 능력을 갖춘 당신! 언제 어디에서나 한몫을 해내는 인간 레이더 디자이너예요!";
        result.position = "최강의 팀을 만드는 역할분담 마스터";
        result.design[0] = "아트디렉터";
        result.design[1] = "프로젝트 매니저";
        result.design[2] = "브랜딩";
        result.tools[0] = "Tool_Name_Xd";
        result.tools[1] = "Tool_Name_Slack";
        result.tools[2] = "Tool_Name_Figma";
        result.todo = "너무 급하게 빠져들지 않았는지 생각해보세요. 당신은 매력적으로 다가오는 일에 흠뻑 빠져드는 타입이라서 자칫 필요한 단계를 거치지 않았거나 한두 가지 놓친 부분이 있을 수 있어요. 주변 사람들의 반응을 누구보다 잘 살피고 예리하게 반응하는 장점이 있는 당신이지만 그만큼 스스로 소홀하진 않았나요? 자! 이 순간부터 세상에는 당신만 있는 거예요! 천천히, 차근차근하게 지금까지의 단계를 뒤돌아봅시다, 걸어온 길에 답이 있을 거예요!";
        break;
    }    

    setTimeout(function() {
      this.props.onSearchCalcResult(result);
      this.props.onSearchSubmit(4);
    }.bind(this), 3000);
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

      <div className="cardContainer">
        <div className="cardStack">
            <img id="card1" src="/images/card_0.png"></img>
            <img id="card2" src="/images/card_1.png"></img>
            <img id="card3" src="/images/card_2.png"></img>
            <img id="card4" src="/images/card_3.png"></img>
          </div>
          </div>

        <div className="surveyMainCenter" id="surveyCalcCenter">
          
          
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

    console.log("constructor ResultPage! " + ", " + this.props.typeA + ", " + this.props.typeB + ", " + this.props.typeC + ", " + this.props.typeD);
    console.log(" :: " + this.props.typeALR + ", " + this.props.typeBLR + ", " + this.props.typeCLR + ", " + this.props.typeDLR);
    this.percentange = this.percentange.bind(this);
    this.percentange();

    this.state = {
      typeAPercent : ["", ""],
      typeBPercent : ["", ""],
      typeCPercent : ["", ""],
      typeDPercent : ["", ""],
    }

    getFireDB().then(res => {
      this.setState({
        people : res.val().people
      })
      setFireDB(res.val().people + 1);
      console.log(res.val().people);
    });
  }

  percentange = () => {
    let typeAPercent = [];
    let typeBPercent = [];
    let typeCPercent = [];
    let typeDPercent = [];

    typeAPercent =  [this.props.typeALR[0] / 12, this.props.typeALR[1] / 12]
    typeBPercent =  [this.props.typeBLR[0] / 12, this.props.typeBLR[1] / 12]
    typeCPercent =  [this.props.typeCLR[0] / 12, this.props.typeCLR[1] / 12]
    typeDPercent =  [this.props.typeDLR[0] / 12, this.props.typeDLR[1] / 12]
    console.log(typeAPercent, typeBPercent, typeCPercent, typeDPercent);

    this.setState({
      typeAPercent : typeAPercent,
      typeBPercent : typeBPercent,
      typeCPercent : typeCPercent,
      typeDPercent : typeDPercent,
    })
  }
  
  render() {
    return(
      <>
      <div className="main">
        <div className="surveyHeader">
          <img className="headerLogo" src="/images/logo.png" alt=""/>
          <img className="xButton" src="/images/X.png" alt=""/>
        </div>

        <div className="resultScreen">

          <div className="resultCard">
              <h1 className="resultTitle">{this.props.result.title}</h1>
              <img src={"/images/"+ this.props.result.image + ".png"} alt=""/>
              <p className="desc">{this.props.result.desc}</p>
            </div>
            <div className="resultDesc">
              <div className="leftBox">
                <div className="graph">
                  <h3 className="descTitle">나의 DPTI 상세 결과</h3>

                  <div className="type">
                    <div className="leftTypeTitle">
                      <p className="typeDescTitle">외향</p>
                      <p className="typeDescValue" id="typeAleftValue">{this.state.typeAPercent[0] + "%"}</p>
                    </div>
                    <div className="line"><div className="lineProgress" id="typeAprogress"></div></div>
                    <div className="rightTypeTitle">
                    <p className="typeDescTitle">내향</p>
                      <p className="typeDescValue" id="typeArightValue">{this.state.typeAPercent[1] + "%"}</p>
                    </div>
                  </div>

                  <div className="type">
                    <div className="leftTypeTitle">
                      <p className="typeDescTitle">감각</p>
                      <p className="typeDescValue" id="typeBleftValue">{this.state.typeBPercent[0] + "%"}</p>
                    </div>
                    <div className="line"><div className="lineProgress" id="typeBprogress"></div></div>
                    <div className="rightTypeTitle">
                    <p className="typeDescTitle">직관</p>
                      <p className="typeDescValue" id="typeBrightValue">{this.state.typeBPercent[1] + "%"}</p>
                    </div>
                  </div>

                  <div className="type">
                    <div className="leftTypeTitle">
                      <p className="typeDescTitle">사고</p>
                      <p className="typeDescValue" id="typeCleftValue">{this.state.typeCPercent[0] + "%"}</p>
                    </div>
                    <div className="line"><div className="lineProgress" id="typeCprogress"></div></div>
                    <div className="rightTypeTitle">
                    <p className="typeDescTitle">감정</p>
                      <p className="typeDescValue" id="typeCrightValue">{this.state.typeCPercent[1] + "%"}</p>
                    </div>
                  </div>

                  <div className="type">
                    <div className="leftTypeTitle">
                      <p className="typeDescTitle">실천</p>
                      <p className="typeDescValue" id="typeDleftValue">{this.state.typeDPercent[0] + "%"}</p>
                    </div>
                    <div className="line"><div className="lineProgress" id="typeDprogress"></div></div>
                    <div className="rightTypeTitle">
                    <p className="typeDescTitle">인식</p>
                      <p className="typeDescValue" id="typeDrightValue">{this.state.typeDPercent[1] + "%"}</p>
                    </div>
                  </div>


                </div>
                <div className="todo">
                  <h3 className="descTitle">디자인 작업이 막힐 때는?</h3>
                  <p className="desc" id="designDesc">
                  {this.props.result.todo}
                  </p>
                </div>
              </div>
              <div className="rightBox">
                <div className="position">
                  <h3 className="descTitle">나와 어울리는 조별과제 포지션</h3>
                  <div className="positionBox">{this.props.result.position}</div>
                </div>
                <div className="design">
                  <h3 className="descTitle">나와 어울리는 디자인 분야</h3>
                    <div className="designDesc">
                      <p className="number">1</p>
                      {this.props.result.design[0]}
                    </div>
                    <div className="designDesc">
                      <p className="number">2</p>
                      {this.props.result.design[1]}
                    </div>
                    <div className="designDesc">
                      <p className="number">3</p>
                      {this.props.result.design[2]}
                    </div>
                </div>
                <div className="tools">
                  <h3 className="descTitle">나와 어울리는 디자인 툴</h3>
                    <div className="toolDesc">
                      <p className="number" id="toolNumber">1</p>
                      <img src={"/images/" + this.props.result.tools[0] + ".png"} alt=""/>
                    </div>

                    <div className="toolDesc">
                      <p className="number" id="toolNumber">2</p>
                      <img src={"/images/" + this.props.result.tools[1] + ".png"} alt=""/>
                    </div>

                    <div className="toolDesc">
                      <p className="number" id="toolNumber">3</p>
                      <img src={"/images/" + this.props.result.tools[2] + ".png"} alt=""/>
                    </div>
                </div>
                <button className="exitBtn">검사 종료하기</button>
              </div>
                
          </div>
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
    this.surveyResultCalc = this.surveyResultCalc.bind(this);
    this.surveyCalc = this.surveyCalc.bind(this);
    this.onSearchCalcResult = this.onSearchCalcResult.bind(this);
  }
  
  state = {
    currentPage : 0
  }

  onSearchSubmit(props) {
    this.setState({
      currentPage : props
    });
  }

  // 계산한 결과 내용을 받는 함수
  onSearchCalcResult(result) {
    console.log("결과를 받았습니다 : " + result);
    this.setState({
      result : result
    })
  }

  surveyCalc() {
    let typeAvalue = 0;
    let typeBvalue = 0;
    let typeCvalue = 0;
    let typeDvalue = 0;

    let typeA_L_Clicked = 0;
    let typeA_R_Clicked = 0;

    let typeB_L_Clicked = 0;
    let typeB_R_Clicked = 0;
    let typeC_L_Clicked = 0;
    let typeC_R_Clicked = 0;
    let typeD_L_Clicked = 0;
    let typeD_R_Clicked = 0;

    for (var i = 1; i <= 24; ++i) {
      if (i <= 6) {
        if (typeAvalue < 0) typeA_L_Clicked += 1; // 내향
        else if (typeAvalue >= 0) typeA_R_Clicked += 1; // 외향
        typeAvalue += Number(this.state[i]);
      } else if (i <= 12) {
        if (typeBvalue < 0) typeB_L_Clicked += 1; // S 감각 
        else if (typeBvalue >= 0) typeB_R_Clicked += 1; // N 직관
        typeBvalue += Number(this.state[i]);
      } else if (i <= 18) {
        if (typeCvalue < 0) typeC_L_Clicked += 1; // T 사고
        else if (typeCvalue >= 0) typeC_R_Clicked += 1; // F 감정
        typeCvalue += Number(this.state[i]);
      } else if (i <= 24) {
        if (typeDvalue < 0) typeD_L_Clicked += 1; // J 실천
        else if (typeDvalue >= 0) typeD_R_Clicked += 1; // P 인식
        typeDvalue += Number(this.state[i]);
      }
    }

    let typeALR = [typeA_L_Clicked, typeA_R_Clicked];
    let typeBLR = [typeB_L_Clicked, typeB_R_Clicked];
    let typeCLR = [typeC_L_Clicked, typeC_R_Clicked];
    let typeDLR = [typeD_L_Clicked, typeD_R_Clicked];

    console.log("넘기기 전 : " + typeALR + typeBLR + typeCLR + typeDLR);

    this.setState({
      typeAvalue : typeAvalue,
      typeBvalue : typeBvalue,
      typeCvalue : typeCvalue,
      typeDvalue : typeDvalue,
      
      typeALR : typeALR,
      typeBLR : typeBLR,
      typeCLR : typeCLR,
      typeDLR : typeDLR
    })

    console.log("A : " + typeAvalue + ", B : " + typeBvalue + ", C : " + typeCvalue + ", D : " + typeDvalue);
  }

  // Survey 선택 결과를 받아옴
  surveyResultCalc(targetName, targetValue) {
    const parseTargetName = targetName.split('Q')[1];
    const parseTargetValue = targetValue.split('_')[1];

    this.setState({
      [parseTargetName] : parseTargetValue,
    }, () => {
      console.log("targetName : " + parseTargetName + ", targetValue : " + parseTargetValue);
      if (parseTargetName == 24) {
        this.surveyCalc();
        return;
      }
    });
  }

  screenRender() {
    if (this.state.currentPage < 1)
      return <MainScreen page={this.state.currentPage} onSubmit={this.onSearchSubmit} ></MainScreen>;
    else if (this.state.currentPage == 2)
      return <Survey onSubmit={this.onSearchSubmit} surveyCalc={this.surveyResultCalc}></Survey>;
    else if (this.state.currentPage == 3)
      return <ResultCalculate typeA={this.state.typeAvalue} typeB={this.state.typeBvalue} typeC={this.state.typeCvalue} typeD={this.state.typeDvalue} onSearchCalcResult={this.onSearchCalcResult} onSearchSubmit={this.onSearchSubmit}></ResultCalculate>
    else if (this.state.currentPage == 4)
      return <Result result={this.state.result} typeALR={this.state.typeALR} typeBLR={this.state.typeBLR} typeCLR={this.state.typeCLR} typeDLR={this.state.typeDLR}></Result>
  }

  render()
  {
    return (
      <>
      {this.screenRender()}
      {/* {<Result></Result>} */}
      {/* <ResultCalculate></ResultCalculate> */}
      {/* <MainScreen page={this.state.currentPage} onSubmit={this.onSearchSubmit} ></MainScreen> */}
      {/* <Survey></Survey> */}
      </>
    );
  }
}

export default App;
