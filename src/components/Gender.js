import React, { Component } from 'react';
import { Link } from "react-router-dom"
import StickyHeader from './StickyHeader.js'

class Gender extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.state = {
            clicked : false,
            genderButtonClicked : false
        }
    }

    eventHandler = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        console.log(targetName + ", " + targetValue);

        this.setState ({
            clicked : true
        }, () => {
            document.getElementById("startButton").style.background = "var(--ORANGE_ACTIVE)"
        });

        this.props.genderSelect(targetValue);
    }

    alert = () => {
        if (this.state.clicked === false)
            alert("성별을 선택해주세요!");
    }

    nextPage = () => {
        if (this.state.clicked === false)
        {
            return (<input type="button" id="startButton" className="startButton" value="시작해요!" onClick={this.alert}/>);
        } else {
            return (<Link to="/survey"><input type="button" id="startButton" className="startButton" value="시작해요!" onClick={this.alert}/></Link>);
        }
    }

    render() {
        return (
            <>
            <StickyHeader></StickyHeader>
            <div className="main">
                <div className="genderHeader"></div>
                <div className="genderTitleContainer">
                    <img className="genderTextBG" src="./images/gender/genderTextBG.svg" alt=""/>
                    <div id="genderTitleContainer">
                        <p className="intro">
                        디자인 성향 검사 이하 DPTI <br></br>
                        <span className="orange">(Design Pattern Type Indicator)</span>는 <br></br>
                        디자인 성향을 파악할 수 있는 테스트입니다. <br></br>
                        <span className="orange">도형, 색상, 캐릭터</span>의 조합으로 결과를 나타내며 <br></br>
                        총 <span className="orange">20문항</span> 약 <span className="orange">3분</span>의 시간이 소요됩니다. <br></br><br/>
                        질문을 깊게 생각하지 마시고 <span className="orange">직관적으로 선택</span>해주세요! <br></br>
                        </p>
                    </div>
                </div>

                <div className="genderSelectContainer">
                    <div className="leftContainer">
                        <input type="radio" className="genderButtonRadio" name="gender" id="mButton" value="M" onChange={this.eventHandler}/>
                        <img id="mButtonImg" htmlFor="mButton" src="./images/gender/man.svg" alt=""/><br/>
                        <label className="genderButton" htmlFor="mButton" id="mButton">남자예요</label>
                        
                    </div>

                    <div className="rightContainer">
                        <input type="radio" className="genderButtonRadio" name="gender" id="fButton" value="F" onChange={this.eventHandler}/>
                        <img id="FButtonImg" src="./images/gender/woman.svg" alt=""/><br/>
                        <label className="genderButton" htmlFor="fButton" id="fButton">여자예요</label>
                    </div>
                </div>
                
                
                <div className="startContainer">
                    {/* <input type="button" className="startButton" value="시작해요!" onClick={this.nextPage}/> */}
                    {this.nextPage()}
                </div>
            </div>
            
            </>
        );
    }
}

export default Gender;