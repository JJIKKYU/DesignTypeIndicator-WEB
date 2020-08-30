import React, { Component } from 'react';
// Header.js
import Header from './Header'
import question from '../json/question.json'

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
    }

    eventHandler = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        this.setState({
            [targetName]: targetValue,
        }, () => {
            console.log(this.state[targetName]);
            // this.props.getStateSurvey(targetName, targetValue)
        });
    }


    render() {
        return(
            <>
            <div className="answerBox">
                <input className="answerBoxRadio" type="radio" name="name_0" id="id_0"
                value="value_01"
                onChange={this.eventHandler}
                />
                <label htmlFor="id_0" className="answerBoxText">{this.props.value}</label>
            </div>
            </>
        );
    }
}

class SurveyCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const answerList = [
            "맞아요 매우 그래요",
            "맞는것 같아요",
            "잘 모르겠어요",
            "아닌것 같아요",
            "아니요 저는 안그래요"
          ]

        const answers = answerList.map((answerText, index) => (<SurveySelectBox key={index} value={answerText}></SurveySelectBox>));
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

                <h1 id="questionNum">Q1</h1>
                <p id="questionDesc">
                모두가 ‘예’라고 말할 때, <br/>
                ‘아니오’라고 말할 수 있어.
                </p>
                {answers}
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