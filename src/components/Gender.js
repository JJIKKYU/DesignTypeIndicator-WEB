import React, { Component } from 'react';



class Gender extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.state = {
            clicked : false
        }
    }

    eventHandler = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        console.log(targetName + ", " + targetValue);

        this.setState ({
            clicked : true
        })

        this.props.genderSelect(targetValue);
    }

    nextPage = () => {
        if (this.state.clicked === false)
        {
            alert("성별을 선택해주세요!");
            return;
        }
            
        this.props.nextPage(2);
    }

    render() {
        return (
            <>
            <div className="main">
                <div className="mainTopMargin"></div>
                <div className="mainPatternBGContainer">
                    <img src="./images/main/mainPattern.svg" alt="" className="mainBGPattner"/>
                </div>
                <div className="titleBubble" id="genderTitleBubble">
                    <div className="titleBubblePolygon"></div>
                    <div className="titleContainer" id="genderTitleContainer">
                        <p className="intro">
                        디자인 성향 검사 이하 DPTI <br></br>
                        <span className="orange">(Design Pattern Type Indicator)</span>는 <br></br>
                        디자인 성향을 파악할 수 있는 테스트입니다. <br></br>
                        <span className="orange">도형, 색상, 캐릭터</span>의 조합으로 결과를 나타내며 <br></br>
                        총 <span className="orange">20문항</span> 약 <span className="orange">3분</span>의 시간이 소요됩니다. <br></br>
                        질문을 깊게 생각하지 마시고 <br></br>
                        <span className="orange">직관적으로 선택</span>해주세요! <br></br>
                        </p>
                    </div>
                </div>

                <div className="genderSelectContainer">
                    <div className="leftContainer">
                        <input type="radio" className="genderButtonRadio" name="gender" id="mButton" value="M" onChange={this.eventHandler}/>
                        <img src="./images/gender/man.svg" alt=""/><br/>
                        <label className="genderButton" htmlFor="mButton" id="mButton">남자예요</label>
                        
                    </div>

                    <div className="rightContainer">
                        <input type="radio" className="genderButtonRadio" name="gender" id="fButton" value="F" onChange={this.eventHandler}/>
                        <img src="./images/gender/woman.svg" alt=""/><br/>
                        <label className="genderButton" htmlFor="fButton" id="fButton">여자예요</label>
                    </div>
                </div>
                
                <div className="startContainer">
                    <input type="button" className="startButton" value="시작해요!" onClick={this.nextPage}/>
                </div>
            </div>
            
            </>
        );
    }
}

export default Gender;