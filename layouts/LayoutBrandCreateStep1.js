import Flatpickr from "react-flatpickr";

import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import $, { data } from 'jquery'
import loadable from '@loadable/component';
import Router from 'next/router';
import Select from "react-dropdown-select";

const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });
const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

async function retrieveData(formular,tbName) {
    try {
      const readRes = await airtable.read(formular,{tableName:tbName});
      return readRes
    } catch(e) {
      console.error(e);
    }
}

async function createData(formular,tbName) {
    try {
      const res = await airtable.create(formular,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}

async function updateData(rowID, data,tbName) {
    try {
      const res = await airtable.update(rowID, data,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}


export default class LayoutBrandCreateStep1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            cabinOptionsTitle: [],
            cabinOptionsValue: []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        let brandInfo = []
        let ownerInfo = []
        let licenseData = []
        let onboardingData = []
        let notifyData = []
        let deliveryPartnerData = []
        let cabinAvailableList = []
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE
        
        // get all license 
        retrieveData({},'License')
        .then(licenseRes => {
            licenseData = licenseRes
            console.log('license data:', licenseData)
        })

        // get all list on-boarding
        retrieveData({},'OnBoarding')
        .then(onboardingRes => {
            onboardingData = onboardingRes
            console.log('onboardingData:', onboardingData)
        })

        // get all notification for new brand
        retrieveData({filterByFormula: `type = "1"`},'Notification')
        .then(notifyRes => {
            notifyData = notifyRes
            console.log('notification data:', notifyData)
        })

        // get all delivery partner
        retrieveData({},'DeliveryPartner')
        .then(deliveryPartnerRes => {
            deliveryPartnerData = deliveryPartnerRes
            console.log('DeliveryPartner:', deliveryPartnerData)
        })

        // get all cabin available
        retrieveData({filterByFormula: `brand_cabin = ""`},'Cabin')
        .then(cabinRes => {
            var tempTitle = []
            var tempValue = []
            for (var i=0; i<cabinRes.length; i++) {
                tempTitle.push(cabinRes[i].fields)
                tempValue.push(cabinRes[i].id)
            }
            currentComponent.setState({cabinOptionsTitle:tempTitle})
            currentComponent.setState({cabinOptionsValue:tempValue})
            console.log('cabin title:', currentComponent.state.cabinOptionsTitle)
            console.log('cabin value:', currentComponent.state.cabinOptionsValue)
        })
        

        // ===============================================
        // FRONT-END ENGAGEMENT
        // next pane action
        $('.next-btn').click(function(){
            // var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            // var next_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))+1);

            // $(current_pane_id).removeClass('active')
            // $(next_pane_id).addClass('active')
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

        // btn step 1 clicked
        $('#step1').click(function(){
            // var checkValid = true;                    
            // if (!$('#brandName').val()) {
            //     $("#brandName").addClass('is-invalid');
            //     checkValid = false
            // }
            // if (!$('#brandIntro').val()) {
            //     $('#brandIntro').addClass('is-invalid');
            //     checkValid = false
            // }
            // if ($('#logo').attr('image-url') === '') {
            //     checkValid = false
            // }
            // if ($('#businessLicense').val() === '') {
            //     $('#businessLicense').addClass('is-invalid');
            //     checkValid = false
            // }
            // if ($('#businessLicensePhoto').attr('image-url') === '') {
            //     checkValid = false
            // }
            
            // if (!checkValid) return;

            brandInfo.push({brandName:$('#brandName').val()})
            brandInfo.push({brandIntro:$('#brandIntro').val()})
            brandInfo.push({logo:[{url:$('#logo').attr('image-url')}]})
            brandInfo.push({brandName:$('#businessLicense').val()})
            brandInfo.push({logo:[{url:$('#businessLicensePhoto').attr('image-url')}]})

            console.log('biz overview:', brandInfo);

            // go to next pane
            var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            var next_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))+1);

            $(current_pane_id).removeClass('active')
            $(next_pane_id).addClass('active')
            console.log('go to pane 2:');            
        })

        $('#step2').click(function(){
            ownerInfo.push({name:$('#name').val()})
            ownerInfo.push({email:$('#email').val()})
            ownerInfo.push({tel:$('#tel').val()})
            ownerInfo.push({DOB:$('#DOB').val()})
            ownerInfo.push({ownerPersonalID:$('#ownerPersonalID').val()})
            ownerInfo.push({bankName:$('#bankName').val()})
            ownerInfo.push({bankAccNo:$('#bankAccNo').val()})
            ownerInfo.push({bankAccName:$('#bankAccName').val()})

            console.log('owner overview:', ownerInfo);            

            // go to next pane
            var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            var next_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))+1);

            $(current_pane_id).removeClass('active')
            $(next_pane_id).addClass('active')
            console.log('go to pane 3');            
        })

        $('#complete-btn').click(function(){
            // generate brand - account and all relation information
            createData({
                brandName:$('#brandName').val(),
                brandIntro:$('#brandIntro').val(),
                logo:[{url:$('#logo').attr('image-url')}],
                businessLicense:$('#businessLicense').val(),
                businessLicensePhoto:[{url:$('#businessLicensePhoto').attr('image-url')}],
                status: true
            },'Brand')
            .then(brandRes => {
                console.log('branRes:', brandRes)
                brandInfo = brandRes
                console.log('brandInfo:', brandInfo)

                // CREATE OWNER
                createData({
                    name:$('#name').val(),
                    // email:$('#email').val(),
                    // tel:$('#tel').val(),
                    // DOB:$('#DOB').val(),
                    // bankName:$('#bankName').val(),
                    // bankAccNo:$('#bankAccNo').val(),
                    // bankAccName:$('#bankAccName').val(),
                    Brand: [`${brandRes.id}`]
                },'Owner')
                
                // UPDATE ACCOUNT
                retrieveData({
                    view: 'Grid view',
                    filterByFormula:`ID="${cookies.userID}"`
                },'Account')
                .then(accountRes => {
                    accountRes[0].fields.Brand.push(brandRes.id)
                    // console.log('brand:', accountRes[0].fields.Brand)
                    // var temp = []
                    // temp = accountRes[0].fields.Brand
                    // temp.push(`${brandRes.id}`)
                    // console.log('brand push:', temp)
                    updateData(cookies.userID, {Brand:accountRes[0].fields.Brand},'Account')
                    .then(accUpdateRes => console.log('update account success...', accUpdateRes))
                })

                // CREATE BRAND_CABIN
                createData({
                    BrandID: [`${brandRes.id}`],
                    CabinID: [`${$('#cabin-assigned').attr('data-selected')}`],
                    status: true
                },'Brand_Cabin')
                .then(bcRes => {
                    for (var i=0; i<deliveryPartnerData.length; i++) {
                        createData({
                            Brand_Cabin: [`${bcRes.id}`],
                            DeliveryPartner: [`${deliveryPartnerData[i].id}`],
                            status: true
                        },'DeliveryPartner_Brand_Cabin')
                    }
                })

                for (var i=0; i<licenseData.length; i++) {
                    createData({
                        Brand: [`${brandRes.id}`],
                        License: [`${licenseData[i].id}`]
                    },'Brand_License')
                }

                for (var i=0; i<onboardingData.length; i++) {
                    createData({
                        Brand: [`${brandRes.id}`],
                        Onboarding: [`${onboardingData[i].id}`],
                        status: false
                    },'Brand_OnBoarding')
                }

                for (var i=0; i<notifyData.length; i++) {
                    createData({
                        Brand: [`${brandRes.id}`],
                        Notification: [`${notifyData[i].id}`],
                    },'Brand_Notification')
                }


            })
        })

    }

    render() {
        const { data, cabinOptionsTitle, cabinOptionsValue } = this.state;
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

                                <div className="tab-pane fade show active" id="wizardStep1" role="tabpanel">
                                    
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 1 / 3</h6>
                                            <h1 className="mb-3">Bắt đầu với thông tin cơ bản</h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về thương hiệu của bạn để đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div> 
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className="form-group">
                                                <div className="form-row">
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Tên nhãn hiệu</label>
                                                        <input type="text" className="form-control" id="brandName" required/>   
                                                        {/* <div class="invalid-feedback">Thông tin bắt buộc</div>      */}
                                                    </div>{/* .form-col BRAND*/}
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Mã số doanh nghiệp</label>
                                                        <input type="text" className="form-control" id='businessLicense' required/>
                                                    </div> {/* .form-col CABIN*/}
                                                </div> {/* .form-row */}                                                
                                            </div> {/* .form-group Brand - Cabin */}

                                            <div className="form-group">
                                                <label className="mb-1">Mô tả</label>
                                                <textarea className="form-control" id='brandIntro' data-toggle="autosize" rows="5" placeholder="Không quá 80 từ..." required></textarea>
                                            </div>
                                        
                                            <div className="form-group">
                                                <div className='form-row'>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Logo</label>
                                                        <ReactFilestack
                                                            apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                            customRender={({ onPick }) => (
                                                                <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='logo' image-url='' required>
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush logo-file-name"></ul>
                                                                    <div className="dz-default dz-message">
                                                                        <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            onSuccess={(res) => {
                                                                console.log('filestack:',res)
                                                                $('#logo').attr('image-url',res.filesUploaded[0].url);
                                                                $('.logo-file-name').text(res.filesUploaded[0].filename);
                                                                console.log('add file url to element:', $('#logo').attr('image-url'))
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Hình ảnh GPDKKD</label>
                                                        <ReactFilestack
                                                            apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                            customRender={({ onPick }) => (
                                                                <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='businessLicensePhoto' image-url=''>
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush business-license-file-name"></ul>
                                                                    <div className="dz-default dz-message">
                                                                        <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            onSuccess={(res) => {
                                                                console.log('filestack:',res)
                                                                $('#businessLicensePhoto').attr('image-url',res.filesUploaded[0].url);
                                                                $('.business-license-file-name').text(res.filesUploaded[0].filename);
                                                                console.log('add file url to element:', $('#businessLicensePhoto').attr('image-url'))
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>                                                                            

                                            <div className="form-group">
                                                <label>Cabin</label>
                                                <span className='hide' id='cabin-assigned' data-selected=''></span>
                                                <Select 
                                                    className='form-control' 
                                                    options={cabinOptionsTitle} 
                                                    labelField= 'name'
                                                    valueField='recID'
                                                    dropdownHandle='false'
                                                    placeholder="Chọn cabin theo hợp đồng" 
                                                    onChange={(valSelected) => {
                                                        console.log('cabin seleted: ',valSelected)
                                                        $('#cabin-assigned').attr('data-selected',valSelected[0].recID)
                                                    }} 
                                                />
                                                
                                                {/* <div class="invalid-feedback">Thông tin bắt buộc</div>      */}
                                            </div>
                                            
                                            <hr className="my-5" />    

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-white cancle-btn" type="reset">Cancel</button>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="text-uppercase text-muted mb-0">Bước 1 / 3</h6>
                                                </div>
                                                <div className="col-auto">
                                                    <span className="btn btn-lg btn-primary next-btn" pane-id='1' data-toggle="wizard" id='step1'>Continue</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div> {/* .wizard step */}

                                <div className="tab-pane fade show" id="wizardStep2" role="tabpanel">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 2 / 3</h6>
                                            <h1 className="mb-3">Thông tin Chủ sở hữu</h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về chủ sở hữu để hoàn thiện đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div>    
                                    <div className='card'>
                                        <div className='card-body'>
                                            {/* group owner general informatoin */}
                                            <div className="form-group">
                                                <label>Họ và tên (*)</label>
                                                <small className="form-text text-muted">Tên trên GPKD (nếu có GPKD là Công ty/Hộ kinh doanh) thì điền chính xác tên in trên GPKD, nếu không GPKD thì ghi tên chính xác trên biển hiệu</small>
                                                <input type="text" className="form-control" id='name'/>
                                            </div>

                                            <div className="form-group">
                                                <label>Số CMND/CCCD/Hộ chiếu (*)</label>
                                                <input type="text" className="form-control" id='ownerPersonalID'/>
                                            </div>

                                            <div className="form-group">
                                                <label>Ngày sinh (*)</label>
                                                <Flatpickr className="form-control" id='DOB'
                                                    // value={date}
                                                    onChange={date => {
                                                        console.log('new date:', date)
                                                    // this.setState({ date });
                                                    }}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Số điện thoại (*)</label>
                                                <input type="text" className="form-control" id='tel'/>
                                            </div>

                                            <div className="form-group">
                                                <label>Email (*)</label>
                                                <input type="email" className="form-control" id='email'/>
                                            </div>

                                            <div className="form-group">
                                                <label>Hình ảnh CMND/CCCD/Hộ chiếu (*)</label>
                                                <small className="form-text text-muted">Sử dụng trong việc hoàn thiện thủ tục triển khai cùng các đối tác bán hàng. </small>
                                                <ReactFilestack
                                                    apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                    customRender={({ onPick }) => (
                                                        <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='personalIDPhoto-image' image-url=''>
                                                            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush personal-ID-file-name"></ul>
                                                            <div className="dz-default dz-message">
                                                                <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    onSuccess={(res) => {
                                                        console.log('filestack:',res)
                                                        $('#personalIDPhoto-image').attr('image-url',res.filesUploaded[0].url);
                                                        $('.personal-ID-file-name').text(res.filesUploaded[0].filename);
                                                        console.log('add file url to element:', $('#personalIDPhoto-image').attr('image-url'))
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
                                                <input type="text" className="form-control" id='bankName'/>
                                            </div>
                                            <div className="form-group">
                                                <label>Số tài khoản (*)</label>
                                                <input type="text" className="form-control" id='brandAccNo'/>
                                            </div>
                                            <div className="form-group">
                                                <label>Tên chủ tài khoản (*)</label>
                                                <input type="text" className="form-control" id='brandAccName'/>
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

                                            {/* group account information */}
                                            <hr className="my-5" />    
                                            <div className='form-group'>
                                                <h2>Thông tin tài khoản của nhãn hàng truy cập vào "CabinFood for Business"</h2>
                                            </div>                                                

                                            <div className="form-group">
                                                <label>Tên tài khoản: (*)</label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Email: (*)</label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            <div className="form-group">
                                                <label>Số điện thoại: (*)</label>
                                                <input type="text" className="form-control"/>
                                            </div>

                                            {/* group navigate button */}
                                            <hr className="my-5" />    

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-white back-btn" pane-id='2' type="back">Quay lại</button>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="text-uppercase text-muted mb-0">Bước 2 / 3</h6>
                                                </div>
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-primary next-btn" pane-id='2' data-toggle="wizard" id='step2'>Tiếp theo</button>
                                                </div>
                                            </div> {/* .row */}
                                        </div> {/* .card-body */}
                                    </div> {/* .card */}                                                                            
                                </div> {/* .wizard step */}

                                <div className="tab-pane fade show" id="wizardStep3" role="tabpanel">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 3 / 3</h6>
                                            <h1 className="mb-3">Kích hoạt </h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về chủ sở hữu để hoàn thiện đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div>    
                                    <div className='card col-12'>
                                        <div className='card-body'>
                                            {/* group owner general informatoin */}
                                            <div className="form-group">
                                                <h2>Kích hoạt On-boarding</h2>
                                                <small className='text-muted'> Chọn các hạng mục onboarding mà nhãn hàng cần được kết nối</small>

                                                <div className="table-responsive mb-0">
                                                    <table className="table table-sm table-nowrap card-table table-hover">
                                                        <tbody className="list">{/* table item */} 
                                                            <tr>
                                                                <td><h4 className='font-weight-normal'>Thông báo từ hệ thống</h4></td>        
                                                                <td><input id='call' type="checkbox" checked/></td>
                                                                <td><input id='email' type="checkbox" checked/></td>
                                                                <td><input id='sms' type="checkbox" checked/></td>
                                                            </tr>        
                                                            <tr>
                                                                <td><h4 className='font-weight-normal'>Thông báo đơn hàng</h4></td>        
                                                                <td><input id='call' type="checkbox" checked/></td>
                                                                <td><input id='email' type="checkbox" checked/></td>
                                                                <td><input id='sms' type="checkbox" checked/></td>
                                                            </tr>        
                                                            <tr>
                                                                <td><h4 className='font-weight-normal'>Thông báo từ cửa hàng</h4></td>        
                                                                <td><input id='call' type="checkbox" checked/></td>
                                                                <td><input id='email' type="checkbox" checked/></td>
                                                                <td><input id='sms' type="checkbox" checked/></td>
                                                            </tr>   
                                                            <tr>
                                                                <td><h4 className='font-weight-normal'>Tư vấn 24/7</h4></td>        
                                                                <td><input id='call' type="checkbox" checked/></td>
                                                                <td><input id='email' type="checkbox" checked/></td>
                                                                <td><input id='sms' type="checkbox" checked/></td>
                                                            </tr>             
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>




                                            {/* group navigate button */}
                                            <hr className="my-5" />    

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-white back-btn" pane-id='3' type="back">Quay lại</button>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="text-uppercase text-muted mb-0">Bước 3 / 3</h6>
                                                </div>
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-primary next-btn" pane-id='3' data-toggle="wizard" id='complete-btn'>Continue</button>
                                                </div>
                                            </div> {/* .row */}
                                        </div> {/* .card-body */}
                                    </div> {/* .card */}                                                                            
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
