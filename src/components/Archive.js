import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import StickyHeader from './StickyHeader.js'
import Footer from './Footer.js'


class ArchiveCard extends Component {
    constructor(props) {
        super(props);

        this.mainResultCard();
    }

    componentDidMount() {
        console.log(this.props.result);
        this.archiveResultCardAddTag();
    }
    
    // 메인일때만 Date 표시
    mainResultCard = () => {
        if (this.props.isMain === true) {
            return (
            <p id="mainCardDate">{this.props.timeStamp}</p>
            );
        } else {
        }
    } 

    archiveResultCardAddTag = () => {
        if (this.props.isResult === true) return;

        const resultCards = document.getElementsByClassName("resultCard");
        for (var i = 0; i < resultCards.length; ++i) {
            resultCards[i].classList.add("archiveResultCard");
        }
    }

    render() {
        const { result } = this.props;
        const style = {
            background : result.colorHex
        }

        
        return(
            <>
            
            <Link to={"/result/" + result.type + "/" + this.props.gender}>
                <div className="resultCard" id="archiveResultCard" >
                    <div id="mainResultTop" className="mainResultTop archiveResultTop" style={style}>
                        <img src={"../images/result/BC_Char_" + result.color + "_" + this.props.gender + Math.floor(Math.random() * 4 + 1) + "_" + Math.floor(Math.random() * 4 + 1) + ".svg"} alt="" id="mainResultChar"/>
                        <img src={"../images/result/BC_BG_G_" + result.color + ".svg"} id="resultGradient" alt=""/>
                        <img src={"../../images/result/BC_BG_P_" + result.shape + ".svg"} alt="" id="resultPattern"/>
                        <img src={"../images/result/BC_Type_" + result.shape + ".svg"} alt="" id="mainResultType"/>
                        <h1 id="mainResultTitle">
                            { 
                            String(result.title).split('\n').map((line,index) => {
                                return (<span key={index}>{line}<br/></span>)
                            })
                            }   
                        </h1>
                    </div>
                    {this.mainResultCard()}
                </div>
            </Link>

            
            </>
        );
    }
}

ArchiveCard.defaultProps = {
    isMain : false
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
                    <p className="archiveCardTitle">{this.props.title}</p>
                    <p className="archiveCardDesc">디자인 성향 검사 이하 DPTI (Design Pattern Type Indicator)는 디자인 성향을 파악할 수 있는 테스트입니다.
도형, 색상, 캐릭터의 조합으로 결과를 나타내며 총 16가지 유형이 4개의 카테고리로 분류되어있습니다.</p>
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
                <div className="header archiveHeader">
                    <div className="archiveTitleContainer">
                        <div className="archiveTitle">
                            <span>모든 DPTI 유형</span>
                        </div>
                        <div className="close">
                            {/* <img src="./images/close.png" alt="close"/> */}
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
                <ArchiveCardSection key={1} title="현실직시형" gender="M" count="4"></ArchiveCardSection>
                <ArchiveCardSection key={2} title="감정풍부형" gender="F" count="8"></ArchiveCardSection>
                <ArchiveCardSection key={3} title="자기성찰형" gender="M" count="12"></ArchiveCardSection>
                <ArchiveCardSection key={4} title="상상표출형" gender="F" count="16"></ArchiveCardSection>
            </div>

            <Footer></Footer>
            </>
        );
    }
}

export { Archive, ArchiveCard };