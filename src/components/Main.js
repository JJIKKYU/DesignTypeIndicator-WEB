import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from "react-router-dom"


class Main extends Component {
    render() {
        return (
            <>
            <div className="main">
      
                <div className="mainTopMargin"></div>
                <div className="mainPatternBGContainer">
                    <img src="./images/main/mainPattern.svg" alt="" className="mainBGPattner"/>
                </div>
                <div className="titleBubble">
                    <div className="titleBubblePolygon"></div>
                    <div className="titleContainer">
                        <span className="subTitle">디자이너 모여라! 다 모여라!</span>
                        <img src="./images/main/dimodamo.svg" alt="DIMODAMO" className="logo"/>
                        <div className="line"></div>
                        <img src="./images/main/dptiTest.svg" alt="DPTI TEST" className="logoDPTI"/>
                        <span className="dptiSubTitle">Design Pattern Type Indicator</span>
                    </div>
                </div>

                <div className="peopleBubbleContainer">
                    <div className="leftBubble">
                        <div className="titleBubblePolygon" id="leftBubblePolygon"></div>
                        <div className="bubbleTextContainer">
                            <span id="bubbleText">나도 몰랐던 나의 조별과제 포지션은?</span>
                        </div>
                    </div>
                    <div className="rightBubble">
                    <div className="titleBubblePolygon" id="rightBubblePolygon"></div>
                        <div className="bubbleTextContainer">
                            <span id="bubbleText">미래의 나와 어울리는 디자인 분야는?</span>
                        </div>
                    </div>
                    <div className="peopleContainer">
                        <img src="./images/main/leftPeople.svg" alt="" className="leftPeople"/>
                        <img src="./images/main/rightPeople.svg" alt="" className="rightPeople"/>
                    </div>

                    <div className="testStartContainer">
                        <Link to="/surveyInformation">
                        <p className="testSubTitle">지금 바로 결과를 확인해보세요!</p>
                            <input type="button" value="TEST START" className="DPTITestStartButton"/>
                        </Link>
                    </div>
                </div>

                <div className="secondMainContainer">
                    <div className="participant">
                        <h1 className="secondMainTitle">현재까지 응시자 수</h1>
                        <div className="participantContainer">
                            <span className="secondMainText" id="participantText">159,753 명</span>
                        </div>
                    </div>
                    <div className="dptiType">
                        <h1 className="secondMainTitle">가장 많은 DPTI 유형</h1>
                        <div className="participantContainer">
                            <span className="secondMainText" id="dptiTypeText">혼밥하는 논리대장 디자이너</span>
                        </div>
                    </div>
                    <div className="dptiResults">
                        <h1 className="secondMainTitle">가장 많은 DPTI 유형</h1>
                        <div className="resultsContainer">

                            <div className="resultCard" id="mainResultCard">
                                <div id="mainResultTop">
                                    <img src="./images/Blue_M_Tri_1.png" alt="" id="mainResultChar"/>
                                    <img src="./images/Blue_Type_Circle.png" alt="" id="mainResultType"/>
                                    <img src="./images/Blue_Tri.png" alt="" id="mainResultPattern"/>
                                    <h1 id="mainResultTitle">혼밥하는<br></br>논리대장<br></br>디자이너</h1>
                                </div>
                                <div id="mainResultBottom">
                                    <p id="mainResultDesc">무슨 생각 중이야? 라는 말 많이 들어보셨죠? 당신은 객관적인 판단과 당위성을 중요시하는 이 시대의 논리 대장 디자이너! 전통과 규율에 얽매이는 딱딱함이 아니라, 이론과 논리를 중요시하고 작업을 진행하면서 최대한 감정을 배제하는 이성의 결정체로, 주변 사람들에게 간혹 차갑다는 말을 들을 때도 있어요. 하지만 이성과 논리를 장착한 당신의 디자인은 모두에게 든든함을 안겨줄 거에요! 당신은 좀처럼 자신을 속이지 않으니까요!</p>
                                </div>
                                <p id="mainCardDate">2020.08.30 12:01:59</p>
                            </div>

                            <div className="resultCard" id="mainResultCard">
                                <div id="mainResultTop">
                                    <img src="./images/Blue_M_Tri_1.png" alt="" id="mainResultChar"/>
                                    <img src="./images/Blue_Type_Circle.png" alt="" id="mainResultType"/>
                                    <img src="./images/Blue_Tri.png" alt="" id="mainResultPattern"/>
                                    <h1 id="mainResultTitle">혼밥하는<br></br>논리대장<br></br>디자이너</h1>
                                </div>
                                <div id="mainResultBottom">
                                    <p id="mainResultDesc">무슨 생각 중이야? 라는 말 많이 들어보셨죠? 당신은 객관적인 판단과 당위성을 중요시하는 이 시대의 논리 대장 디자이너! 전통과 규율에 얽매이는 딱딱함이 아니라, 이론과 논리를 중요시하고 작업을 진행하면서 최대한 감정을 배제하는 이성의 결정체로, 주변 사람들에게 간혹 차갑다는 말을 들을 때도 있어요. 하지만 이성과 논리를 장착한 당신의 디자인은 모두에게 든든함을 안겨줄 거에요! 당신은 좀처럼 자신을 속이지 않으니까요!</p>
                                </div>
                                <p id="mainCardDate">2020.08.30 12:01:59</p>
                            </div>

                            <div className="resultCard" id="mainResultCard">
                                <div id="mainResultTop">
                                    <img src="./images/Blue_M_Tri_1.png" alt="" id="mainResultChar"/>
                                    <img src="./images/Blue_Type_Circle.png" alt="" id="mainResultType"/>
                                    <img src="./images/Blue_Tri.png" alt="" id="mainResultPattern"/>
                                    <h1 id="mainResultTitle">혼밥하는<br></br>논리대장<br></br>디자이너</h1>
                                </div>
                                <div id="mainResultBottom">
                                    <p id="mainResultDesc">무슨 생각 중이야? 라는 말 많이 들어보셨죠? 당신은 객관적인 판단과 당위성을 중요시하는 이 시대의 논리 대장 디자이너! 전통과 규율에 얽매이는 딱딱함이 아니라, 이론과 논리를 중요시하고 작업을 진행하면서 최대한 감정을 배제하는 이성의 결정체로, 주변 사람들에게 간혹 차갑다는 말을 들을 때도 있어요. 하지만 이성과 논리를 장착한 당신의 디자인은 모두에게 든든함을 안겨줄 거에요! 당신은 좀처럼 자신을 속이지 않으니까요!</p>
                                </div>
                                <p id="mainCardDate">2020.08.30 12:01:59</p>
                            </div>

                        </div>
                    </div>

                    <div className="moreDptiTypeContainer">
                        <input type="button" value="모든 DPTI 유형 보기" className="moreDptiTypeButton"/>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Main;