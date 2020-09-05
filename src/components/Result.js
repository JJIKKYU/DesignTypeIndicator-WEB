import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios";
import StickyHeader from './StickyHeader.js'


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
            colorHex : "",
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

    render() {
        return (
            <>
            <StickyHeader isResultPage={true}></StickyHeader>
            <div className="main">
                <div className="headerContainer">
                    <div className="header">
                        <div className="prev">
                            <span className="prevText"></span>
                        </div>
                        <Link to="/">
                            <div className="dimodamoTitle" id="dimodamoTitle">
                                <img src="../../images/branding/title.svg" alt="titleIcon"/>
                            </div>
                        </Link>
                        <div className="indicator">
                            <span id="indicatorText">사용자님의 결과</span>
                        </div>
                        <div className="close">
                            <img src="../../images/close.png" alt="close"/>
                        </div>
                    </div>
                </div>

                <div className="resultCardsContainer">
                    <div className="leftCardContainer">
                        <div className="resultCard">
                            <div id="resultTop">
                                <img src={"../../images/result/BC_Char_" + this.state.color + "_" + this.state.gender + "_" + this.state.shape + "_" + Math.floor(Math.random() * 3 + 1) + ".svg"} alt="" id="resultChar"/>
                                <img src={"../../images/result/Type_" + this.state.color + "_" + this.state.shape + ".svg"} alt="" id="resultType"/>
                                <img src={"../../images/result/BC_BGP_" + this.state.color  + "_" + this.state.shape + ".svg"} alt="" id="resultPattern"/>
                                <h1 id="resultTitle">
                                    {
                                        
                                    String(this.state.title).split('\n').map((line,index) => {
                                        return (<span key={index}>{line}<br/></span>)
                                    })
                                    }
                                </h1>
                            </div>
                            <div id="resultBottom">
                                <span id="resultDesc">{this.state.desc}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rightCardContainer">
                        <div className="positionCard">
                            <h1 className="cardTitle">나의 조별과제 포지션 타입</h1>
                            <div className="mainIconContainer">
                                <img src="../../images/result/IconTest.svg" alt="" className="dptiTypeIcon"/>
                            </div>
                            <div className="dptiTypeContainer">
                                <span className="secondMainText" id="dptiTypeText">
                                {
                                        
                                String(this.state.position).split('\n').map((line,index) => {
                                    return (<span key={index}>{line}<br/></span>)
                                })
                                }
                                </span>
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
                                    String(this.state.designDesc[0]).split('\n').map((line,index) => {
                                        return (<span key={index}>{line}<br/></span>)
                                    })
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
                                    String(this.state.designDesc[1]).split('\n').map((line,index) => {
                                        return (<span key={index}>{line}<br/></span>)
                                    })
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

                        <div className="buttonContainer">
                            <Link to="/"><input className="goHome" type="button" value="홈으로"/></Link>
                            <input className="share" id="kakao-link-btn" type="button" value="카카오톡 공유하기"/>
                        </div>
                    </div>
                </div>

                
            </div>
            </>
        );
    }
}

Result.defaultProps = {
    finalResult : "TN",
    gender : "F"
}

export default Result;