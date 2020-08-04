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
                                        <label>Tên nhãn hiệu</label>
                                        <small className="form-text text-muted">Tên trên GPKD (nếu có GPKD là Công ty/Hộ kinh doanh) thì điền chính xác tên in trên GPKD, nếu không GPKD thì ghi tên chính xác trên biển hiệu</small>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-1">Mô tả</label>
                                        <small className="form-text text-muted">Giới thiệu chi tiết về thương hiệu của bạn giúp khách hàng hiểu bạn đang bán món ăn thức uống nào, có phù hợp với nhu cầu của khách hàng không</small>
                                        <textarea class="form-control" data-toggle="autosize" rows="1" placeholder="Không quá 80 từ..."></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Mã số doanh nghiệp</label>
                                        <small className="form-text text-muted"> VD : nếu là HKD 41A... , 41X... - nếu là công ty : 0311..... ) Không có GPKD điền " Không có "</small>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày đăng ký kinh doanh</label>
                                        <small className="form-text text-muted">Điền chính xác trên GPKD nếu có - không có ghi " Không có </small>
                                        <input type="text" className="form-control"/>
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
