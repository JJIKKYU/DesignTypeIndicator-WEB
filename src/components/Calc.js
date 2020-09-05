import React, { Component } from 'react';
import { Link } from "react-router-dom"
import StickyHeader from './StickyHeader.js'
import { fire, setFireDBPeople, getFireDBPeople, setFireResultDB, setFireResultType, getFireResultType } from '../firebase.config'

class Calc extends Component {
    constructor(props) {
        super(props);
        // console.log(JSON.stringify(this.props.surveyResult) + "을 받았습니다. Calc.js");
        // console.log(this.props)
        console.log("constructor");


        this.state = {
            finalType : "",
            isResult : "",
            people : 0,
            typePeople : "",
        }
    }

    
    

    componentWillUnmount() {
        this.setState ({
            isResult : "NULL"
        })

        console.log("unmount");
    }
    
    componentDidMount() {
        // window.history.forward();

        fire();
        var people;
        getFireDBPeople().then(res => {
            people = res.val().people;
            this.setState ({
                people : res.val().people
            }, () => {
                this.calculating();
                setFireDBPeople(people);
            });
        });
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
        
        // console.log(typeEI + ", " + typeSN + ", " + typeTF + ", " + typeJP);
        // console.log("isTypeEI : " + isTypeEI + ", isTypeSN : " + isTypeSN + ", isTypeJP : " + isTypeJP + ", isTypeTF : " + isTypeTF);

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
        // console.log("최종적인 결과값 : " + finalResult);

        this.setState ({
            finalType : finalResult,
            isResult : true
        }, () => {
            var sysDate = new Date(Date.now());
            var timeStamp = sysDate.toLocaleDateString() + " " + sysDate.toLocaleTimeString();
            setFireResultDB(finalResult, this.props.gender, timeStamp, this.state.people);

            getFireResultType().then(res => {
                setFireResultType(this.state.finalType, res.val()[finalResult] + 1);
            });

            

            console.log("peopleCount = " + this.state.people)
            console.log("최종 state 저장 : " + this.state.finalType); 
        });
    }


    calculating = () => {
        this.checkType();

        setTimeout(function() {
            if (document.getElementById("resultBtn")) {
                document.getElementById("resultBtn").click();
                // 응시 횟수 추가 및 타입 저장
            }
            }, 3000);
    }

    render() {
        return (
            <>
            <StickyHeader></StickyHeader>
            <div className="main">
                <div className="header">
                    <div className="prev">
                        <img src="./images/prev.png" alt="PrevIcon"/>
                        <span className="prevText">이전</span>
                    </div>
                    <div className="dimodamoTitle" id="dimodamoTitle">
                        <img src="../../images/branding/title.svg" alt="titleIcon"/>
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
            <Link id="resultBtn" to={"/result/" + this.state.finalType + "/" + this.props.gender}></Link>
            </>
        );
    }
}

Calc.defaultProps = {
    gender : "F"
}

export default Calc;