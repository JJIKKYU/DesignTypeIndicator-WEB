import React, { Component } from 'react';
// Header.js
import Header from './Header'

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

class SurveyCard extends Component {
    render() {
        return(
            <>
            <div className="card">
                <h1 id="questionNum">Q1</h1>
                <p id="questionDesc">
                모두가 ‘예’라고 말할 때, <br/>
                ‘아니오’라고 말할 수 있어.
                </p>
                <div className="answerBox">
                    <input type="button" value="맞아요 매우 그래요"/>
                    <input type="button" value="맞아요 매우 그래요"/>
                    <input type="button" value="맞아요 매우 그래요"/>
                    <input type="button" value="맞아요 매우 그래요"/>
                    <input type="button" value="맞아요 매우 그래요"/>
                </div>
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