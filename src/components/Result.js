import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios";
import StickyHeader from './StickyHeader.js'
import Footer from './Footer'
import Lottie from 'react-lottie'
import { getType } from './LottieDatas.js'
  

class Result extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loadIndex : false,
            jsonIndex : 0,
            resultList : [],
            title : "",
            desc : "",
            color : "",
            colorHex : "#FFFFFF",
            shape : "",
            position : "",
            design : ["",""],
            designDesc : ["", ""],
            toolImg : "",
            toolName : "",
            toolDesc : "",
            todo : "",
            resultType : (this.props.match.match.params.type).toUpperCase(),
            gender : (this.props.match.match.params.gender).toUpperCase()
        }
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

        this.setState({
            jsonIndex : index,
            title : this.state.resultList[index].title,
            desc : this.state.resultList[index].desc,
            color : this.state.resultList[index].color,
            colorHex : this.state.resultList[index].colorHex,
            shape : this.state.resultList[index].shape,
            position : this.state.resultList[index].position,
            design : this.state.resultList[index].design,
            designDesc : this.state.resultList[index].designDesc,
            toolImg : this.state.resultList[index].toolImg,
            toolName : this.state.resultList[index].toolName,
            toolDesc : this.state.resultList[index].toolDesc,
            todo : this.state.resultList[index].todo,
            loadIndex : true,
        }, () => {
            document.getElementById("resultTop").style.background = this.state.colorHex;
            document.title = this.state.title;

            window.Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: document.title,
                description: "나만의 디자인 성향을 찾아보세요!",
                imageUrl: "http://dimodamo.com/images/thumb/Thumb.png",
                link: {
                webUrl: document.location.href,
                mobileWebUrl: document.location.href
                }
            },
            buttons: [
                {
                title: '디자인 성향 확인하기',
                link: {
                    mobileWebUrl: document.location.href,
                    webUrl: document.location.href
                }
                }  
            ]
            });
        });
    }

    componentDidMount() {
        this.loadItem();
    }       

    componentDidUpdate() {
        this.checkJson();
    }

    loadItem = async () => {
        axios
        .get("../../json/Result.json")
        .then (( {data }) => {
            this.setState({
                loading : true,
                resultList : data.Result
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

    lineBreak = (text) => {
        const isDesktop = window.innerWidth >= 1280 ? true : false;

        if (isDesktop === false) {
            return (
                String(text).split('\n').map((line,index) => {
                    return (<span key={index}>{line}<br/></span>)
                })
            );
        } else {
            return (<span>{text}</span>);
        }
    } 

    render() {
        let dataName = this.state.gender + "_" + this.state.resultType; 

        const lottieOptions = {
            animationData: getType(dataName),   
            loop: true,        
            autoplay: true,  
            rendererSettings: {
              className: 'add-class', // svg에 적용
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        return (
            <>
            <StickyHeader isResultPage={true}></StickyHeader>
            <div className="main">
                <div className="headerContainer">
                    <div className="header">
                        <div className="prev">
                            <span className="prevText"></span>
                        </div>
   
                        <div className="indicator">
                            <span id="indicatorText"></span>
                        </div>
                        <div className="close">
                            {/* <img src="../../images/close.png" alt="close"/> */}
                        </div>
                    </div>
                </div>

                <div className="resultCardsContainer">
                    <div className="leftCardContainer">
                        <div className="resultCard">
                            <div id="resultTop">
                                {/* <img src={"../../images/result/BC_Char_" + this.state.color + "_" + this.state.gender + Math.floor(Math.random() * 4 + 1) + "_" + Math.floor(Math.random() * 4 + 1) + ".svg"} alt="" id="resultChar"/> */}


                                {/* 로띠 적용 */}
                                <Lottie
                                    options={lottieOptions}
                                    isClickToPauseDisabled={false}
                                    style={{zIndex: 999, position: 'absolute', bottom: 0, right: 0}}
                                    eventListeners={[
                                        {
                                            eventName: 'complete',
                                            callback: () => console.log('the animation completed'),
                                        },
                                    ]}
                                />

                                <img src={"../../images/result/BC_BG_G_" + this.state.color + ".svg"} id="resultGradient" alt=""/>
                                <img src={"../../images/result/BC_Type_" + this.state.shape + ".svg"} alt="" id="resultType"/>
                                <img src={"../../images/result/BC_BG_P_" + this.state.shape + ".svg"} alt="" id="resultPattern"/>
                                <h1 id="resultTitle">
                                    {
                                    String(this.state.title).split('\n').map((line,index) => {
                                        return (<span key={index}>{line}<br/></span>)
                                    })
                                    }
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="rightCardContainer">
                        <div className="dptiTypeContainerDesktop">
                           <h1 className="cardTitle">나의 DPTI 결과</h1>
                            
                            <div className="typeColorNameContainer">
                                {/* Type */}
                                <div className="typeColorName">
                                    <h1 className="typeColorNameTitle">TYPE</h1>
                                    <img src={"../../images/result/Result_Desktop_" + this.state.shape + "_" + this.state.color + "_Type.png"} alt="" className="typeImg"/>
                                </div>

                                {/* Color */}
                                <div className="typeColorName">
                                    <h1 className="typeColorNameTitle">COLOR</h1>
                                    <img src={"../../images/result/Result_Desktop_" + this.state.shape + "_" + this.state.color + "_Color.svg"} alt="" className="typeImg"/>
                                </div>

                                {/* Name */}
                                <div className="typeColorName" id="nameContainer">
                                    <h1 className="typeColorNameTitle">COLOR</h1>
                                    <p className="typeNameTitle">{this.state.title}</p>
                                </div>
                           </div>

                        </div>
                        <div id="resultBottom">
                            <span id="resultDesc">{this.state.desc}</span>
                        </div>
                    
                
                        <div className="positionCard">
                            <h1 className="cardTitle">나의 조별과제 포지션 타입</h1>

                            <div className="positionIconTitleContainer">
                                <div className="mainIconContainer resultIconContainer">
                                    <img src={"../../images/result/Icon_" + this.state.resultType +".svg"} alt="" className="dptiTypeIcon"/>
                                </div>
                                <div className="dptiTypeContainer">
                                    <span className="secondMainText resultMainText" id="dptiTypeText">
                                    {
                                        
                                        this.lineBreak(this.state.position)

                                    }
                                    
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="designCard">
                            <h1 className="cardTitle">나와 어울리는 디자인 분야</h1>
                            <div className="designTypeContainer">
                                <div className="designType">
                                    <p className="number">1</p>
                                    <p className="designTypeText" id="designTypeTitle1">{this.state.design[0]}</p>
                                </div>
                                <div className="designTypeDesc">
                                    <span id="desitnTypeDesc1">

                                    {    
                                        this.lineBreak(this.state.designDesc[0])
                                    }
                                    </span>
                                </div>
                            </div>

                            <div className="designTypeContainer">
                                <div className="designType">
                                    <p className="number">2</p>
                                    <p className="designTypeText" id="designTypeTitle1">{this.state.design[1]}</p>
                                </div>
                                <div className="designTypeDesc">
                                    <span id="desitnTypeDesc1">
                                    {    
                                        this.lineBreak(this.state.designDesc[1])
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="toolCard">
                            <h1 className="cardTitle">나와 닮은 디자인 툴</h1>
                            <div className="toolContainer">
                                <div className="toolImgContainer">
                                    <img src={"../../images/tool/" + this.state.toolImg + ".png"} alt="" id="toolImg"/>
                                </div>
                                <div className="toolNameContainer">
                                    <span id="toolName">{this.state.toolName}</span>
                                </div>
                            </div>
                            <div className="toolDescContainer">
                                <span id="toolDesc">
                                {this.state.toolDesc}
                                </span>
                            </div>
                        </div>

                        <div className="todoCard">
                            <h1 className="cardTitle todoCardTitle">디자인 작업이 막힐 때는?</h1>
                            <div className="todoDescContainer">
                                <span id="todoDesc">
                                {this.state.todo}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="buttonContainer">
                    <Link to="/"><input className="goHome" type="button" value="홈으로"/></Link>
                    <input className="share" id="kakao-link-btn" type="button" value="카카오톡 공유하기"/>
                </div>
                
            </div>
            <Footer></Footer>
            </>
        );
    }
}

Result.defaultProps = {
    finalResult : "TN",
    gender : "F"
}

export default Result;