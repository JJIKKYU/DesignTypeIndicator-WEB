import React, { Component } from "react";
import { Link } from "react-router-dom";

class Gender extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.state = {
            clicked: false,
            genderButtonClicked: false,
        };
    }

    eventHandler = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        console.log(targetName + ", " + targetValue);

        this.setState(
            {
                clicked: true,
            },
            () => {
                document.getElementById("startButton").style.background =
                    "var(--ORANGE_ACTIVE)";
            }
        );

        this.props.genderSelect(targetValue);
    };

    alert = () => {
        if (this.state.clicked === false) alert("성별을 선택해주세요!");
    };

    nextPage = () => {
        if (this.state.clicked === false) {
            return (
                <input
                    type="button"
                    id="startButton"
                    className="startButton"
                    value="시작해요!"
                    onClick={this.alert}
                />
            );
        } else {
            return (
                <Link to="/survey">
                    <input
                        type="button"
                        id="startButton"
                        className="startButton"
                        value="시작해요!"
                        onClick={this.alert}
                    />
                </Link>
            );
        }
    };

    render() {
        return (
            <>
                <div className="main">
                    <div className="genderHeader">
                        <Link to="/">
                            <img
                                id="mButtonImg"
                                htmlFor="mButton"
                                src="./images/gender/closeBtn.svg"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="generHeaderContainer">
                        <h3 className="genderHeaderTitle">
                            먼저 성별을 선택해주세요
                        </h3>
                        <p className="genderHeaderSubTitle">
                            테스트는 총 20문항 약 3분 정도 소요돼요
                        </p>
                    </div>

                    <div className="bottomGenderContainer">
                        <div className="genderSelectContainer">
                            <div className="leftContainer">
                                <input
                                    type="radio"
                                    className="genderButtonRadio man"
                                    name="gender"
                                    id="mButton"
                                    value="M"
                                    onChange={this.eventHandler}
                                />
                                <img
                                    id="mButtonImg"
                                    htmlFor="mButton"
                                    src="./images/gender/leftMan.svg"
                                    alt=""
                                />
                                <br />
                                <div className="genderDivideLine"></div>

                                <label
                                    className="genderButton"
                                    htmlFor="mButton"
                                    id="mButton"
                                >
                                    남자예요
                                </label>
                            </div>

                            <div className="rightContainer">
                                <input
                                    type="radio"
                                    className="genderButtonRadio woman"
                                    name="gender"
                                    id="fButton"
                                    value="F"
                                    onChange={this.eventHandler}
                                />
                                <img
                                    id="FButtonImg"
                                    src="./images/gender/rightWoman.svg"
                                    alt=""
                                />
                                <br />
                                <div className="genderDivideLine"></div>

                                <label
                                    className="genderButton"
                                    htmlFor="fButton"
                                    id="fButton"
                                >
                                    여자예요
                                </label>
                            </div>
                        </div>

                        <div className="startContainer">
                            {/* <input type="button" className="startButton" value="시작해요!" onClick={this.nextPage}/> */}
                            {this.nextPage()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Gender;
