import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    preBtn = () => {
        this.props.moveCard(-1);
    };
    render() {
        console.log(this.props.number);
        return (
            <div className="surveyHeader">
                <div>
                    <div className="prev" id="prev" onClick={this.preBtn}>
                        <img src="./images/prev.svg" alt="PrevIcon" />
                    </div>
                    <div className="dimodamoTitle" id="dimodamoTitle">
                        <img
                            src="./images/branding/title.svg"
                            alt="titleIcon"
                        />
                    </div>
                    <div className="indicator">
                        <span id="indicatorText">1/20</span>
                    </div>
                    <Link to="/">
                        <div className="close">
                            <img src="./images/survey/close.svg" alt="close" />
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
