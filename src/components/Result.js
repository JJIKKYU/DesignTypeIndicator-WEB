import React, { Component } from 'react';
// Header.js
import Header from './Header'

class Result extends Component {
    render() {
        return (
            <>
            <Header></Header>
            <div className="resultCard">
                <img src="" alt="" id="resultBG"/>
                <img src="" alt="" id="resultChar"/>
                <img src="" alt="" id="resultPattern"/>
                <h1 id="resultTitle">혼밥하는<br></br>논리대장<br></br>디자이너</h1>
            </div>
            </>
        );
    }
}

export default Result;