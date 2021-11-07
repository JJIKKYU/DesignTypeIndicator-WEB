import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    fire,
    getFireResultTypeGender,
    getFireDBPeople,
    getFireResultType,
} from "../firebase.config";
import { ArchiveCard } from "./Archive.js";
import Footer from "./Footer.js";

class Main extends Component {
    constructor(props) {
        super(props);
        fire();

        this.state = {
            firebaseLoading: false,
            people: "0",
            cardData: [
                { gender: "M" },
                { gender: "M" },
                { gender: "M" },
                { gender: "M" },
                { gender: "M" },
            ],
            resultList: [],
            finalCardResultList: [
                { colorHex: "#FFFFFF" },
                { colorHex: "#FFFFFF" },
                { colorHex: "#FFFFFF" },
                { colorHex: "#FFFFFF" },
                { colorHex: "#FFFFFF" },
            ],
            mostPouplarResultListIndex: 0,
            mostPouplarTypeTitle: "",
            MostPopularToolImage: "",
            MostPopularToolName: "",
            MostPopularDesign1: "",
            MostPopularDesign2: "",
            mostPopularType: "",
        };
    }

    componentDidMount() {
        this.loadItem();
        this.getFireBaseData();
        this.setScrollPosition();
        this.lotationTitle();
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
    };

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
    };

    // 파이어베이스에서 가져오는 데이터 관리
    getFireBaseData = async () => {
        var mPeople = 0;
        getFireDBPeople().then((res) => {
            mPeople = res.val().people;
        });

        var mfinalCardResultList = [];
        var mCardData = [];

        // 최근 진행한 카드리스트 파이어베이스에서 서치
        getFireResultTypeGender().then((res) => {
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
        });

        // 가장 많은 DPTI 유형 파이어베이스에서 서치
        getFireResultType().then((res) => {
            // 파이어베이스와 동일한 순서로 되어있음
            const type = [
                "FE",
                "FI",
                "FN",
                "FS",
                "JE",
                "JI",
                "JN",
                "JS",
                "PE",
                "PI",
                "PN",
                "PS",
                "TE",
                "TI",
                "TN",
                "TS",
            ];

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

            var mMostPopularTypeTitle =
                this.state.resultList[mostPouplarResultListIndex].title;
            var mMostPopularToolImage =
                this.state.resultList[mostPouplarResultListIndex].toolImg;
            var mMostPopularToolName =
                this.state.resultList[mostPouplarResultListIndex].toolName;
            var mMostPopularDesign1 =
                this.state.resultList[mostPouplarResultListIndex].design[0];
            var mMostPopularDesign2 =
                this.state.resultList[mostPouplarResultListIndex].design[1];

            console.log(this.state.resultList[mostPouplarResultListIndex]);

            this.setState(
                {
                    cardData: mCardData,
                    finalCardResultList: mfinalCardResultList,
                    mostPopularType: mMostPopularType,
                    people: mPeople,
                    mostPouplarTypeTitle: mMostPopularTypeTitle,
                    MostPopularToolImage: mMostPopularToolImage,
                    MostPopularToolName: mMostPopularToolName,
                    MostPopularDesign1: mMostPopularDesign1,
                    MostPopularDesign2: mMostPopularDesign2,
                    firebaseLoading: true,
                },
                () => {
                    window.Kakao.Link.createDefaultButton({
                        container: "#kakao-link-btn-main",
                        objectType: "feed",
                        content: {
                            title: document.title,
                            description: "나만의 디자인 성향을 찾아보세요!",
                            imageUrl:
                                "http://dimodamo.com/images/thumb/Thumbnail.png",
                            link: {
                                webUrl: document.location.href,
                                mobileWebUrl: document.location.href,
                            },
                        },
                        buttons: [
                            {
                                title: "디자인 성향 확인하기",
                                link: {
                                    mobileWebUrl: document.location.href,
                                    webUrl: document.location.href,
                                },
                            },
                        ],
                    });
                }
            );
        });
    };

    lotationTitle = () => {
        var titleAarr = [
            "내 조별과제 포지션은?",
            "나와 닮은 디자인 툴은?",
            "나랑 어울리는 분야는?",
        ];
        var titleBubble = document.getElementById("mainBubble");
        var titleBubbleContainer = document.getElementById(
            "mainTitleBubbleContainer"
        );
        var secondBubble = document.getElementById("secondBubble");
        var secondBubbleContainer = document.getElementById(
            "secondTitleBubbleContainer"
        );

        var i = 0;
        setInterval(() => {
            if (i % 2 == 0) {
                titleBubbleContainer.style.right = "-300px";
                titleBubbleContainer.style.opacity = "0";

                secondBubble.innerHTML = titleAarr[(i + 1) % titleAarr.length];
                secondBubbleContainer.style.right = "35px";
                secondBubbleContainer.style.opacity = "1";
            } else {
                titleBubble.innerHTML = titleAarr[(i + 1) % titleAarr.length];
                titleBubbleContainer.style.right = "35px";
                titleBubbleContainer.style.opacity = "1";

                secondBubbleContainer.style.right = "-300px";
                secondBubbleContainer.style.opacity = "0";
            }

            i = i + 1;
        }, 4000);
    };

    loadItem = async () => {
        axios
            .get("../json/Result.json")
            .then(({ data }) => {
                this.setState(
                    {
                        resultList: data.Result,
                    },
                    () => {
                        // console.log(this.state.resultList);
                    }
                );
            })
            .catch((e) => {
                // API 호출이 실패할 경우
                console.error(e);
            });
    };

    render() {
        document.title = "디자이너 성향검사 - 디자이너 모여 다 모여!";
        const result = this.state.finalCardResultList.map((result, index) => (
            <ArchiveCard
                key={index}
                index={index}
                result={result}
                gender={this.state.cardData[index].gender}
                timeStamp={this.state.cardData[index].timeStamp}
                isMain={true}
                firebaseLoading={this.state.firebaseLoading}
            ></ArchiveCard>
        ));

        return (
            <>
                <div className="newMain">
                    <img
                        src="./images/main/dimodamo.svg"
                        alt="DIMODAMO"
                        className="newMainLogo"
                    />
                    <div className="newMainTitleLine"></div>
                    <h1 className="mainTitleTop">디자이너</h1>
                    <h1 className="mainTitleBottom">성향 테스트</h1>
                    <h1 className="mainTitleDpti">DPTI</h1>
                    <div className="newMainTitleLine"></div>
                    <h3 className="mainSubTitle">
                        Designer Personality Type Indicator
                    </h3>
                    <img
                        src="./images/main/shapeDeco_0.png"
                        id="mainDeco0"
                        alt=""
                    />
                    <img
                        src="./images/main/shapeDeco_1.png"
                        id="mainDeco1"
                        alt=""
                    />
                    <img
                        src="./images/main/shapeDeco_2.png"
                        id="mainDeco2"
                        alt=""
                    />
                </div>

                <div className="mainTitleImageContainer">
                    <div
                        className="mainTitleBubbleContainer"
                        id="mainTitleBubbleContainer"
                    >
                        <img
                            src="./images/main/mainTitleBubble.svg"
                            alt=""
                            className="mainTitleBubble"
                        />
                        <h3 className="mainBubbleTitle" id="mainBubble">
                            내 조별과제 포지션은?
                        </h3>
                    </div>

                    <div
                        className="mainTitleBubbleContainer"
                        id="secondTitleBubbleContainer"
                    >
                        <img
                            src="./images/main/mainTitleBubble.svg"
                            alt=""
                            className="mainTitleBubble"
                        />
                        <h3 className="mainBubbleTitle" id="secondBubble">
                            내 조별과제 포지션은?
                        </h3>
                    </div>

                    <img
                        src="./images/main/mainTitleImage.svg"
                        alt=""
                        className="mainTitleHumanImage"
                    />
                </div>

                <div className="testStartContainer">
                    <Link
                        to="/surveyInformation"
                        className="testStartInnerContainer"
                    >
                        <input
                            type="button"
                            value="테스트 START!"
                            className="DPTITestStartButton"
                        />
                    </Link>

                    <div className="DPTIParticipantContainer">
                        <p className="newParticipant">
                            <span className="newParticipantTitle">
                                지금까지 참여자 수
                            </span>
                            <span className="newParticipantCountTitle">
                                {this.state.people} 명
                            </span>
                        </p>
                    </div>
                </div>

                <div className="newResultContainer">
                    <div className="newResultCardContainer">
                        <div className="newResultCardContainerTitle">
                            <img
                                src="./images/main/titlePoint.svg"
                                alt=""
                                className="titlePoint"
                            />
                            <h3 className="title">가장 많은 조별과제 포지션</h3>
                        </div>
                        <div className="newResultCardContainerDivideLine"></div>
                        <div className="newResultCardContainerIn">
                            <div className="newResultImageContainer">
                                <img
                                    src={
                                        "./images/result/Icon_" +
                                        this.state.mostPopularType +
                                        ".svg"
                                    }
                                    alt=""
                                    className="newResultImage"
                                />
                            </div>

                            <div className="newResultTypeTitleContainer">
                                <h3 className="newResultTypeTitle">
                                    {this.state.mostPouplarTypeTitle}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="newResultCardContainer">
                        <div className="newResultCardContainerTitle">
                            <img
                                src="./images/main/titlePoint.svg"
                                alt=""
                                className="titlePoint"
                            />
                            <h3 className="title">가장 많은 디자인 툴</h3>
                        </div>
                        <div className="newResultCardContainerDivideLine"></div>
                        <div
                            className="newResultCardContainerIn"
                            id="newResultCardContainerInDesignTool"
                        >
                            <img
                                src={
                                    "./images/tool/" +
                                    this.state.MostPopularToolImage +
                                    ".png"
                                }
                                alt=""
                                className="newResultImage"
                                id="newResultToolIcon"
                            />
                            <div
                                className="newResultTypeTitleContainer"
                                id="newDesignToolContainer"
                            >
                                <h3
                                    className="newResultTypeTitle"
                                    id="designToolTitle"
                                >
                                    {this.state.MostPopularToolName}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="newResultCardContainer">
                        <div className="newResultCardContainerTitle">
                            <img
                                src="./images/main/titlePoint.svg"
                                alt=""
                                className="titlePoint"
                            />
                            <h3 className="title">가장 많은 디자인 분야</h3>
                        </div>
                        <div className="newResultCardContainerDivideLine"></div>
                        <div
                            className="newResultCardContainerIn"
                            id="newManyDesignContainer"
                        >
                            <div className="firstDeisgnTypeContainer">
                                <h3 className="designTypeNumber">1</h3>
                                <h3 className="designType">
                                    {this.state.MostPopularDesign1}
                                </h3>
                            </div>
                            <div className="secondDeisgnTypeContainer">
                                <h3 className="designTypeNumber">2</h3>
                                <h3 className="designType">
                                    {this.state.MostPopularDesign2}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="informationContainer">
                        <h3 className="informationTitle">
                            ※’가장 많은’ 통계는 1시간마다 갱신됩니다.
                        </h3>
                        <h3 className="informationTitle">
                            ※참여자 수는 실시간으로 반영됩니다.
                        </h3>
                    </div>
                </div>

                <div className="mainBottom">
                    <div className="secondMainContainer">
                        <div className="dptiResults">
                            <h1
                                className="secondMainTitle"
                                id="dptiTypeMainTitle"
                            >
                                최근 공유된 DPTI 결과
                            </h1>
                            <div
                                className="resultsContainer mainResultsContainer"
                                id="mainResultsContainer"
                            >
                                {result}
                            </div>
                        </div>

                        <div className="moreDptiTypeContainer">
                            <Link to="/archive">
                                <input
                                    type="button"
                                    value="모든 유형 보기"
                                    className="moreDptiTypeButton"
                                />
                            </Link>
                            <input
                                type="button"
                                id="kakao-link-btn-main"
                                value="친구에게 공유하기"
                                className="shareButton"
                            />
                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </>
        );
    }
}

export default Main;
