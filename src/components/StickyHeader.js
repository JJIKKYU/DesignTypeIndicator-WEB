import React, { Component } from 'react';
import { Link } from "react-router-dom"

class StickyHeader extends Component {

    // Survey 화면일 경우에는 Sticky 속성 제거
    componentDidMount() {
        const header = document.getElementsByClassName("dimodamoHeader");
        if (this.props.isSurveyPage === true) {
            header[0].classList.add("dimodamoSurveyHader");   
        }
    }

    render() {
        var dimodamoURL;
        if (this.props.isResultPage === true) {
            dimodamoURL = "../../images/main/dimodamoWhite.svg";
        } else {
            dimodamoURL = "./images/main/dimodamoWhite.svg";
        }

        return (
            <div className="dimodamoHeader">
                <Link to="/">
                    <img src={dimodamoURL} alt="dimodamo"/>
                </Link>
            </div>
        );
    }
}

export default StickyHeader;