import React, { Component } from 'react';
import { Link } from "react-router-dom"

// Header.js
import Header from './Header'
import axios from "axios";

class ProgressBar extends Component {
    render() {
        return(
            <>
            <div className="progressBG">
                <div id="progress">
                </div>
            </div>
            </>
        );
    }
}

class SurveySelectBox extends Component {
    constructor(props) {
        super(props);
        this.reverseValue = this.reverseValue.bind(this);

        this.state = {
            reverse : 1,
            buttonId : String(this.props.questionNum) + String(this.props.buttonNum),
        }
    }

    reverseValue = () => {
        if (this.props.questionNum === 3) {
            this.setState ({
                reverse : -1
            })
        } else {
            this.setState ({
                reverse : 1
            })
        }
    }

    eventHandler = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;
        var questionNum = this.props.questionNum + 1;
        var reverse = 1;

        if (questionNum === 3 || questionNum === 5 || questionNum === 6 || questionNum === 8 ||
            questionNum === 10 || questionNum === 12 || questionNum === 15 || questionNum === 17 ||
            questionNum === 19 || questionNum === 20) {
            reverse = -1;
        } else {
            reverse = 1;
        }

        console.log(targetName + ", " + targetValue * reverse);
        this.props.moveCard(1);
        this.props.surveyProgress([targetName], targetValue * reverse);
    }

    render() {
        return(
            <>
            <input className="answerBoxRadio" type="radio" name={this.props.questionNum} id={this.state.buttonId}
            value={this.props.buttonNum - 2}
            onChange={this.eventHandler}
            />
            <label htmlFor={this.state.buttonId} className="answerBoxText">{this.props.value}</label>
            </>
        );
    }
}

class SurveyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number : 0,
            loading : false,
            answerList : []
        }
    }

    render() {
        const answers = this.props.answerList.map((answerText, index) => (<SurveySelectBox key={index} value={answerText} questionNum={this.props.number} buttonNum={index} moveCard={this.props.moveCard} surveyProgress={this.props.surveyProgress}></SurveySelectBox>));

        return(
            <>
            <div className="card" id="card">
            {/* Decoration card Div */}
            <div className="card" id="backgroundCard1"></div>
            <div className="card" id="backgroundCard2"></div>

            {/* Feedback Card Div */}
            <div className="card" id="feedbackCard" className="feedbackCard">
                <img id="feedbackBG" className="feedbackBG" src="./images/feedback/feedbackGreenBg.svg" alt=""/>
                <h1 className="feedbackText" id="feedbackText">텍스트 영역입니다</h1>
                <img id="feedbackImg" className="feedbackImg" src="./images/feedback/feedbackGreen.svg" alt=""/>
            </div>

                <h1 id="questionNum">Q{this.props.number + 1}</h1>
                <p id="questionDesc">
                    {
                        String(this.props.questionText).split('\n').map((line,index) => {
                            return (<span key={index}>{line}<br/></span>)
                          })
                    }
                </p>
                {answers}
            </div>
            </>
        );
    }
}

SurveyCard.defaultProps = {
    questionText : "파일명은 언제나 규칙적으로,\n정해진 형식으로 지어",
    number : 99
}

class Survey extends Component {
    constructor(props) {
        super(props);

        this.moveCard = this.moveCard.bind(this);

        this.state = {
            questionList : [],
            number : 1,
            xPosTransitionStep : 382,
            currentXpos : -205
        }
    }

    componentDidMount() {
        this.loadItem();  // loadItem 호출
        this.progressBar();
    }

    loadItem = async () => {
        axios
        .get("./json/Survey.json")
        .then (( {data }) => {
            this.setState({
                loading : true,
                questionList : data.Question,
                answerList : data.Answer,
                feedbackList : data.Feedback
            });
        })
        .catch(e => { 
            // API 호출이 실패할 경우
            console.error(e);
            this.setState ({
                loading : false
            });
        });
    };

    feedbackChange(index, color) {
        const { feedbackList } = this.state;
        const feedbackImg = document.getElementsByClassName("feedbackImg");
        const feedbackBG = document.getElementsByClassName("feedbackBG");
        const feedbackText = document.getElementsByClassName("feedbackText");

        feedbackImg[index].src = feedbackList[color].img;
        feedbackBG[index].src = feedbackList[color].bg;
        feedbackText[index].innerHTML = feedbackList[color].text;
        feedbackText[index].style.color = feedbackList[color].color;
    }

    prevBtnHiddenOrVisible() {
        if (this.state.number === 1) {
            document.getElementById("prev").style.visibility = "hidden";
        } else {
            document.getElementById("prev").style.visibility = "visible";
        }
    }

    // Moving Card left
    moveCard(reverse) {
        if (this.state.number === 21) return;
        if (this.state.currentXpos === -205 && reverse === -1) return;
        const questionContainer = document.getElementById("questionContainer");
            

        this.setState({
            currentXpos : this.state.currentXpos + ((- this.state.xPosTransitionStep - 28) * reverse),
            number : this.state.number + 1 * reverse,
        }, () => {
            this.prevBtnHiddenOrVisible();
            const { number } = this.state;
            const index = number - 2;
            switch(number) {
                case 6:
                    this.feedbackChange(index, "green");
                    break;
                case 11:
                    this.feedbackChange(index, "purple");
                    break;
                case 16:
                    this.feedbackChange(index, "blue");
                    break;
                case 21:
                    this.feedbackChange(index, "pink");
                    break;
                default:
                    break;
            }
            // 각각 문제 번호마다 피드백 줄 수 있도록
            if (number === 6 || number === 11 || number === 16 || number === 21) {
                const feedbackCards = document.getElementsByClassName("feedbackCard");
                feedbackCards[index].style.visibility = "visible";
                feedbackCards[index].style.opacity = "1";
                // 마지막 카드일 경우에 제출하기 버튼 활성화
                if (number === 21) {
                    document.getElementById("sumbitSurvey").style.visibility = "visible";
                    document.getElementById("sumbitSurvey").style.opacity = "1";
                    return;
                }
                
                setTimeout(function() {
                    questionContainer.style.transform = "translate(" + this.state.currentXpos + "px)"
                    this.progressBar();  
                    this.changeTheme();
                    feedbackCards[index].style.visibility = "hidden";
                    feedbackCards[index].style.opacity = "0";
                }.bind(this), 750);
            } else {
                questionContainer.style.transform = "translate(" + this.state.currentXpos + "px)"
                this.progressBar();  
                this.changeTheme();
            }
        });
    }

    // ProgressBar Percentage Change
    progressBar = () => {
        const progressBar = document.getElementById("progress");
        const indicator = document.getElementById("indicatorText");
        const questionCount = 20;
        const widthValue = (this.state.number / questionCount) * 100;

        indicator.innerHTML = this.state.number + "/" + questionCount;
        progressBar.style.width = widthValue + "%";
    }

    changeTheme = () => {
        const progressBar = document.getElementById("progress");
        const answerBoxRadio = document.getElementsByClassName("answerBoxRadio");

        if (this.state.number === 6) {
            progressBar.style.background = "#5A87FA";
            for (var i = 25; i < 50; ++i) {
                answerBoxRadio[i].classList.add('purple');
            }
        } else if (this.state.number === 11) {
            progressBar.style.background = "#28D2DC";
            for (i = 50; i < 75; ++i) {
                answerBoxRadio[i].classList.remove('purple');
                answerBoxRadio[i].classList.add('blue');
            }
        } else if (this.state.number === 16) {
            for (i = 75; i < answerBoxRadio.length; ++i) {
                answerBoxRadio[i].classList.remove('blue');
                answerBoxRadio[i].classList.add('pink');
            }
            progressBar.style.background = "#FF5F87";
        }
    }
    
    render() {
        const questions = this.state.questionList.map((questionText, index) => (<SurveyCard key={index} number={index} questionText={questionText} moveCard={this.moveCard} surveyProgress={this.props.surveyProgress} answerList={this.state.answerList}></SurveyCard>));


        return (
            <>
            <div className="main">
            <Header moveCard={this.moveCard} number={this.state.number}></Header>
            <ProgressBar></ProgressBar>
            </div>
            <div className="questions">
                <div className="questionContainer" id="questionContainer">
                    {questions}
                </div>
            </div>
            <div className="main">
            <div className="submitSurvey" id="sumbitSurvey">
                <Link to="/calc"><input type="button" value="결과보기"/></Link>
            </div>
            </div>
            </>
        );
    }
}

export default Survey;