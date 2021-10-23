import React, { Component } from "react";

class Header extends Component {
    preBtn = () => {
        this.props.moveCard(-1);
    };
    render() {
        return (
            <div className="surveyHeader">
                <div>
                    <div className="prev" id="prev" onClick={this.preBtn}>
                        <img src="./images/prev.svg" alt="PrevIcon" />
                        <span className="prevText">이전</span>
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
                    <div className="close">
                        {/* <img src="./images/close.svg" alt="close"/> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
