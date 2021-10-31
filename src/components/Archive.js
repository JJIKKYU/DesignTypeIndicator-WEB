import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StickyHeader from "./StickyHeader.js";
import Footer from "./Footer.js";
import Lottie from "react-lottie";
import { getType } from "./LottieDatas.js";

class ArchiveCard extends Component {
    constructor(props) {
        super(props);
        this.mainResultCard();

        this.state = {
            firebaseLoading: this.props.firebaseLoading,
            result: {
                colorHex: "#FFFFFF",
            },
        };
    }

    componentDidMount() {
        this.archiveResultCardAddTag();
        this.setDisableLoadingCard();
    }

    // 메인일때만 Date 표시
    mainResultCard = () => {
        if (this.props.isMain === true) {
            return <p id="mainCardDate">{this.props.timeStamp}</p>;
        } else {
        }
    };
    // 메인일때 태그 삭제
    mainResultTag = () => {
        if (this.props.isMain === false) {
            return (
                <div className="cardTagContainer">
                    <h3 className="cardTag">#텍스트</h3>
                    <h3 className="cardTag">#텍스트트</h3>
                    <h3 className="cardTag">#텍스트트</h3>
                    <h3 className="cardTag">#텍스트트</h3>
                </div>
            );
        }
    };

    archiveResultCardAddTag = () => {
        if (this.props.isResult === true) return;

        const resultCards = document.getElementsByClassName("resultCard");
        for (var i = 0; i < resultCards.length; ++i) {
            resultCards[i].classList.add("archiveResultCard");
        }
    };

    loadingArchiveCard = () => {
        const { result } = this.props;

        if (this.props.firebaseLoading === true) {
            this.setDisableLoadingCard();

            let dataName = this.props.gender + "_" + result.type;

            console.log(dataName);

            const lottieOptions = {
                animationData: getType(dataName),
                loop: true,
                autoplay: true,
                rendererSettings: {
                    className: "add-class", // svg에 적용
                    preserveAspectRatio: "xMidYMid slice",
                },
            };

            return (
                <Fragment>
                    {/* <img src={"../images/result/BC_Char_" + result.color + "_" + this.props.gender + Math.floor(Math.random() * 4 + 1) + "_" + Math.floor(Math.random() * 4 + 1) + ".svg"} alt="" id="mainResultChar"/> */}
                    {/* 로띠 적용 */}
                    <Lottie
                        options={lottieOptions}
                        isClickToPauseDisabled={false}
                        style={{
                            zIndex: 999,
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                        }}
                        eventListeners={[
                            {
                                eventName: "complete",
                                callback: () =>
                                    console.log("the animation completed"),
                            },
                        ]}
                    />
                    <img
                        src={
                            "../images/result/BC_Type_" + result.shape + ".svg"
                        }
                        alt=""
                        id="mainResultType"
                    />
                    <img
                        src={
                            "../../images/result/BC_BG_P_" +
                            result.shape +
                            ".svg"
                        }
                        alt=""
                        id="resultPattern"
                    />
                    {/* <img src={"../images/result/BC_BG_G_" + result.color + ".svg"} id="resultGradient" alt=""/> */}
                    <h1 id="mainResultTitle">
                        {String(result.title)
                            .split("\n")
                            .map((line, index) => {
                                return (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                );
                            })}
                    </h1>
                </Fragment>
            );
        }
    };

    setDisableLoadingCard = () => {
        if (this.props.firebaseLoading === false) return;
        const loadingContainer = document.getElementsByClassName(
            "loadingMainResultTop"
        );
        for (var i = 0; i < loadingContainer.length; ++i) {
            loadingContainer[i].style.opacity = 0;
        }
    };

    render() {
        const { result } = this.props;
        const style = {
            background: result.colorHex,
        };

        return (
            <Fragment>
                <Link to={"/result/" + result.type + "/" + this.props.gender}>
                    <div className="resultCard" id="archiveResultCard">
                        <div
                            id="loadingMainResultTop"
                            className="loadingMainResultTop"
                        >
                            <div className="loadRect"></div>
                            <img
                                src={"../images/result/BC_Char_Loading.svg"}
                                alt=""
                                id="loadingResultChar"
                            />
                            <img
                                src={"../images/result/BC_Type_Loading.svg"}
                                alt=""
                                id="loadingResultType"
                            />
                            <img
                                src={"../images/result/BC_Loading_Title.svg"}
                                alt=""
                                id="mainResultRoadingTitle"
                            />
                        </div>
                        <div
                            id="mainResultTop"
                            className="mainResultTop archiveResultTop"
                            style={style}
                        >
                            {this.loadingArchiveCard()}
                        </div>
                        {this.mainResultCard()}
                    </div>
                    {this.mainResultTag()}
                </Link>
            </Fragment>
        );
    }
}

ArchiveCard.defaultProps = {
    isMain: false,
    gender: "M",
    firebaseLoading: true,
};

class ArchiveCardSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadIndex: false,
            resultList: [],
        };
    }

    componentDidMount() {
        this.loadItem();
    }

    loadItem = async () => {
        axios
            .get("../json/Result.json")
            .then(({ data }) => {
                this.setState({
                    resultList: data.Result,
                });
            })
            .catch((e) => {
                // API 호출이 실패할 경우
                console.error(e);
            });
    };

    render() {
        const result = this.state.resultList.map((result, index) => (
            <ArchiveCard
                key={index}
                index={index}
                result={result}
                gender={this.props.gender}
            ></ArchiveCard>
        ));
        const cards = [];

        for (var i = this.props.count - 4; i < this.props.count; ++i) {
            cards.push(result[i]);
        }

        return (
            <Fragment>
                <div className="archiveCardsContainer">
                    <div className="newResultsContainer">{cards}</div>
                </div>
            </Fragment>
        );
    }
}

class Archive extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (params, e) => {
        e.preventDefault();

        document.getElementById("type_0").style.backgroundColor = "#FFFFFF";
        document.getElementById("type_0").style.color = "#FF8737";

        document.getElementById("type_1").style.backgroundColor = "#FFFFFF";
        document.getElementById("type_1").style.color = "#FF8737";

        document.getElementById("type_2").style.backgroundColor = "#FFFFFF";
        document.getElementById("type_2").style.color = "#FF8737";

        document.getElementById("type_3").style.backgroundColor = "#FFFFFF";
        document.getElementById("type_3").style.color = "#FF8737";

        switch (params) {
            case "type_0":
                console.log("type_0입니다.");
                document.getElementById(params).style.backgroundColor =
                    "#FF8737";
                document.getElementById(params).style.color = "#FFFFFF";
                break;
            case "type_1":
                console.log("type_1입니다.");
                document.getElementById(params).style.backgroundColor =
                    "#FF8737";
                document.getElementById(params).style.color = "#FFFFFF";
                break;
            case "type_2":
                console.log("type_2입니다.");
                document.getElementById(params).style.backgroundColor =
                    "#FF8737";
                document.getElementById(params).style.color = "#FFFFFF";
                break;
            case "type_3":
                console.log("type_3입니다.");
                document.getElementById(params).style.backgroundColor =
                    "#FF8737";
                document.getElementById(params).style.color = "#FFFFFF";
                break;
        }
    };

    render() {
        return (
            <Fragment>
                <div className="archiveHeaderContainer">
                    <Link to="/">
                        <input
                            type="button"
                            value="모든 유형 보기"
                            className="headerBackButton"
                        />
                    </Link>
                    <h3 className="archiveHeaderTitle">모든 유형 보기</h3>
                </div>

                <div className="HeaderScrollContainer">
                    <button
                        id="type_0"
                        className="typeBtn"
                        onClick={(e) => {
                            this.handleClick("type_0", e);
                        }}
                    >
                        감정풍부형
                    </button>
                    <button
                        id="type_1"
                        className="typeBtn"
                        onClick={(e) => {
                            this.handleClick("type_1", e);
                        }}
                    >
                        상상표출형
                    </button>
                    <button
                        id="type_2"
                        className="typeBtn"
                        onClick={(e) => {
                            this.handleClick("type_2", e);
                        }}
                    >
                        현실직시형
                    </button>
                    <button
                        id="type_3"
                        className="typeBtn"
                        onClick={(e) => {
                            this.handleClick("type_3", e);
                        }}
                    >
                        자기성찰형
                    </button>
                </div>

                <div className="HeaderSubTitle">
                    텍스트를 입력해 주세요. 텍스트를 입력해 주세요. 텍스트를
                    입력해 주세요. 텍스트를 입력해 주세요. 텍스트를 입력해
                    주세요. 텍스트를 입력해 주세요. 텍스트를 입력해 주세요.
                    텍스트를 입력해 주세요.
                </div>

                <div className="archiveGenderSelectContainer">
                    <button
                        id="type_3"
                        className="archiveGenderBtn"
                        onClick={(e) => {
                            this.handleClick("type_3", e);
                        }}
                    >
                        여자
                    </button>
                    <button
                        id="type_3"
                        className="archiveGenderBtn"
                        onClick={(e) => {
                            this.handleClick("type_3", e);
                        }}
                    >
                        남자
                    </button>
                </div>

                <div className="archiveCardSectionContainer">
                    <ArchiveCardSection
                        key={2}
                        title="감정풍부형"
                        gender="F"
                        count="8"
                    ></ArchiveCardSection>
                </div>

                {/*
                <div className="secionContainer">
                    <ArchiveCardSection
                        key={1}
                        title="현실직시형"
                        gender="M"
                        count="4"
                    ></ArchiveCardSection>
                    <ArchiveCardSection
                        key={2}
                        title="감정풍부형"
                        gender="F"
                        count="8"
                    ></ArchiveCardSection>
                    <ArchiveCardSection
                        key={3}
                        title="자기성찰형"
                        gender="M"
                        count="12"
                    ></ArchiveCardSection>
                    <ArchiveCardSection
                        key={4}
                        title="상상표출형"
                        gender="F"
                        count="16"
                    ></ArchiveCardSection>
                </div>
                */}
                <Footer></Footer>
            </Fragment>
        );
    }
}

export { Archive, ArchiveCard };
