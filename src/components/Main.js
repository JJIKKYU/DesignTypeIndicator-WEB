import React, { Component } from 'react';
import { Link } from "react-router-dom"
import StickyHeader from './StickyHeader.js'
import axios from "axios";
import { fire, getFireResultTypeGender, getFireDBPeople, getFireResultType } from '../firebase.config'
import { ArchiveCard } from './Archive.js'
import Footer from './Footer.js'


class Main extends Component {
    constructor(props) {
        super(props);
        fire();

        this.state = {
            firebaseLoading : false,
            people : "0",
            cardData : [
               { gender : "M" }, { gender : "M" }, { gender : "M" }, { gender : "M" }, { gender : "M" },
            ],
            resultList : [],
            finalCardResultList : [
                { "colorHex" : "#FFFFFF" }, { "colorHex" : "#FFFFFF" }, { "colorHex" : "#FFFFFF" }, { "colorHex" : "#FFFFFF" }, { "colorHex" : "#FFFFFF" }
            ],
            mostPouplarResultListIndex : 0,
            mostPouplarTypeTitle : "",
            mostPopularType : "",
        }
    }

    componentDidMount() {
        this.loadItem();
        this.getFireBaseData();
        this.setScrollPosition();
    }

    setScrollPosition = () => {
        const mainresults = document.getElementById("mainResultsContainer");
        const mainresultsMaxWidth = mainresults.scrollWidth;
        const interval = 30;
        const desktopWidthSize = 1280;

        if (window.innerWidth < desktopWidthSize) {
            mainresults.scrollTo(0, 0);
        } else {
            setInterval(() => {
                if (mainresults.scrollLeft !== mainresultsMaxWidth) {
                    mainresults.scrollTo(mainresults.scrollLeft + 1, 0);
                }
            }, interval);
        }
    }

    countUpPeople = () => {
        const { firebaseLoading, people } = this.state;
        if (firebaseLoading === false) return 0;

        const interval = 10;
        const peopleText = document.getElementById("participantText");
        var currentPeople = 0;

        setInterval(() => {
            if (currentPeople !== people) {
                currentPeople += 1;
                peopleText.innerHTML = currentPeople + " 명";
            }
        }, interval);

    }

    // 파이어베이스에서 가져오는 데이터 관리
    getFireBaseData = async () => {

        var mPeople = 0;
        getFireDBPeople().then(res => {
            mPeople = res.val().people;
        });

        var mfinalCardResultList = []
        var mCardData = []

        // 최근 진행한 카드리스트 파이어베이스에서 서치
        getFireResultTypeGender().then(res => {
            for (var i = mPeople; i > mPeople - 5; --i) {
                mCardData.push(res.val()[i]);
            }

            for (i = 0; i < mCardData.length; ++i) {
                for (var j = 0; j < this.state.resultList.length; ++j) {
                    if (mCardData[i].type === this.state.resultList[j].type) {
                        mfinalCardResultList.push(this.state.resultList[j]);
                    }
                }
            }
        })
        
        // 가장 많은 DPTI 유형 파이어베이스에서 서치
        getFireResultType().then(res => {
            // 파이어베이스와 동일한 순서로 되어있음
            const type = [
                "FE", "FI", "FN", "FS", "JE", "JI", "JN", "JS", "PE", "PI", "PN", "PS", "TE", "TI", "TN", "TS"
            ]
            
            var mostPopularType = Object.keys(res.val());
            var mostPopularTypePeople = 0;
            var mostPopularTypeIndex = 0;
            for (var i = 0; i < type.length; ++i) {
                if (res.val()[type[i]] > mostPopularTypePeople) {
                    mostPopularTypePeople = res.val()[type[i]];
                    mostPopularTypeIndex = i;
                }
            }

            var mostPouplarResultListIndex = 0;
            var mMostPopularType = mostPopularType[mostPopularTypeIndex];
            for (i = 0; i < this.state.resultList.length; ++i) {
                if (this.state.resultList[i].type === mostPopularType) {
                    mostPouplarResultListIndex = i;
                    break;
                } 
            }

            var mMostPopularTypeTitle = this.state.resultList[mostPouplarResultListIndex].title;

            this.setState ({
                cardData : mCardData,
                finalCardResultList : mfinalCardResultList,
                mostPopularType : mMostPopularType,
                people : mPeople,
                mostPouplarTypeTitle : mMostPopularTypeTitle,
                firebaseLoading : true,
            })
        });
    }

    loadItem = async () => {
        axios
        .get("../json/Result.json")
        .then (( {data }) => {
            this.setState({
                resultList : data.Result
            }, () => {
                // console.log(this.state.resultList);
            });
        })
        .catch(e => { 
            // API 호출이 실패할 경우
            console.error(e);
        });
    };

    render() {
        document.title = "디자이너 성향검사 - 디자이너 모여 다 모여!"
        const result = this.state.finalCardResultList.map((result, index) => (<ArchiveCard key={index} index={index} result={result} gender={this.state.cardData[index].gender} timeStamp={this.state.cardData[index].timeStamp} isMain={true} firebaseLoading={this.state.firebaseLoading}></ArchiveCard>));
        
        return (
            <>
            <StickyHeader></StickyHeader>

            <div className="main">
                <div className="mainTopMargin"></   div>
                <div className="mainPatternBGContainer">
                    <img src="./images/main/mainPattern.svg" alt="" className="mainBGPattner"/>
                    <div data-parallax='{"y":-20, "from-scroll": 0, "distance":100, "smoothness":10}'>
                        <img src="./images/main/mainPatternDesktop.svg" alt="" className="mainBGPattner" id="mainBGPattneDesktop"/>
                    </div>
                </div>
                <div className="titleBubble" data-parallax='{"y":-20, "from-scroll": 0, "distance":30, "smoothness":5}'>
                    <img className="bubbleImg" src="./images/main/mainBubble.svg" alt=""/>
                    {/* <div className="titleBubblePolygon"></div> */}
                    <div className="titleContainer">
                        <span className="subTitle">디자이너 모여라! 다 모여라!</span>
                        <img src="./images/main/dimodamo.svg" alt="DIMODAMO" className="logo"/>
                        <div className="line"></div>
                        <img src="./images/main/dptiTest.svg" alt="DPTI TEST" className="logoDPTI"/>
                        <span className="dptiSubTitle">Design Pattern Type Indicator</span>
                    </div>
                </div>

                <div className="peopleBubbleContainer">
                    <div className="leftBubble" data-parallax='{"x":-6, "from-scroll": 0, "distance":85, "smoothness":10}'>
                        <div className="titleBubblePolygon" id="leftBubblePolygon"></div>
                        <div className="bubbleTextContainer">
                            <span id="bubbleText">나도 몰랐던 나의 조별과제 포지션은?</span>
                        </div>
                    </div>
                    <div className="rightBubble" data-parallax='{"x":6, "from-scroll": 0, "distance":85, "smoothness":10}'>
                    <div className="titleBubblePolygon" id="rightBubblePolygon"></div>
                        <div className="bubbleTextContainer">
                            <span id="bubbleText">미래의 나와 어울리는 디자인 분야는?</span>
                        </div>
                    </div>
                </div>       
            </div>        

            <div className="peopleContainer">
                <img src="./images/main/leftPeople.png" alt="" className="leftPeople" data-parallax='{"y":6, "from-scroll": 0, "distance":85, "smoothness":3}'/>
                <img src="./images/main/leftPeopleDesktop.svg" alt="" className="leftPeople" id="leftPeopleDesktop" data-parallax='{"x":-25, "from-scroll": 0, "distance":85, "smoothness":10}'/>
                <img src="./images/main/rightPeople.png" alt="" className="rightPeople" data-parallax='{"y":6, "from-scroll": 0, "distance":85, "smoothness":3}'/>
                <img src="./images/main/rightPeopleDesktop.svg" alt="" className="rightPeople" id="rightPeopleDesktop" data-parallax='{"x":25, "from-scroll": 0, "distance":85, "smoothness":10}'/>
            </div>

            <div className="mainBottom">
                <div className="testStartContainer" >
                    <Link to="/surveyInformation" className="testStartInnerContainer">
                    <p className="testSubTitle">지금 바로 결과를 확인해보세요!</p>
                        <input type="button" value="TEST START" className="DPTITestStartButton"/>
                    </Link>
                </div>

                <div className="secondMainContainer">
                    <div className="participant">
                        <h1 className="secondMainTitle">현재까지 응시자 수</h1>
                        <div className="participantContainer">
                            <span className="secondMainText" id="participantText">{this.state.people} 명</span>
                        </div>
                    </div>
                    <div className="dptiType">
                        <h1 className="secondMainTitle">가장 많은 DPTI 유형</h1>
                        <div className="participantContainer">
                            <div className="mainIconContainer">
                                <img src={"./images/result/Icon_" + this.state.mostPopularType + ".svg"} alt="" className="dptiTypeIcon"/>
                            </div>
                            <p className="secondMainText" id="dptiTypeText">{this.state.mostPouplarTypeTitle}</p>
                        </div>
                    </div>
                    <div className="dptiResults">
                        <h1 className="secondMainTitle" id="dptiTypeMainTitle">최근 공유된 DPTI 결과</h1>
                        <div className="resultsContainer mainResultsContainer" id="mainResultsContainer">

                        {result}
                        </div>
                    </div>

                    <div className="moreDptiTypeContainer">
                        <Link to="/archive"><input type="button" value="모든 DPTI 유형 보기" className="moreDptiTypeButton"/></Link>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
}

export default Main;