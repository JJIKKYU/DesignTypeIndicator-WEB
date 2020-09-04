import React, { Component } from 'react';
import { Link } from "react-router-dom"

class StickyHeader extends Component {


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