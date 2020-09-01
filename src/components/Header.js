import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    preBtn = () => {
        this.props.moveCard(-1);
    }
    render() {
        return (
            <div className="header">
                <a onClick={this.preBtn}>
                    <div className="prev">
                        <img src="./images/prev.png" alt="PrevIcon"/>
                        <span className="prevText">이전</span>
                    </div>
                    <div className="indicator">
                        <span id="indicatorText">1/20</span>
                    </div>
                    <div className="close">
                        <img src="./images/close.png" alt="close"/>
                    </div>
                </a>
            </div>
        );
    }
}

export default Header;