import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import $, { data } from 'jquery'
import loadable from '@loadable/component';
import Router from 'next/router';

const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });
const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

async function createData(formular,tbName) {
    try {
      const readRes = await airtable.create(formular,{tableName:tbName});
      return readRes
    } catch(e) {
      console.error(e);
    }
}

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
        // next pane action
        $('.next-btn').click(function(){
            var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            var next_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))+1);

            $(current_pane_id).removeClass('active')
            $(next_pane_id).addClass('active')
        })
        
        // prev pane action
        $('.back-btn').click(function(){
            var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            var prev_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))-1);

            $(current_pane_id).removeClass('active')
            $(prev_pane_id).addClass('active')
        })
        
        // cancel create brand action
        $('.cancle-btn').click(function(){
            Router.push('/account/brand')
        })

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

                                <div className="tab-pane fade show active" id="wizardStep1" role="tabpanel" aria-labelledby="wizardTabOne">
                                    
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 1 / 3</h6>
                                            <h1 className="mb-3">Cùng bắt đầu với thông tin cơ bản</h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về thương hiệu của bạn để đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className="form-group">
                                                <label>Tên nhãn hiệu</label>
                                                <small className="form-text text-muted">Tên trên GPKD (nếu có GPKD là Công ty/Hộ kinh doanh) thì điền chính xác tên in trên GPKD, nếu không GPKD thì ghi tên chính xác trên biển hiệu</small>
                                                <input type="text" className="form-control"/>
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-1">Mô tả</label>
                                                <small className="form-text text-muted">Giới thiệu chi tiết về thương hiệu của bạn giúp khách hàng hiểu bạn đang bán món ăn thức uống nào, có phù hợp với nhu cầu của khách hàng không</small>
                                                <textarea className="form-control" data-toggle="autosize" rows="1" placeholder="Không quá 80 từ..."></textarea>
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
                                            <div className="form-group">
                                                <label>Hình ảnh GPDKKD</label>
                                                <small className="form-text text-muted">Hình ảnh GPDKKD sử dụng trong việc hoàn thiện thủ tục triển khai cùng các đối tác bán hàng. </small>
                                                <ReactFilestack
                                                    apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                    customRender={({ onPick }) => (
                                                        <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='staff-image' image-url=''>
                                                            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                            <div className="dz-default dz-message">
                                                                <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    onSuccess={(res) => {
                                                        console.log('filestack:',res)
                                                        $('#staff-image').attr('image-url',res.filesUploaded[0].url);
                                                        $('.dz-preview').text(res.filesUploaded[0].filename);
                                                        console.log('add file url to element:', $('#staff-image').attr('image-url'))
                                                    }}
                                                />
                                            </div>
                                            
                                            <hr className="my-5" />    

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-white cancle-btn" type="reset">Cancel</button>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="text-uppercase text-muted mb-0">Step 1 of 3</h6>
                                                </div>
                                                <div className="col-auto">
                                                    <span className="btn btn-lg btn-primary next-btn" pane-id='1' data-toggle="wizard">Continue</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div> {/* .wizard step */}

                                <div className="tab-pane fade show" id="wizardStep2" role="tabpanel" aria-labelledby="wizardTabOne">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 2 / 3</h6>
                                            <h1 className="mb-3">Thông tin Chủ sở hữu</h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về chủ sở hữu để hoàn thiện đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                        
                                        <div className='card'>
                                            <div className='card-body'>
                                                {/* group owner general informatoin */}
                                                <div className="form-group">
                                                    <label>Họ và tên (*)</label>
                                                    <small className="form-text text-muted">Tên trên GPKD (nếu có GPKD là Công ty/Hộ kinh doanh) thì điền chính xác tên in trên GPKD, nếu không GPKD thì ghi tên chính xác trên biển hiệu</small>
                                                    <input type="text" className="form-control"/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Số CMND/CCCD/Hộ chiếu (*)</label>
                                                    <input type="text" className="form-control"/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Ngày sinh (*)</label>
                                                    <input type="text" className="form-control" placeholder='dd/mm/yyyy'/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Số điện thoại (*)</label>
                                                    <input type="text" className="form-control" placeholder='dd/mm/yyyy'/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Email (*)</label>
                                                    <input type="text" className="form-control" placeholder='dd/mm/yyyy'/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Hình ảnh CMND/CCCD/Hộ chiếu (*)</label>
                                                    <small className="form-text text-muted">Sử dụng trong việc hoàn thiện thủ tục triển khai cùng các đối tác bán hàng. </small>
                                                    <ReactFilestack
                                                        apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                        customRender={({ onPick }) => (
                                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='staff-image' image-url=''>
                                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                <div className="dz-default dz-message">
                                                                    <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        onSuccess={(res) => {
                                                            console.log('filestack:',res)
                                                            $('#staff-image').attr('image-url',res.filesUploaded[0].url);
                                                            $('.dz-preview').text(res.filesUploaded[0].filename);
                                                            console.log('add file url to element:', $('#staff-image').attr('image-url'))
                                                        }}
                                                    />
                                                </div>

                                                {/* group brank information */}
                                                <hr className="my-5" />    
                                                <div className='form-group'>
                                                    <h2>Thông tin tài khoản ngân hàng</h2>
                                                    <small className='text-muted'> Thông tin này được sử dụng cho việc nhận thanh toán từ các đối tác bán hàng</small>
                                                </div>                                                

                                                <div className="form-group">
                                                    <label>Tên ngân hàng (*)</label>
                                                    <input type="text" className="form-control" placeholder='dd/mm/yyyy'/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Số tài khoản (*)</label>
                                                    <input type="text" className="form-control" placeholder='dd/mm/yyyy'/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Tên chủ tài khoản (*)</label>
                                                    <input type="text" className="form-control" placeholder='dd/mm/yyyy'/>
                                                </div>

                                                {/* group brank information */}
                                                <hr className="my-5" />    
                                                <div className='form-group'>
                                                    <h2>Thông tin hợp đồng cùng CabinFood</h2>
                                                </div>                                                

                                                <div className="form-group">
                                                    <label>Mã hợp đồng (*)</label>
                                                    <input type="text" className="form-control"/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Cabin (*)</label>
                                                    <input type="text" className="form-control"/>
                                                </div>

                                                {/* group navigate button */}
                                                <hr className="my-5" />    

                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <button className="btn btn-lg btn-white back-btn" type="back">Quay lại</button>
                                                    </div>
                                                    <div className="col text-center">
                                                        <h6 className="text-uppercase text-muted mb-0">Bước 2 / 3</h6>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a className="btn btn-lg btn-primary next-btn" pane-id='2' data-toggle="wizard" href="#wizardStepTwo">Continue</a>
                                                    </div>
                                                </div> {/* .row */}
                                            </div> {/* .card-body */}
                                        </div> {/* .card */}                                                                            
                                    </div> {/* .row */}
                                </div> {/* .wizard step */}

                                <div className="tab-pane fade show" id="wizardStep3" role="tabpanel" aria-labelledby="wizardTabOne">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 3 / 3</h6>
                                            <h1 className="mb-3">Kích hoạt </h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về chủ sở hữu để hoàn thiện đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                        
                                        <div className='card'>
                                            <div className='card-body'>
                                                {/* group owner general informatoin */}
                                                <div className="form-group">
                                                    <label>Họ và tên (*)</label>
                                                    <small className="form-text text-muted">Tên trên GPKD (nếu có GPKD là Công ty/Hộ kinh doanh) thì điền chính xác tên in trên GPKD, nếu không GPKD thì ghi tên chính xác trên biển hiệu</small>
                                                    <input type="text" className="form-control"/>
                                                </div>


                                                {/* group navigate button */}
                                                <hr className="my-5" />    

                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <button className="btn btn-lg btn-white back-btn" type="back">Quay lại</button>
                                                    </div>
                                                    <div className="col text-center">
                                                        <h6 className="text-uppercase text-muted mb-0">Bước 3 / 3</h6>
                                                    </div>
                                                    <div className="col-auto">
                                                        <a className="btn btn-lg btn-primary next-btn" pane-id='3' data-toggle="wizard" href="#wizardStepTwo">Continue</a>
                                                    </div>
                                                </div> {/* .row */}
                                            </div> {/* .card-body */}
                                        </div> {/* .card */}                                                                            
                                    </div> {/* .row */}
                                </div> {/* .wizard step */}

                            </div> {/* .tab-content */}                                                                                      
                        </div> {/* .col */}
                    </div> {/* .row */}
                </div>
                
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                `}</style>
            </div>
        )
    }
}
