import React, { Component } from 'react';

class Calc extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.surveyResult);
    }
    
    componentDidMount() {
        this.calculating();    
    }

    checkType = () => {
        var typeEI = 0;
        var typeSN = 0;
        var typeTF = 0;
        var typeJP = 0;

        for (var i = 0; i < 20; ++i) {
            if (i < 5)
                typeEI += this.props.surveyResult[0].select[i];
            else if (i < 10)
                typeSN += this.props.surveyResult[0].select[i];
            else if (i < 15)
                typeTF += this.props.surveyResult[0].select[i];
            else if (i < 20)
                typeJP += this.props.surveyResult[0].select[i];
        }

        var isTypeEI = false;
        var isTypeSN = false;
        var isTypeTF = false;
        var isTypeJP = false;
        if (Math.abs(typeEI) <= Math.abs(typeSN)) {
            isTypeSN = true;
        } else {
            isTypeEI = true;
        }

        if (Math.abs(typeTF) <= Math.abs(typeJP)) {
            isTypeJP = true;
        } else {
            isTypeTF = true;
        }
        
        console.log(typeEI + ", " + typeSN + ", " + typeTF + ", " + typeJP);
        console.log("isTypeEI : " + isTypeEI + ", isTypeSN : " + isTypeSN + ", isTypeJP : " + isTypeJP + ", isTypeTF : " + isTypeTF);

        var figureType = "";
        var colorType = "";
        if (isTypeEI) {
            if (typeEI < 0) {
                figureType = "E";
            } else {
                figureType = "I";
            }
        } else if (isTypeSN) {
            if (typeSN < 0) {
                figureType = "S";
            } else {
                figureType = "N";
            }
        }

        if (isTypeTF) {
            if (typeTF < 0) {
                colorType = "T";
            } else {
                colorType = "F";
            }
        } else if (isTypeJP) {
            if (typeJP < 0) {
                colorType = "J";
            } else {
                colorType = "P";
            }
        }
        
        var finalResult = colorType + figureType;
        this.props.finalResult(finalResult);
        console.log("최종적인 결과값 : " + finalResult);
    }


    calculating = () => {
        this.checkType();

        setTimeout(function() {
            this.props.nextPage(4);
            }.bind(this), 3000);
    }

    render() {
        return (
            <>
            <div className="main">
                <div className="header">
                    <div className="prev">
                        <img src="./images/prev.png" alt="PrevIcon"/>
                        <span className="prevText">이전</span>
                    </div>
                    <div className="indicator">
                        <span id="indicatorText">20/20</span>
                    </div>
                    <div className="close">
                        <img src="./images/close.png" alt="close"/>
                    </div>
                </div>
            </div>

            <div className="cardContainer">
            <div className="cardStack">
                <img id="card1" src="/images/calc/card_0.png" alt="card1"></img>
                <img id="card2" src="/images/calc/card_1.png" alt="card2"></img>
                <img id="card3" src="/images/calc/card_2.png" alt="card3"></img>
                <img id="card4" src="/images/calc/card_3.png" alt="card4"></img>
            </div>
            </div>

            <div className="surveyMainCenter" id="surveyCalcCenter">
            
            </div>
            <p className="calcText">결과를 추출중에요! <br/>조금만 기다려주세요!</p>
            </>
        );
    }
}

export default Calc;