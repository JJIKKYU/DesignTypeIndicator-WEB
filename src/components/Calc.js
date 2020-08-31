import React, { Component } from 'react';

class Calc extends Component {
    render() {
        return (
            <div className="main">
                <div className="header">
                    <div className="prev">
                        <img src="./images/prev.png" alt="PrevIcon"/>
                        <span className="prevText">이전</span>
                    </div>
                    <div className="indicator">
                        <span id="indicatorText">20/20</span>
                    </div>
                    <div className="close">
                        <img src="./images/close.png" alt="close"/>
                    </div>
                </div>
            </div>

            
        );
    }
}

export default Calc;