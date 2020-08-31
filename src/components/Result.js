import React, { Component } from 'react';
// Header.js
import Header from './Header'

class Result extends Component {
    render() {
        return (
            <>
            <div className="header">
                <div className="prev">
                    <span className="prevText"></span>
                </div>
                <div className="indicator">
                    <span id="indicatorText">사용자님의 결과</span>
                </div>
                <div className="close">
                    <img src="./images/close.png" alt="close"/>
                </div>
            </div>


            <div className="resultCard">
                <div id="resultTop">
                    <img src="./images/Blue_M_Tri_1.png" alt="" id="resultChar"/>
                    <img src="./images/Blue_Type_Circle.png" alt="" id="resultType"/>
                    <img src="./images/Blue_Tri.png" alt="" id="resultPattern"/>
                    <h1 id="resultTitle">혼밥하는<br></br>논리대장<br></br>디자이너</h1>
                </div>
                <div id="resultBottom">
                    <span id="resultDesc">무슨 생각 중이야? 라는 말 많이 들어보셨죠? 당신은 객관적인 판단과 당위성을 중요시하는 이 시대의 논리 대장 디자이너! 전통과 규율에 얽매이는 딱딱함이 아니라, 이론과 논리를 중요시하고 작업을 진행하면서 최대한 감정을 배제하는 이성의 결정체로, 주변 사람들에게 간혹 차갑다는 말을 들을 때도 있어요. 하지만 이성과 논리를 장착한 당신의 디자인은 모두에게 든든함을 안겨줄 거에요! 당신은 좀처럼 자신을 속이지 않으니까요!</span>
                </div>
            </div>

            <div className="positionCard">
                <h1 className="cardTitle">나의 조별과제 포지션 타입</h1>
                <div className="positionContainer">
                    <span id="positionText">모든걸 기록하고 기억하는 팔만대장경!</span>
                </div>
            </div>

            <div className="designCard">
                <h1 className="cardTitle">나와 어울리는 디자인 분야</h1>
                <div className="designTypeContainer">
                    <div className="designType">
                        <span className="number">1</span>
                        <span className="designTypeText" id="designTypeTitle1">UXUI</span>
                    </div>
                    <div className="designTypeDesc">
                        <span id="desitnTypeDesc1">객관적인 논리를 갖춘 당신! UXUI 디자인은 어떠신가요?</span>
                    </div>
                </div>

                <div className="designTypeContainer">
                    <div className="designType">
                        <span className="number">2</span>
                        <span className="designTypeText" id="designTypeTitle1">편집</span>
                    </div>
                    <div className="designTypeDesc">
                        <span id="desitnTypeDesc1">꼼꼼하고 정확한 편집디자인!<br></br>당신이라면 믿을 수 있어요!</span>
                    </div>
                </div>
            </div>

            <div className="toolCard">
                <h1 className="cardTitle">나와 닮은 디자인 툴</h1>
                <div className="toolContainer">
                    <div className="toolImgContainer">
                        <img src="./images/tool/InDesign.png" alt="" id="toolImg"/>
                    </div>
                    <div className="toolNameContainer">
                        <span id="toolName">인디자인</span>
                    </div>
                </div>
                <div className="toolDescContainer">
                    <span id="toolDesc">
                        여러 페이지를 가진 인쇄물을 디자인할 때 필수적인 인디자인!  초기 문서 설정부터 마지막 인쇄 설정까지 꼼꼼하고 철두철미한 집중력이 필요하죠. 침착하고 이성적인 당신을 닮아 프로젝트의 처음부터 끝까지 튼튼한 계단을 쌓듯 든든한 조력자가 되어준답니다!
                    </span>
                </div>
            </div>

            <div className="todoCard">
                <h1 className="cardTitle">디자인 작업이 막힐 때는?</h1>
                <div className="todoDescContainer">
                    <span id="todoDesc">
                    사실 당신은 답을 알고 계실 거예요. 온전히 혼자 있는 시간이 필요하죠. 어떠한 방해 없이 혼자서 고민하고 쉬는 시간을 가져봤는데도 문제를 해결하거나 에너지를 충전하지 못하셨다면 한적한 거리를 산책하거나, 밀린 집안일이나 관심이 생겼던 취미처럼 작업과 전혀 상관없는 일을 해보는 것도 좋아요. 당신과 깊은 친밀감을 공유하는 사람과 대화를 나누는 것도 좋은 방법이랍니다!
                    </span>
                </div>
            </div>

            <div className="buttonContainer">
                <input className="goHome" type="button" value="홈으로"/>
                <input className="share" type="button" value="공유하기"/>
            </div>
            </>
        );
    }
}

export default Result;