import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'
import loadable from '@loadable/component';


export default class LayoutBrandCreateStep1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE

        

        // ===============================================
        // FRONT-END ENGAGEMENT
        

    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Brand Creating Step 1 | CabinFood For Business</title>
                </Head>

                <NavBar />
                {/* <ModalProductEdit /> */}

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            
                            <div className="tab-content py-6" id="wizardSteps">
                                <div className="tab-pane fade show active" id="wizardStepOne" role="tabpanel" aria-labelledby="wizardTabOne">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 1 / 3</h6>
                                            <h1 className="mb-3">Cùng bắt đầu với thông tin cơ bản</h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về thương hiệu của bạn để đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Team name</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-1">Team description</label>
                                        <small className="form-text text-muted">This is how others will learn about the project, so make it good!</small>
                                        <div className="ql-toolbar ql-snow"><span className="ql-formats"><button type="button" className="ql-bold"><svg viewBox="0 0 18 18"> <path className="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path> <path className="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path> </svg></button><button type="button" className="ql-italic"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line> <line className="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line> <line className="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line> </svg></button></span><span className="ql-formats"><button type="button" className="ql-link"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line> <path className="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path className="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg></button><button type="button" className="ql-blockquote"><svg viewBox="0 0 18 18"> <rect className="ql-fill ql-stroke" height="3" width="3" x="4" y="5"></rect> <rect className="ql-fill ql-stroke" height="3" width="3" x="11" y="5"></rect> <path className="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"></path> <path className="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"></path> </svg></button><button type="button" className="ql-code"><svg viewBox="0 0 18 18"> <polyline className="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline className="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line className="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line> </svg></button><button type="button" className="ql-image"><svg viewBox="0 0 18 18"> <rect className="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle className="ql-fill" cx="6" cy="7" r="1"></circle> <polyline className="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg></button></span><span className="ql-formats"><button type="button" className="ql-list" value="ordered"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line> <line className="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line> <line className="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line> <line className="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line> <path className="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path> <path className="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path> <path className="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path> </svg></button><button type="button" className="ql-list" value="bullet"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line> <line className="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line> <line className="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line> <line className="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line> <line className="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line> <line className="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line> </svg></button></span></div>
                                        <div data-toggle="quill" className="ql-container ql-snow">
                                            <div className="ql-editor ql-blank" data-gramm="false" contenteditable="true">
                                                <p>
                                                    <br/>
                                                </p>
                                            </div>
                                            <div className="ql-clipboard" contenteditable="true" tabindex="-1"></div>
                                            <div className="ql-tooltip ql-hidden">
                                                <a className="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>
                                                <input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"/>
                                                <a className="ql-action"></a>
                                                <a className="ql-remove"></a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <hr className="my-5" />

                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <button className="btn btn-lg btn-white" type="reset">Cancel</button>
                                        </div>
                                        <div className="col text-center">
                                            <h6 className="text-uppercase text-muted mb-0">Step 1 of 3</h6>
                                        </div>
                                        <div className="col-auto">
                                            <a className="btn btn-lg btn-primary" data-toggle="wizard" href="#wizardStepTwo">Continue</a>
                                        </div>
                                    </div>
                                </div>
                            </div>                                                                                      
                        </div>
                    </div>
                </div>
                
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                `}</style>
            </div>
        )
    }
}
