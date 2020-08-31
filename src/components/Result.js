import React, { Component } from 'react';
import axios from "axios";


class Result extends Component {
    constructor(props) {
        super(props);
        this.checkJson = this.checkJson.bind(this);
        
        this.state = {
            loadIndex : false,
            jsonIndex : 0,
            resultList : [],
            title : "",
            desc : "",
            position : "",
            design : ["",""],
            designDesc : ["", ""],
            toolImg : "",
            toolName : "",
            toolDesc : "",
            todo : "",
        }
    }

    checkJson = async () => {
        if (this.state.loadIndex === true) return;
        const { resultList } = this.state;
        var index = 0;
        for (var i = 0; i < resultList.length; ++i) {
            if (resultList[i].type === this.props.finalResult) {
                console.log(resultList[i]);
                index = i;
                break;
            }
            console.log(i);
        }

        this.setState({
            jsonIndex : index,
            title : this.state.resultList[index].title,
            desc : this.state.resultList[index].desc,
            position : this.state.resultList[index].position,
            design : this.state.resultList[index].design,
            designDesc : this.state.resultList[index].designDesc,
            toolImg : this.state.resultList[index].toolImg,
            toolName : this.state.resultList[index].toolName,
            toolDesc : this.state.resultList[index].toolDesc,
            todo : this.state.resultList[index].todo,
            loadIndex : true,
        }, () => {
            console.log(this.state.resultList[this.state.jsonIndex].title);
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
        .get("./json/Result.json")
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
        {console.log(this.state.resultList);}
        return (
            
            <>
            <div className="main">
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

                <div className="positionCard">
                    <h1 className="cardTitle">나의 조별과제 포지션 타입</h1>
                    <div className="positionContainer">
                        <span id="positionText">{this.state.position}</span>
                    </div>
                </div>

                <div className="designCard">
                    <h1 className="cardTitle">나와 어울리는 디자인 분야</h1>
                    <div className="designTypeContainer">
                        <div className="designType">
                            <span className="number">1</span>
                            <span className="designTypeText" id="designTypeTitle1">{this.state.design[0]}</span>
                        </div>
                        <div className="designTypeDesc">
                            <span id="desitnTypeDesc1">{this.state.designDesc[0]}</span>
                        </div>
                    </div>

                    <div className="designTypeContainer">
                        <div className="designType">
                            <span className="number">2</span>
                            <span className="designTypeText" id="designTypeTitle1">{this.state.design[1]}</span>
                        </div>
                        <div className="designTypeDesc">
                            <span id="desitnTypeDesc1">{this.state.designDesc[1]}</span>
                        </div>
                    </div>
                </div>

                <div className="toolCard">
                    <h1 className="cardTitle">나와 닮은 디자인 툴</h1>
                    <div className="toolContainer">
                        <div className="toolImgContainer">
                            <img src={"./images/tool/" + this.state.toolImg + ".png"} alt="" id="toolImg"/>
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
                    <h1 className="cardTitle">디자인 작업이 막힐 때는?</h1>
                    <div className="todoDescContainer">
                        <span id="todoDesc">
                        {this.state.todo}
                        </span>
                    </div>
                </div>

                <div className="buttonContainer">
                    <input className="goHome" type="button" value="홈으로"/>
                    <input className="share" type="button" value="공유하기"/>
                </div>
            </div>
            </>
        );
    }
}

Result.defaultProps = {
    finalResult : "PE",
}

export default Result;