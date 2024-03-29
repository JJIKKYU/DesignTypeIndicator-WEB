import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
    preBtn = () => {
        this.props.moveCard(-1);
    };
    render() {
        var dimodamoURL;
        if (this.props.isResult === "true") {
            dimodamoURL = "../../images/main/behanceButton.svg";
        } else {
            dimodamoURL = "./images/main/behanceButton.svg";
        }

        return (
            // <div className="footer">
            //     <div className="footerContainer">
            //         <div className="leftFooterContainer">
            //             <div className="contact">
            //                 <p className="contactTitle">NUMBER</p>
            //                 <p className="contactDesc">+82 044 123 4567</p>
            //             </div>
            //             <div className="contact">
            //                 <p className="contactTitle">MAIL</p>
            //                 <p className="contactDesc">SJS@mail.com</p>
            //             </div>
            //         </div>
            //         <div className="rightFooterContainer">
            //             <Link to="/"><img src="./images/main/dimodamoWhite.svg" alt="" className="dimodamoFooter"/></Link>
            //             <p className="copyright">© copyright 2020. DIMODAMO All right reserved.</p>
            //         </div>
            //     </div>
            // </div>
            <div className="newFooter">
                <div className="behanceButtonContainer">
                    <a href="https://www.behance.net/gallery/117973273/DIMODAMO?tracking_source=search_projects_recommended%7Cdimodamo">
                        <button
                            type="button"
                            class="behanceButton"
                            id="behanceButon"
                        >
                            <img src={dimodamoURL} />
                        </button>
                    </a>
                </div>
                <div className="newFotterTitleContainer">
                    <h3 className="newFotterTitle">
                        해당 테스트는 홍익대학교 조형대학 졸업작품 중
                        일부입니다.
                        <br />© copyright 2021. DIMODAMO All right reserved.
                    </h3>
                </div>
                <div className="newFooterDivideLine"></div>
                <div className="helpContainer">
                    <h3 className="helpTitle">문의 | dog.devsigner@gmail.com</h3>
                </div>
            </div>
        );
    }
}

export default Footer;
