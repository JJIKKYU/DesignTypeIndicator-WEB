import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Footer extends Component {
    preBtn = () => {
        this.props.moveCard(-1);
    }
    render() {
        return (
            <div className="footer">
                <div className="footerContainer">
                    <div className="leftFooterContainer">
                        <div className="contact">
                            <p className="contactTitle">NUMBER</p>
                            <p className="contactDesc">+82 044 123 4567</p>
                        </div>
                        <div className="contact">
                            <p className="contactTitle">MAIL</p>
                            <p className="contactDesc">SJS@mail.com</p>
                        </div>
                    </div>
                    <div className="rightFooterContainer">
                        <Link to="/"><img src="./images/main/dimodamoWhite.svg" alt="" className="dimodamoFooter"/></Link>
                        <p className="copyright">© copyright 2020. DIMODAMO All right reserved.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;