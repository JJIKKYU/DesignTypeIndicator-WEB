import React, { Component } from 'react';
import { Link } from "react-router-dom"
import StickyHeader from './StickyHeader.js'


class Main extends Component {
    render() {
        return (
            <>
            <StickyHeader></StickyHeader>

            <div className="main">
                <div className="mainTopMargin"></div>
                <div className="mainPatternBGContainer">
                    <img src="./images/main/mainPattern.svg" alt="" className="mainBGPattner"/>
                    <img src="./images/main/mainPatternDesktop.svg" alt="" className="mainBGPattner" id="mainBGPattneDesktop"/>
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
                </div>       
            </div>        

            <div className="peopleContainer">
                <img src="./images/main/leftPeople.png" alt="" className="leftPeople"/>
                <img src="./images/main/leftPeopleDesktop.svg" alt="" className="leftPeople" id="leftPeopleDesktop"/>
                <img src="./images/main/rightPeople.png" alt="" className="rightPeople"/>
                <img src="./images/main/rightPeopleDesktop.svg" alt="" className="rightPeople" id="rightPeopleDesktop"/>
            </div>

            <div className="main">
                <div className="testStartContainer">
                    <Link to="/surveyInformation">
                    <p className="testSubTitle">지금 바로 결과를 확인해보세요!</p>
                        <input type="button" value="TEST START" className="DPTITestStartButton"/>
                    </Link>
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
                        <h1 className="secondMainTitle">최근 공유된 DPTI 결과</h1>
                        <div className="resultsContainer">

                            <div className="resultCard" id="archiveResultCard" >
                                <div id="mainResultTop" className="mainResultTop archiveResultTop">
                                    <img src="./images/Blue_M_Tri_1.png" alt="" id="mainResultChar"/>
                                    <img src="./images/Blue_Type_Circle.png" alt="" id="mainResultType"/>
                                    <img src="./images/Blue_Tri.png" alt="" id="mainResultPattern"/>
                                    <h1 id="mainResultTitle">혼밥하는<br></br>논리대장<br></br>디자이너</h1>
                                </div>
                                <p id="mainCardDate">2020.08.30 12:01:59</p>
                            </div>

                        </div>
                    </div>

                    <div className="moreDptiTypeContainer">
                        <Link to="/archive"><input type="button" value="모든 DPTI 유형 보기" className="moreDptiTypeButton"/></Link>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Main;