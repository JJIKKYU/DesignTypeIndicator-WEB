import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import StickyHeader from './StickyHeader.js'

class ArchiveCard extends Component {
    render() {
        const { result } = this.props;
        const style = {
            background : result.colorHex
        }
        const textStyle = {
            color : result.colorHex
        }
        return(
            <>
            
            <Link to={"/result/" + result.type + "/" + this.props.gender}>
                <div className="resultCard" id="archiveResultCard" >
                    <div id="mainResultTop" className="mainResultTop archiveResultTop" style={style}>
                        <img src={"../images/result/BC_Char_" + result.color + "_" + this.props.gender + "_" + result.shape + "_" + Math.floor(Math.random() * 3 + 1) + ".svg"} alt="" id="mainResultChar"/>
                        <img src={"../images/result/Type_" + result.color + "_" + result.shape + ".svg"} alt="" id="mainResultType"/>
                        <img src={"../images/result/BC_BGP_" + result.color  + "_" + result.shape + ".svg"} alt="" id="mainResultPattern"/>
                        <h1 id="mainResultTitle">
                            {
                                            
                            String(result.title).split('\n').map((line,index) => {
                                return (<span key={index}>{line}<br/></span>)
                            })
                            }   
                        </h1>
                    </div>
                </div>
            </Link>

            
            </>
        );
    }
}

class ArchiveCardSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadIndex : false,
            resultList : [],
        }
    }

    componentDidMount() {
        this.loadItem();
    }       

    loadItem = async () => {
        axios
        .get("../json/Result.json")
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
        const result = this.state.resultList.map((result, index) => (<ArchiveCard key={index} index={index} result={result} gender={this.props.gender}></ArchiveCard>));
        const cards = []

        for (var i = this.props.count - 4; i < this.props.count; ++i) {
            cards.push(result[i]);
        }
        

        return(
            <>
            <div className="archiveCardsContainer">
                <div className="archiveCardTitleContainer">
                    <span className="archiveCardTitle">{this.props.title}</span>
                </div>
                <div className="resultsContainer">
                    {
                        cards    
                    }
                </div>
            </div>
            </>
        );
    }
}

class Archive extends Component {
    render() {
        return (
            <>
            <StickyHeader></StickyHeader>
            <div className="main">
                <div className="header">
                    <div className="archiveTitleContainer">
                        <div className="archiveTitle">
                            <span>모든 DPTI 유형</span>
                        </div>
                        <div className="close">
                            <img src="./images/close.png" alt="close"/>
                        </div>
                    </div>
                </div>
                <div className="headerTitle">
                    <p className="archiveDesc">
                        디자인 성향 검사 이하 DPTI <span className="orange">(Design Pattern Type Indicator)</span>는 디자인 성향을 파악할 수 있는 테스트입니다. <span className="orange">도형, 색상, 캐릭터</span>의 조합으로 결과를 나타내며 총 <span className="orange">16가지 유형</span>이 <span className="orange">4개의 카테고리</span>로 분류되어있습니다.
                    </p>
                </div>
            </div>
            <div className="secionContainer">
                <ArchiveCardSection title="상상표출형" gender="M" count="4"></ArchiveCardSection>
                <ArchiveCardSection title="자기성찰형" gender="F" count="8"></ArchiveCardSection>
                <ArchiveCardSection title="현실직시형" gender="M" count="12"></ArchiveCardSection>
                <ArchiveCardSection title="감정풍부형" gender="F" count="16"></ArchiveCardSection>
            </div>

            

            
            
            </>
        );
    }
}

export default Archive;