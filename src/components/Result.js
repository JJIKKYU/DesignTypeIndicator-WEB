import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StickyHeader from "./StickyHeader.js";
import Footer from "./Footer";
import Lottie from "react-lottie";
import { getType } from "./LottieDatas.js";

class Result extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadIndex: false,
            jsonIndex: 0,
            resultList: [],
            title: "",
            desc: "",
            color: "",
            colorHex: "#FFFFFF",
            shape: "",
            position: "",
            design: ["", ""],
            designDesc: ["", ""],
            toolImg: "",
            toolName: "",
            toolDesc: "",
            todo: "",
            resultType: this.props.match.match.params.type.toUpperCase(),
            gender: this.props.match.match.params.gender.toUpperCase(),
        };
    }

    checkJson = async () => {
        if (this.state.loadIndex === true) return;
        const { resultList } = this.state;
        var index = 0;
        for (var i = 0; i < resultList.length; ++i) {
            if (resultList[i].type === this.state.resultType) {
                index = i;
                break;
            }
        }

        this.setState(
            {
                jsonIndex: index,
                title: this.state.resultList[index].title,
                desc: this.state.resultList[index].desc,
                color: this.state.resultList[index].color,
                colorHex: this.state.resultList[index].colorHex,
                shape: this.state.resultList[index].shape,
                position: this.state.resultList[index].position,
                design: this.state.resultList[index].design,
                designDesc: this.state.resultList[index].designDesc,
                toolImg: this.state.resultList[index].toolImg,
                toolName: this.state.resultList[index].toolName,
                toolDesc: this.state.resultList[index].toolDesc,
                todo: this.state.resultList[index].todo,
                loadIndex: true,
            },
            () => {
                document.getElementById(
                    "lottieTopAnimationContainer"
                ).style.background = this.state.colorHex;
                document.title = this.state.title;

                window.Kakao.Link.createDefaultButton({
                    container: "#kakao-link-btn",
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
    };

    componentDidMount() {
        this.loadItem();
    }

    componentDidUpdate() {
        this.checkJson();
    }

    loadItem = async () => {
        axios
            .get("../../json/Result.json")
            .then(({ data }) => {
                this.setState({
                    loading: true,
                    resultList: data.Result,
                });
            })
            .catch((e) => {
                // API 호출이 실패할 경우
                console.error(e);
                this.setState({
                    loading: false,
                });
            });
    };

    lineBreak = (text) => {
        const isDesktop = window.innerWidth >= 1280 ? true : false;

        if (isDesktop === false) {
            return String(text)
                .split("\n")
                .map((line, index) => {
                    return (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    );
                });
        } else {
            return <span>{text}</span>;
        }
    };

    render() {
        let dataName = this.state.gender + "_" + this.state.resultType;

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
            <>
                <div className="resultHeaderContainer">
                    <h3 className="resultHeaderTitle">내 DPTI 테스트 결과!</h3>
                </div>
                <div className="main">
                    <div className="resultTopContainer">
                        <div
                            className="lottieTopAnimationContainer"
                            id="lottieTopAnimationContainer"
                        >
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
                                            console.log(
                                                "the animation completed"
                                            ),
                                    },
                                ]}
                            />

                            <img
                                src={
                                    "../../images/result/BC_Type_" +
                                    this.state.shape +
                                    ".svg"
                                }
                                alt=""
                                id="resultType"
                            />
                            <img
                                src={
                                    "../../images/result/BC_BG_P_" +
                                    this.state.shape +
                                    ".svg"
                                }
                                alt=""
                                id="resultPattern"
                            />
                            <h1 id="resultTitle">
                                {String(this.state.title)
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
                        </div>

                        <div className="resultNameColorTypeContainer">
                            <div className="nameContainer">
                                <h3 className="boxTitle">NAME</h3>
                                <h3 className="nameTitle">
                                    어쩌어쩌 저쩌저쩌 이러이러 저러저러
                                </h3>
                            </div>
                            <div className="colorContainer">
                                <h3 className="boxTitle">COLOR</h3>
                                <div className="colorTypeContainer">
                                    <img
                                        src={
                                            "../../images/result/Color=" +
                                            this.state.shape +
                                            "_" +
                                            this.state.color +
                                            ".svg"
                                        }
                                        alt=""
                                        className="typeImg"
                                    />
                                </div>
                            </div>
                            <div className="typeContainer">
                                <h3 className="boxTitle">TYPE</h3>
                                <div className="colorTypeContainer">
                                    <img
                                        src={
                                            "../../images/result/Type=" +
                                            this.state.shape +
                                            "_" +
                                            this.state.color +
                                            ".svg"
                                        }
                                        alt=""
                                        className="typeImg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="expContainer">
                            <h3 className="boxTitle">EXPLAINTAION</h3>
                            <h3 className="expDesc">{this.state.desc}</h3>
                        </div>
                    </div>

                    <div className="resultBottomContainer">
                        <div className="resultPositionContainer">
                            <h3 className="subResultTitle">
                                내 조별과제 포지션은?
                            </h3>
                            <div className="newPositionContainer">
                                <div className="newPositionImageContainr">
                                    <img
                                        src={
                                            "../../images/result/Icon_" +
                                            this.state.resultType +
                                            ".svg"
                                        }
                                        alt=""
                                        className="positionIcon"
                                    />
                                </div>

                                <div className="positionDivideLine"></div>
                                <div className="newPositionDesc">
                                    {this.lineBreak(this.state.position)}
                                </div>
                            </div>
                        </div>

                        <div className="resultDesignTypeContainer">
                            <h3 className="subResultTitle" id="resultTypeTitle">
                                나와 어울리는 디자인 분야는?
                            </h3>
                            <div className="newDesignTypeContainer">
                                <div className="subDesignTypeContainer one">
                                    <div className="subDesignTypeContainerTop">
                                        <span className="countNumber">1</span>
                                        <span className="subTypeTitle">
                                            {this.state.design[0]}
                                        </span>
                                    </div>
                                    <div className="subDesignTypeContainerDivideLine"></div>
                                    <div className="subDesignTypeContainerBottom">
                                        {this.state.designDesc[0]}
                                    </div>
                                </div>
                                <div className="subDesignTypeContainer two">
                                    <div className="subDesignTypeContainerTop">
                                        <span className="countNumber">1</span>
                                        <span className="subTypeTitle">
                                            {this.state.design[1]}
                                        </span>
                                    </div>
                                    <div className="subDesignTypeContainerDivideLine"></div>
                                    <div className="subDesignTypeContainerBottom">
                                        {this.state.designDesc[1]}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="resultDesignToolContainer">
                            <h3 className="subResultTitle" id="resultToolTitle">
                                나와 닮은 디자인 툴은?
                            </h3>
                            <div className="newDesignToolContainer">
                                <div className="newDesignToolTopContainer">
                                    <img
                                        src={
                                            "../../images/tool/" +
                                            this.state.toolImg +
                                            ".png"
                                        }
                                        alt=""
                                        id="newToolImg"
                                    />
                                    <h3 className="newDesignToolTitle">
                                        {this.state.toolName}
                                    </h3>
                                </div>
                                <div className="newDesignToolDivideLine"></div>
                                <div className="newDesignToolBottomContainer">
                                    {this.state.toolDesc}
                                </div>
                            </div>
                        </div>

                        <div className="resultTodoContainer">
                            <h3 className="subResultTitle" id="resultTodoTitle">
                                디자인 작업이 막힐 때는?
                            </h3>
                            <div className="newDesignTodoContainer">
                                <div
                                    className="newDesignToolTopContainer"
                                    id="todoTopContainer"
                                >
                                    <img
                                        src={"../../images/result/todoImg.svg"}
                                        alt=""
                                        id="newTodoImg"
                                    />
                                </div>
                                <div
                                    className="newDesignToolDivideLine"
                                    id="todoDivide"
                                ></div>
                                <div className="newDesignToolBottomContainer">
                                    {this.state.todo}
                                </div>
                            </div>
                        </div>

                        <div className="newShareContainer">
                            <Link to="/">
                                <input
                                    className="newGoHome"
                                    type="button"
                                    value="홈으로"
                                />
                            </Link>

                            <input
                                className="shareKaKao"
                                id="kakao-link-btn"
                                type="button"
                                value="내 결과 카톡 공유하기"
                            />

                            <a
                                href={
                                    "../../images/resultImage/" +
                                    dataName +
                                    ".jpg"
                                }
                                download
                            >
                                <input
                                    className="shareStory"
                                    id="kakao-link-btn"
                                    type="button"
                                    value="내 결과 스토리 공유하기"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="resultBottomimageContainer">
                    <div className="bottomImageContainer">
                        <img
                            src={"../../images/result/resultBottomImg.svg"}
                            alt=""
                            id="resultType"
                        />
                    </div>
                </div>
                <Footer></Footer>
            </>
        );
    }
}

Result.defaultProps = {
    finalResult: "TN",
    gender: "F",
};

export default Result;
