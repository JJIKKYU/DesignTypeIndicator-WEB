import React, { Component } from 'react';
import { Link } from "react-router-dom"
import StickyHeader from './StickyHeader.js'
import axios from "axios";
import { fire, getFireResultTypeGender, getFireDBPeople, getFireResultType } from '../firebase.config'

class CurrentCards extends Component {
    render() {
        const { result } = this.props;
        const style = {
            background : result.colorHex
        }
        
        return(
            <>
            <Link to={"/result/" + result.type + "/" + this.props.gender}>
                <div className="resultCard" id="archiveResultCard" >
                    <div id="mainResultTop" className="mainResultTop archiveResultTop" style={style}>
                        <img src={"../images/result/BC_Char_" + result.color + "_" + this.props.gender + "_" + result.shape + "_" + Math.floor(Math.random() * 3 + 1) + ".svg"} alt="" id="mainResultChar"/>
                        <img src={"../images/result/Type_" + result.color + "_" + result.shape + ".svg"} alt="" id="mainResultType"/>
                        <img src={"../images/result/BC_BGP_" + result.color  + "_" + result.shape + ".svg"} alt="" id="mainResultPattern"/>
                        <h1 id="mainResultTitle">
                            {
                                            
                            String(result.title).split('\n').map((line,index) => {
                                return (<span key={index}>{line}<br/></span>)
                            })
                            }   
                        </h1>
                    </div>
                    <p id="mainCardDate">{this.props.timeStamp}</p>
                </div>
            </Link>
            </>
        );
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        fire();
        this.state = {
            people : "",
            cardData : [
            ],
            resultList : [],
            finalCardResultList : [],
            mostPouplarResultListIndex : 0,
        }
    }

    componentDidMount() {
        this.loadItem();
        this.getFireBaseData();
    }

    // 파이어베이스에서 가져오는 데이터 관리
    getFireBaseData = () => {
        getFireDBPeople().then(res => {
            this.setState ({
                people : res.val().people
            }, () => {
                // console.log(this.state.people);
            });
        });

        // 최근 진행한 카드리스트 파이어베이스에서 서치
        getFireResultTypeGender().then(res => {

            var mCardData = []
            for (var i = this.state.people; i > this.state.people - 5; --i) {
                mCardData.push(res.val()[i]);
                this.setState ({
                    cardData : mCardData
                });
            }

            var mfinalCardResultList = []
            for (i = 0; i < this.state.resultList.length; ++i) {
                for (var j = 0; j < this.state.cardData.length; ++j) {
                    if (this.state.resultList[i].type === this.state.cardData[j].type) {
                        mfinalCardResultList.push(this.state.resultList[i]);
                    }
                }
            }
            
            this.setState ({
                finalCardResultList : mfinalCardResultList.reverse()
            })  
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
            mostPopularType = mostPopularType[mostPopularTypeIndex];
            for (i = 0; i < this.state.resultList.length; ++i) {
                if (this.state.resultList[i].type === mostPopularType) {
                    mostPouplarResultListIndex = i;
                    break;
                } 
            }

            this.setState ({
                mostPouplarTypeTitle : this.state.resultList[mostPouplarResultListIndex].title
            })
        });
    }

    loadItem = async () => {
        axios
        .get("../json/Result.json")
        .then (( {data }) => {
            this.setState({
                loading : true,
                resultList : data.Result
            }, () => {
                // console.log(this.state.resultList);
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
        document.title = "디자이너 성향검사 - 디자이너 모여 다 모여!"
        const result = this.state.finalCardResultList.map((result, index) => (<CurrentCards key={index} index={index} result={result} gender={this.state.cardData[index].gender} timeStamp={this.state.cardData[index].timeStamp}></CurrentCards>));
        
        return (
            <>
            <StickyHeader></StickyHeader>

            <div className="main">
                <div className="mainTopMargin"></   div>
                <div className="mainPatternBGContainer"  data-parallax='{"y":12, "from-scroll": 0, "distance":80, "smoothness":0}'>
                    <img src="./images/main/mainPattern.svg" alt="" className="mainBGPattner"/>
                    <img src="./images/main/mainPatternDesktop.svg" alt="" className="mainBGPattner" id="mainBGPattneDesktop"/>
                </div>
                <div className="titleBubble" >
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
                <img src="./images/main/leftPeople.png" alt="" className="leftPeople" data-parallax='{"y":9, "from-scroll": 0, "distance":85, "smoothness":5}'/>
                <img src="./images/main/leftPeopleDesktop.svg" alt="" className="leftPeople" id="leftPeopleDesktop"/>
                <img src="./images/main/rightPeople.png" alt="" className="rightPeople" data-parallax='{"y":9, "from-scroll": 0, "distance":85, "smoothness":5}'/>
                <img src="./images/main/rightPeopleDesktop.svg" alt="" className="rightPeople" id="rightPeopleDesktop"/>
            </div>

            <div className="main">
                <div className="testStartContainer" >
                    <Link to="/surveyInformation">
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
                                <img src="./images/result/IconTest.svg" alt="" className="dptiTypeIcon"/>
                            </div>
                            <p className="secondMainText" id="dptiTypeText">{this.state.mostPouplarTypeTitle}</p>
                        </div>
                    </div>
                    <div className="dptiResults">
                        <h1 className="secondMainTitle">최근 공유된 DPTI 결과</h1>
                        <div className="resultsContainer">

                        {result}
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