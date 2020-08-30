import React, { Component } from 'react';
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

        this.state = {
            buttonId : this.props.questionNum + this.props.buttonNum
        }
    }

    eventHandler = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        console.log(targetName + ", " + targetValue);

        // this.setState({
        //     [targetName]: targetValue,
        // }, () => {
        //     console.log(this.state[targetName]);
        //     // this.props.getStateSurvey(targetName, targetValue)
        // });
    }


    render() {
        return(
            <>
            <input className="answerBoxRadio" type="radio" name={this.props.questionNum} id={this.state.buttonId}
            value={this.props.buttonNum}
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
            number : 1,
            loading : false,
            answerList : [],
            questionList : []
        }
    }

    componentDidMount() {
        this.loadItem();  // loadItem 호출
    }

    loadItem = async () => {
        axios
        .get("./json/Survey.json")
        .then (( {data }) => {
            this.setState({
                loading : true,
                questionList : data.Question,
                answerList : data.Answer
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

    render() {
        const { questionList } = this.state;
        const { answerList } = this.state;
        var question = questionList[0];


        // var result = changed[1].value.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
        // console.log(result);

        // console.log(questionList[0]);

        const answers = answerList.map((answerText, index) => (<SurveySelectBox key={index} value={answerText} questionNum={this.state.number} buttonNum={index}></SurveySelectBox>));
        return(
            <>
            <div className="card">
            {/* Decoration card Div */}
            <div className="card" id="backgroundCard1"></div>
            <div className="card" id="backgroundCard2"></div>

            {/* Feedback Card Div */}
            <div className="card" id="feedbackCard">
                <img id="feedbackBG" src="./images/feedback/feedbackGreenBg.png" alt=""/>
                <h1 className="feedbackText">텍스트 영역입니다</h1>
                <img id="feedbackImg" src="./images/feedback/feedbackGreen.png" alt=""/>
            </div>

                <h1 id="questionNum">Q{this.state.number}</h1>
                <p id="questionDesc">
                    {
                        String(question).split('\n').map( line => {
                            return (<span>{line}<br/></span>)
                          })
                    }
                </p>

                {/* answerButton 5 */}
                {answers}
            </div>

            <div className="submitSurvey">
                <input type="button" value="제출하기"/>
            </div>
            </>
        );
    }
}

class Survey extends Component {
    render() {
        return (
            <>
            <Header></Header>
            <ProgressBar></ProgressBar>
            <SurveyCard></SurveyCard>
            </>
        );
    }
}

export default Survey;